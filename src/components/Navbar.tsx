"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-xl border-b border-blue-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-200 transition-all duration-200">
              🎓 UniAdmit Portal
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {status === "loading" ? (
                <div className="animate-pulse">Loading...</div>
              ) : session ? (
                <>
                  <span className="text-blue-200 font-medium">Welcome, {session.user?.name}</span>
                  {session.user?.role === "STUDENT" && (
                    <>
                      <Link href="/student/application" className="hover:bg-blue-800/60 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-blue-100">
                        📝 Apply
                      </Link>
                      <Link href="/student/status" className="hover:bg-blue-800/60 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-blue-100">
                        📊 My Applications
                      </Link>
                    </>
                  )}
                  {session.user?.role === "ADMIN" && (
                    <Link href="/admin/applications" className="hover:bg-blue-800/60 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-blue-100">
                      🛠️ Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    🚪 Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                  <Link href="/register" className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}