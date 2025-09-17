"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type Application = {
  id: string;
  program: string;
  createdAt: string;
  status: string;
  courses?: string[];
  expectedGrade?: string;
  currentGPA?: number;
  previousEducation?: string;
  personalStatement?: string;
  phoneNumber?: string;
  emergencyContact?: string;
  workExperience?: string;
  extracurricularActivities?: string;
  studyMode?: string;
  startDate?: string;
  applicationNumber?: string;
};

export default function ApplicationStatus() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedProgram, setSelectedProgram] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<string>("SUMMARY");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchStatus();
    }
  }, [session]);

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/student/status");
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }
    setLoading(false);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Login Required</h2>
          <p>Please log in to view your application status.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow p-8">
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">📋 Application Status</h1>
              <p className="text-gray-600">Track and manage your university applications</p>
            </div>
            <div className="mt-4 md:mt-0">
              <a 
                href="/student/application" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md font-medium"
              >
                + New Application
              </a>
            </div>
          </div>
        </div>

        {/* Filter and View Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                aria-label="Filter applications by status"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="WAITLISTED">Waitlisted</option>
              </select>
            </div>

            {/* Program Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Program</label>
              <select 
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                aria-label="Filter applications by program"
              >
                <option value="ALL">All Programs</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Medicine">Medicine</option>
                <option value="Arts & Humanities">Arts & Humanities</option>
              </select>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
              <select 
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                aria-label="Select view mode for applications"
              >
                <option value="SUMMARY">Summary View</option>
                <option value="DETAILED">Detailed View</option>
              </select>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Applications</div>
              <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
            </div>
          </div>
        </div>
        
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600 mb-6">Start your journey by submitting your first application.</p>
              <a href="/student/application" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md font-medium">
                Submit New Application
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {applications
              .filter(app => selectedStatus === "ALL" || app.status === selectedStatus)
              .filter(app => selectedProgram === "ALL" || app.program === selectedProgram)
              .map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                {viewMode === "SUMMARY" ? (
                  /* Summary View */
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{app.program}</h3>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                            app.status === 'APPROVED' ? 'bg-green-100 text-green-800 border border-green-200' :
                            app.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-200' :
                            app.status === 'UNDER_REVIEW' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            app.status === 'WAITLISTED' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                            'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}>
                            {app.status.replace('_', ' ')}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Application ID:</span><br />
                            {app.applicationNumber || app.id.slice(-8)}
                          </div>
                          <div>
                            <span className="font-medium">Submitted:</span><br />
                            {new Date(app.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div>
                            <span className="font-medium">Study Mode:</span><br />
                            {app.studyMode?.replace('_', ' ') || 'Not specified'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex gap-2">
                        <button
                          onClick={() => setViewMode("DETAILED")}
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Detailed View */
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-gray-900">{app.program}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                          app.status === 'APPROVED' ? 'bg-green-100 text-green-800 border border-green-200' :
                          app.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-200' :
                          app.status === 'UNDER_REVIEW' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                          app.status === 'WAITLISTED' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                          'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                          {app.status.replace('_', ' ')}
                        </div>
                      </div>
                      <button
                        onClick={() => setViewMode("SUMMARY")}
                        className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
                      >
                        ← Back to Summary
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Choose Your Program */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                          🎓 Choose Your Program
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-blue-700">Program:</span>
                            <p className="text-blue-900">{app.program}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-blue-700">Selected Courses:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {app.courses?.map((course, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded">
                                  {course}
                                </span>
                              )) || <span className="text-blue-600 text-sm">No courses specified</span>}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-blue-700">Study Mode:</span>
                            <p className="text-blue-900">{app.studyMode?.replace('_', ' ') || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-blue-700">Expected Start:</span>
                            <p className="text-blue-900">{app.startDate ? new Date(app.startDate).toLocaleDateString() : 'Not specified'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Academic Information */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                          📚 Academic Information
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-green-700">Expected Grade:</span>
                            <p className="text-green-900">{app.expectedGrade || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-green-700">Current GPA:</span>
                            <p className="text-green-900">{app.currentGPA || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-green-700">Personal Statement:</span>
                            <p className="text-green-900 text-sm">
                              {app.personalStatement ? 
                                (app.personalStatement.length > 150 ? 
                                  app.personalStatement.substring(0, 150) + '...' : 
                                  app.personalStatement
                                ) : 'Not provided'
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Previous Education */}
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                          🏫 Previous Education
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-purple-700">Education Background:</span>
                            <p className="text-purple-900 text-sm">
                              {app.previousEducation ? 
                                (app.previousEducation.length > 200 ? 
                                  app.previousEducation.substring(0, 200) + '...' : 
                                  app.previousEducation
                                ) : 'Not provided'
                              }
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-purple-700">Work Experience:</span>
                            <p className="text-purple-900 text-sm">
                              {app.workExperience ? 
                                (app.workExperience.length > 150 ? 
                                  app.workExperience.substring(0, 150) + '...' : 
                                  app.workExperience
                                ) : 'Not provided'
                              }
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-purple-700">Extracurricular:</span>
                            <p className="text-purple-900 text-sm">
                              {app.extracurricularActivities ? 
                                (app.extracurricularActivities.length > 150 ? 
                                  app.extracurricularActivities.substring(0, 150) + '...' : 
                                  app.extracurricularActivities
                                ) : 'Not provided'
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Personal & Contact Information */}
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
                          👤 Personal & Contact Information
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-orange-700">Phone Number:</span>
                            <p className="text-orange-900">{app.phoneNumber || 'Not provided'}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-orange-700">Emergency Contact:</span>
                            <p className="text-orange-900">{app.emergencyContact || 'Not provided'}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-orange-700">Application ID:</span>
                            <p className="text-orange-900 font-mono text-sm">{app.applicationNumber || app.id}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-orange-700">Submitted Date:</span>
                            <p className="text-orange-900">
                              {new Date(app.createdAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}