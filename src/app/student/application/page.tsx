"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, Button, Input } from "@/components/UI";

export default function ApplicationForm() {
  const [form, setForm] = useState({
    program: "",
    personalStatement: "",
    previousEducation: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    
    const res = await fetch("/api/student/application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    
    setLoading(false);
    
    if (res.ok) {
      setMessage("Application submitted successfully!");
      setForm({ program: "", personalStatement: "", previousEducation: "" });
    } else {
      const data = await res.json();
      setError(data.error || "Submission failed");
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600">Please log in to submit an application.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Program Application</h2>
            <p className="mt-2 text-gray-600">Apply for your desired university program</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Program Name"
              type="text"
              name="program"
              value={form.program}
              onChange={handleChange}
              required
              placeholder="e.g., Computer Science, Medicine, Engineering"
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous Education
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="previousEducation"
                value={form.previousEducation}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Describe your educational background..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Statement
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="personalStatement"
                value={form.personalStatement}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us why you want to study this program..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="text-sm text-red-600">{error}</div>
              </div>
            )}
            
            {message && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="text-sm text-green-600">{message}</div>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              variant="success"
              className="w-full"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
