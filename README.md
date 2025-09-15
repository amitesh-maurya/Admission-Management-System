# 🎓 UniAdmit Portal - University Admission System

A modern, full-stack university admission system built with Next.js 15, featuring student applications, admin dashboard, and real-time status tracking. This comprehensive platform streamlines the entire university admission process with a beautiful, responsive interface and robust backend functionality.

## 📋 Table of Contents

- [Features](#-features)
- [Demo & Screenshots](#-demo--screenshots)  
- [Getting Started](#-getting-started)
- [Project Structure](#️-project-structure)
- [Usage Guide](#-usage-guide)
- [Technology Stack](#-technology-stack)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)
- [License](#-license)
- [Support & Contact](#️-support--contact)

## 🌟 Features

### 🎓 **Student Portal**
- **User Registration & Authentication**: Secure account creation with role-based access
- **Application Submission**: Intuitive form for program applications with validation
- **Document Upload**: Support for transcripts, essays, and supporting documents
- **Application Tracking**: Real-time status updates (Pending, Accepted, Rejected)
- **Multiple Applications**: Students can apply to multiple programs
- **Application History**: View all past and current applications

### 🛠️ **Admin Dashboard**
- **Application Management**: Review and process student applications
- **Status Control**: Update application statuses with notes
- **Advanced Filtering**: Search by program, status, submission date
- **Bulk Operations**: Process multiple applications efficiently
- **Analytics Dashboard**: View admission statistics and trends
- **User Management**: Manage student and admin accounts

### 🔐 **Security & Authentication**
- **NextAuth.js Integration**: Secure authentication system
- **Password Hashing**: bcrypt encryption for user passwords
- **Session Management**: Secure session handling and token management
- **Role-Based Access**: Separate interfaces for students and administrators
- **CSRF Protection**: Built-in security against cross-site request forgery

### 🎨 **Modern User Interface**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Professional gradient color scheme (slate-900/blue-900/indigo-900)
- **Interactive Elements**: Smooth animations and hover effects
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Loading States**: Beautiful loading indicators and skeleton screens

### ⚡ **Performance & Optimization**
- **Server-Side Rendering**: Next.js 15 for optimal performance
- **Static Generation**: Pre-built pages for faster loading
- **Image Optimization**: Automatic image compression and lazy loading
- **Database Optimization**: Efficient queries with Prisma ORM
- **Caching Strategy**: Smart caching for improved response times

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amitesh-maurya/Admission-Management-System.git
   cd Admission-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── admin/             # Admin dashboard pages
│   ├── student/           # Student portal pages
│   ├── api/               # API routes
│   └── auth/              # Authentication pages
├── components/            # Reusable UI components
│   ├── Navbar.tsx         # Navigation component
│   ├── Providers.tsx      # Context providers
│   └── UI.tsx             # UI component library
└── lib/                   # Utilities and configurations
```

## 🎯 Usage

### For Students
1. **Register**: Create a new student account
2. **Login**: Access your student portal
3. **Apply**: Submit university applications
4. **Track**: Monitor your application status

### For Administrators
1. **Login**: Use admin credentials
2. **Review**: Examine student applications
3. **Manage**: Update application statuses
4. **Filter**: Search and sort applications

## 🔧 Technology Stack

### Frontend Technologies
- **Next.js 15**: React framework with App Router and server components
- **React 18**: Latest React with concurrent features and hooks
- **TypeScript**: Type-safe development with static analysis
- **Tailwind CSS**: Utility-first CSS framework with custom gradient themes
- **NextAuth.js**: Authentication library with session management

### Backend Technologies
- **Node.js**: JavaScript runtime for server-side logic
- **Prisma ORM**: Type-safe database client with migrations
- **SQLite**: Development database (easily upgradeable to PostgreSQL/MySQL)
- **bcrypt**: Password hashing and security
- **API Routes**: Next.js API routes for RESTful endpoints

### Development Tools
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting and style consistency
- **PostCSS**: CSS processing and optimization
- **TypeScript Config**: Strict type checking configuration

## 📚 API Documentation

### Authentication Endpoints

#### `POST /api/auth/signin`
User login with credentials
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

#### `POST /api/register`
User registration
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "securepassword",
  "role": "STUDENT"
}
```

### Application Endpoints

#### `POST /api/student/application`
Submit new application
```json
{
  "program": "Computer Science",
  "personalStatement": "My application essay..."
}
```

#### `GET /api/student/status`
Get user's applications
```json
{
  "applications": [
    {
      "id": "1",
      "program": "Computer Science",
      "status": "PENDING",
      "submittedAt": "2025-09-15T10:00:00Z"
    }
  ]
}
```

### Admin Endpoints

#### `GET /api/admin/applications`
Get all applications with filtering
```
Query parameters:
- status: PENDING | ACCEPTED | REJECTED
- program: string
- page: number
- limit: number
```

#### `PUT /api/admin/applications/[id]`
Update application status
```json
{
  "status": "ACCEPTED",
  "adminNotes": "Excellent application"
}
```

## 🗂️ Database Schema Details

### User Table
```sql
CREATE TABLE User (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role UserRole NOT NULL DEFAULT 'STUDENT',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Application Table  
```sql
CREATE TABLE Application (
  id TEXT PRIMARY KEY,
  studentId TEXT NOT NULL,
  program TEXT NOT NULL,
  personalStatement TEXT NOT NULL,
  status ApplicationStatus NOT NULL DEFAULT 'PENDING',
  adminNotes TEXT,
  submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (studentId) REFERENCES User(id)
);
```

### Enums
```sql
-- UserRole: STUDENT, ADMIN
-- ApplicationStatus: PENDING, ACCEPTED, REJECTED
```

## 🌐 Deployment

### Environment Setup
For production deployment, update your environment variables:

```env
NEXTAUTH_URL="https://yourdomain.com"
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
```

### Database Migration
```bash
npx prisma generate
npx prisma db push
```

### Build & Deploy
```bash
npm run build
npm start
```

## 📝 Database Schema

### User Model
- `id`: Unique identifier
- `name`: User's full name  
- `email`: Login email (unique)
- `password`: Hashed password
- `role`: USER_ROLE enum (STUDENT/ADMIN)

### Application Model
- `id`: Application identifier
- `studentId`: Reference to User
- `program`: Applied program name
- `personalStatement`: Application essay
- `status`: Status enum (PENDING/ACCEPTED/REJECTED)
- `submittedAt`: Submission timestamp

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support & Contact

If you have any questions or run into issues, please feel free to reach out:

### 📬 Get in Touch
- **Email**: [your.email@example.com](mailto:aamiteshmaurya@gmail.com)
- **LinkedIn**: [Connect with me on LinkedIn](https://linkedin.com/in/amitesh-maurya)
- **Portfolio**: [View my portfolio](https://amiteshmaurya.com)
- **GitHub**: [Follow me on GitHub](https://github.com/amitesh-maurya)

### 🐛 Issues & Support
- Open an issue on GitHub for bug reports
- Create a discussion for feature requests
- Check existing issues before creating new ones

### 💬 Let's Connect
I'm always interested in connecting with fellow developers and discussing:
- Full-stack development projects
- Next.js and React best practices
- University admission systems
- Modern web technologies
- Open source contributions

---

## 👨‍💻 About the Developer

**Full Stack Developer** passionate about creating modern, user-friendly web applications.

### 🛠️ Technologies Used in This Project
- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Prisma ORM, NextAuth.js
- **Database**: SQLite (Development), PostgreSQL (Production)
- **Deployment**: Vercel, Standalone builds
- **Security**: bcrypt, CSRF protection, secure sessions

### 🌟 Project Highlights
- Modern gradient-based UI design
- Role-based authentication system
- Real-time application status tracking
- Responsive design for all devices
- Production-ready deployment configuration

---

**🎓 UniAdmit Portal** - Making university admissions simple and accessible.

*Built with ❤️ using Next.js and modern web technologies*
