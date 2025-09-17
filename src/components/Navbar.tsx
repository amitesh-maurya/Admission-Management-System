"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faSignInAlt, 
  faUserPlus, 
  faFileAlt, 
  faChartBar, 
  faSignOutAlt,
  faTachometerAlt,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-xl border-b border-blue-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              href="/" 
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-200 transition-all duration-200"
              onClick={closeMenu}
            >
              🎓 AdmitPro Portal
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-4">
              {/* Common Navigation Links */}
              <Link 
                href="/" 
                className="hover:bg-blue-800/60 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-blue-100 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
                <span>Home</span>
              </Link>
              
              {!session && (
                <>
                  <Link 
                    href="/login" 
                    className="hover:bg-blue-700/80 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-blue-100 flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faSignInAlt} className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    href="/register" 
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                  <Link 
                    href="/student/application" 
                    className="hover:bg-blue-800/60 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-blue-100 flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faFileAlt} className="w-4 h-4" />
                    <span>Apply Now</span>
                  </Link>
                  <Link 
                    href="/student/status" 
                    className="hover:bg-blue-800/60 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-blue-100 flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faChartBar} className="w-4 h-4" />
                    <span>Check Status</span>
                  </Link>
                </>
              )}
              
              {status === "loading" ? (
                <div className="animate-pulse flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
                  <span>Loading...</span>
                </div>
              ) : session ? (
                <>
                  <div className="text-blue-200 font-medium px-3 py-2">
                    Welcome, <span className="text-blue-100 font-semibold">{session.user?.name}</span>
                  </div>
                  {session.user?.role === "STUDENT" && (
                    <>
                      <Link 
                        href="/student/application" 
                        className="hover:bg-blue-800/60 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-blue-100 flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faFileAlt} className="w-4 h-4" />
                        <span>Apply</span>
                      </Link>
                      <Link 
                        href="/student/status" 
                        className="hover:bg-blue-800/60 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-blue-100 flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faChartBar} className="w-4 h-4" />
                        <span>My Applications</span>
                      </Link>
                    </>
                  )}
                  {session.user?.role === "ADMIN" && (
                    <>
                      <Link 
                        href="/admin/dashboard" 
                        className="hover:bg-blue-800/60 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-blue-100 flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faTachometerAlt} className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link 
                        href="/admin/applications" 
                        className="hover:bg-blue-800/60 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-blue-100 flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faFileAlt} className="w-4 h-4" />
                        <span>Applications</span>
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-800/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              <FontAwesomeIcon 
                icon={isMenuOpen ? faTimes : faBars} 
                className="h-6 w-6 transition-transform duration-200" 
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-blue-800/50">
            {/* Common Navigation Links */}
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-800/60 transition-all duration-200 flex items-center gap-3"
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
              <span>Home</span>
            </Link>
            
            {!session && (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-800/60 transition-all duration-200 flex items-center gap-3"
                  onClick={closeMenu}
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-green-100 hover:text-white hover:bg-green-600/80 transition-all duration-200 flex items-center gap-3"
                  onClick={closeMenu}
                >
                  <FontAwesomeIcon icon={faUserPlus} className="w-5 h-5" />
                  <span>Register</span>
                </Link>
                <Link
                  href="/student/application"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-800/60 transition-all duration-200 flex items-center gap-3"
                  onClick={closeMenu}
                >
                  <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                  <span>Apply Now</span>
                </Link>
                <Link
                  href="/student/status"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-800/60 transition-all duration-200 flex items-center gap-3"
                  onClick={closeMenu}
                >
                  <FontAwesomeIcon icon={faChartBar} className="w-5 h-5" />
                  <span>Check Status</span>
                </Link>
              </>
            )}
            
            {status === "loading" ? (
              <div className="animate-pulse flex items-center gap-2 px-3 py-2">
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
                <span className="text-blue-200">Loading...</span>
              </div>
            ) : session ? (
              <>
                <div className="px-3 py-2 text-blue-200 font-medium border-b border-blue-800/30 mb-2">
                  Welcome, <span className="text-blue-100 font-semibold">{session.user?.name}</span>
                </div>
                {session.user?.role === "STUDENT" && (
                  <>
                    <Link
                      href="/student/application"
                      className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-800/60 transition-all duration-200 flex items-center gap-3"
                      onClick={closeMenu}
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                      <span>Submit Application</span>
                    </Link>
                    <Link
                      href="/student/status"
                      className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-800/60 transition-all duration-200 flex items-center gap-3"
                      onClick={closeMenu}
                    >
                      <FontAwesomeIcon icon={faChartBar} className="w-5 h-5" />
                      <span>My Applications</span>
                    </Link>
                  </>
                )}
                {session.user?.role === "ADMIN" && (
                  <>
                    <Link
                      href="/admin/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-800/60 transition-all duration-200 flex items-center gap-3"
                      onClick={closeMenu}
                    >
                      <FontAwesomeIcon icon={faTachometerAlt} className="w-5 h-5" />
                      <span>Admin Dashboard</span>
                    </Link>
                    <Link
                      href="/admin/applications"
                      className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-800/60 transition-all duration-200 flex items-center gap-3"
                      onClick={closeMenu}
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                      <span>Manage Applications</span>
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-200 hover:text-white hover:bg-red-600/80 transition-all duration-200 flex items-center gap-3"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}