"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, Button } from "@/components/UI";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faFileAlt, 
  faClockRotateLeft, 
  faCheck, 
  faTimes,
  faChartLine,
  faGraduationCap,
  faEye
} from '@fortawesome/free-solid-svg-icons';

type DashboardData = {
  statistics: {
    totalApplications: number;
    pendingApplications: number;
    acceptedApplications: number;
    rejectedApplications: number;
    totalUsers: number;
    totalStudents: number;
  };
  recentApplications: Array<{
    id: string;
    program: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    submittedAt: string;
    student: {
      name: string;
      email: string;
    };
  }>;
  programStats: Array<{
    program: string;
    count: number;
  }>;
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    
    fetch("/api/admin/dashboard")
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setDashboardData(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard data");
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

  if (!session || session.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You need admin privileges to access this dashboard.</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <div className="animate-pulse text-gray-600">Loading dashboard...</div>
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

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <div className="text-gray-600">No dashboard data available</div>
        </Card>
      </div>
    );
  }

  const { statistics, recentApplications, programStats } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Overview of your admission management system</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Applications */}
          <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Applications</p>
                <p className="text-3xl font-bold">{statistics.totalApplications}</p>
              </div>
              <FontAwesomeIcon icon={faFileAlt} className="h-8 w-8 text-blue-200" />
            </div>
          </Card>

          {/* Pending Applications */}
          <Card className="p-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Pending Reviews</p>
                <p className="text-3xl font-bold">{statistics.pendingApplications}</p>
              </div>
              <FontAwesomeIcon icon={faClockRotateLeft} className="h-8 w-8 text-yellow-200" />
            </div>
          </Card>

          {/* Accepted Applications */}
          <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Accepted</p>
                <p className="text-3xl font-bold">{statistics.acceptedApplications}</p>
              </div>
              <FontAwesomeIcon icon={faCheck} className="h-8 w-8 text-green-200" />
            </div>
          </Card>

          {/* Rejected Applications */}
          <Card className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Rejected</p>
                <p className="text-3xl font-bold">{statistics.rejectedApplications}</p>
              </div>
              <FontAwesomeIcon icon={faTimes} className="h-8 w-8 text-red-200" />
            </div>
          </Card>

          {/* Total Students */}
          <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold">{statistics.totalStudents}</p>
              </div>
              <FontAwesomeIcon icon={faGraduationCap} className="h-8 w-8 text-purple-200" />
            </div>
          </Card>

          {/* Total Users */}
          <Card className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold">{statistics.totalUsers}</p>
              </div>
              <FontAwesomeIcon icon={faUsers} className="h-8 w-8 text-indigo-200" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FontAwesomeIcon icon={faChartLine} className="h-5 w-5 text-blue-600" />
                Recent Applications
              </h3>
              <Link href="/admin/applications">
                <Button variant="outline" className="text-sm">
                  <FontAwesomeIcon icon={faEye} className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </Link>
            </div>
            
            {recentApplications.length === 0 ? (
              <div className="text-center py-8">
                <FontAwesomeIcon icon={faFileAlt} className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500">No recent applications</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{app.program}</h4>
                        <p className="text-sm text-gray-600">{app.student?.name}</p>
                        <p className="text-xs text-gray-500">{app.student?.email}</p>
                      </div>
                      <span className={getStatusBadge(app.status)}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Program Statistics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faGraduationCap} className="h-5 w-5 text-purple-600" />
              Applications by Program
            </h3>
            
            {programStats.length === 0 ? (
              <div className="text-center py-8">
                <FontAwesomeIcon icon={faChartLine} className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500">No program data available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {programStats.map((program, index) => (
                  <div key={program.program} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-purple-500' :
                        'bg-gray-400'
                      }`}></div>
                      <span className="font-medium text-gray-900">{program.program}</span>
                    </div>
                    <span className="text-xl font-bold text-gray-700">{program.count}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/applications">
              <Button variant="primary" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFileAlt} className="h-4 w-4" />
                Manage Applications
              </Button>
            </Link>
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faChartLine} className="h-4 w-4" />
              Refresh Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}