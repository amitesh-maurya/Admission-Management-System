"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/UI";

type Application = {
  id: string;
  program: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  submittedAt: string;
};

export default function StudentStatus() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    
    fetch("/api/student/status")
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setApplications(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load applications");
        setLoading(false);
      });
  }, [session]);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "PENDING":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "ACCEPTED":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "REJECTED":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600">Please log in to view your applications.</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <div className="animate-pulse text-gray-600">Loading your applications...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <div className="text-red-600">{error}</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">My Applications</h2>
            <p className="mt-2 text-gray-600">Track the status of your submitted applications</p>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-500">You haven0t submitted any applications. Ready to ge t started?</p>
              <a
                href="/student/application"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit Application
              </a>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="grid gap-6 md:grid-cols-1">
                {applications.map(app => (
                  <div key={app.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{app.program}</h3>
                        <p className="text-sm text-gray-500">
                          Submitted on {new Date(app.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={getStatusBadge(app.status)}>
                        {app.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Application ID: {app.id.slice(0, 8)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
