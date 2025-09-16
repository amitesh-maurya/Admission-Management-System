"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, Button, Input } from "@/components/UI";
import { useToastContext } from "@/components/ToastProvider";
import { useValidation } from "@/hooks/useValidation";
import { loginSchema } from "@/lib/validation";

// This would be better as a separate metadata export in a server component
// but for demonstration in a client component, we'll handle it differently

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToastContext();
  const { errors, validate, validateField, clearFieldError } = useValidation(loginSchema);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear field error when user starts typing
    if (errors[name]) {
      clearFieldError(name);
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
      const res = await signIn("credentials", {
        ...validation.data,
        redirect: false,
      });
      
      setLoading(false);
      
      if (res?.ok) {
        toast.success("Login successful!", "Welcome back to the admission portal.");
        router.push("/");
      } else if (res?.error) {
        const errorMessage = "Invalid email or password";
        setError(errorMessage);
        toast.error("Login failed", errorMessage);
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = "Network error. Please try again.";
      setError(errorMessage);
      toast.error("Connection error", errorMessage);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                create a new account
              </Link>
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
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
              className="w-full"
            >
              Sign in
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
