"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, Button, Input, Select } from "@/components/UI";
import { useToastContext } from "@/components/ToastProvider";
import { useValidation } from "@/hooks/useValidation";
import { registerSchema, type RegisterData } from "@/lib/validation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "STUDENT" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToastContext();
  const { errors, validate, validateField, clearFieldError } = useValidation(registerSchema);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear field error when user starts typing
    if (errors[name]) {
      clearFieldError(name);
    }
    
    // Validate field on blur for better UX
    if (value.trim()) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate form data
    const validation = validate(form);
    if (!validation.isValid) {
      toast.error("Validation Error", "Please fix the errors in the form");
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      
      setLoading(false);
      
      if (res.ok) {
        toast.success("Registration successful!", "Please login to continue.");
        router.push("/login");
      } else {
        const data = await res.json();
        const errorMessage = data.error || "Registration failed";
        setError(errorMessage);
        toast.error("Registration failed", errorMessage);
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = "Network error. Please try again.";
      setError(errorMessage);
      toast.error("Connection error", errorMessage);
      console.error("Registration error:", error);
    }
  };

  const roleOptions = [
    { value: "STUDENT", label: "Student" },
    { value: "ADMIN", label: "Administrator" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in here
              </Link>
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              required
              placeholder="Enter your full name"
            />
            
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              required
              placeholder="Enter your email"
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              required
              placeholder="Create a password"
            />

            <Select
              label="Account Type"
              name="role"
              value={form.role}
              onChange={handleChange}
              error={errors.role}
              options={roleOptions}
              required
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="text-sm text-red-600">{error}</div>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              variant="success"
              className="w-full"
            >
              Create account
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
