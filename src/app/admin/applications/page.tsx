"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, Button } from "@/components/UI";

type Application = {
  id: string;
  program: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  student: {
    name: string;
    email: string;
  };
  submittedAt: string;
};

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "ACCEPTED" | "REJECTED">("ALL");
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    
    fetch("/api/admin/applications")
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

  const updateStatus = async (id: string, status: "ACCEPTED" | "REJECTED") => {
    const res = await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setApplications(applications =>
        applications.map(app =>
          app.id === id ? { ...app, status } : app
        )
      );
    }
  };

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

  const filteredApplications = applications.filter(app => 
    filter === "ALL" || app.status === filter
  );

  if (!session || session.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <div className="animate-pulse text-gray-600">Loading applications...</div>
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Application Management</h2>
              <p className="mt-2 text-gray-600">Review and manage student applications</p>
            </div>
            <div className="flex space-x-2">
              {(["ALL", "PENDING", "ACCEPTED", "REJECTED"] as Array<"ALL" | "PENDING" | "ACCEPTED" | "REJECTED">).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === status
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status} ({applications.filter(app => status === "ALL" || app.status === status).length})
                </button>
              ))}
            </div>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-500">There are no applications matching your current filter.</p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="grid gap-6">
                {filteredApplications.map(app => (
                  <div key={app.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{app.program}</h3>
                            <div className="mt-1 text-sm text-gray-600">
                              <p><strong>Student:</strong> {app.student?.name}</p>
                              <p><strong>Email:</strong> {app.student?.email}</p>
                              <p><strong>Submitted:</strong> {new Date(app.submittedAt).toLocaleDateString()}</p>
                              <p><strong>Application ID:</strong> {app.id.slice(0, 8)}...</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={getStatusBadge(app.status)}>
                              {app.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button
                            onClick={() => updateStatus(app.id, "ACCEPTED")}
                            disabled={app.status === "ACCEPTED"}
                            variant="success"
                            className="text-sm"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => updateStatus(app.id, "REJECTED")}
                            disabled={app.status === "REJECTED"}
                            variant="danger"
                            className="text-sm"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
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
