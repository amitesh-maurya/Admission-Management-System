
"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card } from "@/components/UI";

export default function Home() {
  const { data: session } = useSession();

  const features = [
    {
      title: "Easy Application Process",
      description: "Submit your university application with our streamlined online process.",
      icon: "📝",
    },
    {
      title: "Real-time Status Updates",
      description: "Track your application status and receive instant updates on your admission.",
      icon: "🔄",
    },
    {
      title: "Admin Dashboard",
      description: "Comprehensive tools for administrators to manage and review applications.",
      icon: "👨‍💼",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl animate-fade-in-up">
                  <span className="block xl:inline bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">🎓 AdmitPro</span>{' '}
                  <span className="block text-blue-200 xl:inline">Portal</span>
                </h1>
                <p className="mt-3 text-base text-blue-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Your gateway to higher education. Apply to programs, track your applications, and manage the entire admission process seamlessly with our modern platform.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {!session ? (
                    <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
                      <Link href="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all duration-200">
                        🚀 Get Started
                      </Link>
                      <Link href="/login" className="w-full flex items-center justify-center px-8 py-3 border border-blue-400 text-base font-medium rounded-lg text-blue-200 bg-blue-900/50 hover:bg-blue-800/60 md:py-4 md:text-lg md:px-10 backdrop-blur-sm transition-all duration-200">
                        🔑 Login
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
                      {session.user?.role === "STUDENT" && (
                        <>
                          <Link href="/student/application" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all duration-200">
                            📝 Apply Now
                          </Link>
                          <Link href="/student/status" className="w-full flex items-center justify-center px-8 py-3 border border-green-400 text-base font-medium rounded-lg text-green-200 bg-green-900/50 hover:bg-green-800/60 md:py-4 md:text-lg md:px-10 backdrop-blur-sm transition-all duration-200">
                            📊 View Applications
                          </Link>
                        </>
                      )}
                      {session.user?.role === "ADMIN" && (
                        <Link href="/admin/applications" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all duration-200">
                          🛠️ Admin Dashboard
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Everything you need for university admissions
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg leading-6 font-medium text-white mb-2">{feature.title}</h3>
                    <p className="text-base text-slate-300">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start your journey?</span>
            <span className="block text-blue-300">Apply for admission today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow-lg">
              <Link href="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-slate-900 bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-xl transition-all duration-200">
                🚀 Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
