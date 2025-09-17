import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white mt-auto border-t border-blue-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🎓</div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                AdmitPro Portal
              </h3>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Streamlining university admissions with a modern, efficient, and user-friendly platform 
              for students and administrators.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-100">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link 
                href="/login" 
                className="text-blue-300 hover:text-white text-sm transition-colors duration-200 flex items-center space-x-1"
              >
                <span>🔐</span>
                <span>Login</span>
              </Link>
              <Link 
                href="/register" 
                className="text-blue-300 hover:text-white text-sm transition-colors duration-200 flex items-center space-x-1"
              >
                <span>📝</span>
                <span>Register</span>
              </Link>
              <Link 
                href="/student/application" 
                className="text-blue-300 hover:text-white text-sm transition-colors duration-200 flex items-center space-x-1"
              >
                <span>📋</span>
                <span>Apply Now</span>
              </Link>
              <Link 
                href="/student/status" 
                className="text-blue-300 hover:text-white text-sm transition-colors duration-200 flex items-center space-x-1"
              >
                <span>📊</span>
                <span>Check Status</span>
              </Link>
            </div>
          </div>

          {/* Developer Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-100">Developer</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">👨‍💻</span>
                <div>
                  <p className="text-blue-100 font-medium">Amitesh Maurya</p>
                  <p className="text-blue-300 text-sm">Full Stack Developer</p>
                </div>
              </div>
              <Link 
                href="https://amiteshmaurya.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span>🌐</span>
                <span>Visit Portfolio</span>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-blue-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-300 text-sm">
              © 2025 AdmitPro Portal. All rights reserved. Amitesh Maurya
            </div>
            <div className="flex items-center space-x-6 text-sm text-blue-300">
              <span className="flex items-center space-x-1">
                <span>⚡</span>
                <span>Built with Next.js</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>🎨</span>
                <span>Styled with Tailwind CSS</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>🗄️</span>
                <span>Powered by Prisma & MongoDB</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}