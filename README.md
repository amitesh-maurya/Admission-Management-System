# 🎓 University Admission Management System

A comprehensive, modern university admission management platform built with Next.js 13+, TypeScript, MongoDB, and cutting-edge web technologies. This system provides a seamless experience for both students applying to university programs and administrators managing the admission process.

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📚 API Documentation](#-api-documentation)
- [🎨 UI Components](#-ui-components)
- [🔐 Security Features](#-security-features)
- [⚡ Performance & SEO](#-performance--seo)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Support](#-support)

## 🌟 Features

### 🎓 **Student Experience**
- **🔐 Secure Authentication**: Registration and login with email verification
- **📝 Application Forms**: Intuitive, validated forms for program applications
- **📎 Document Upload**: Drag-and-drop file upload for transcripts and essays
- **📊 Application Tracking**: Real-time status updates and application history
- **🔔 Smart Notifications**: Toast notifications for all user actions
- **📱 Responsive Design**: Seamless experience across all devices
- **♿ Accessibility**: WCAG 2.1 AA compliant interface

### 🛠️ **Admin Dashboard**
- **📈 Analytics Dashboard**: Comprehensive statistics and insights
- **📋 Application Management**: Review, approve, or reject applications
- **👥 User Management**: Manage student and admin accounts
- **🔍 Advanced Search**: Filter applications by multiple criteria
- **📊 Reporting Tools**: Generate detailed admission reports
- **⚙️ System Configuration**: Manage application settings and periods

### 🔐 **Security & Authentication**
- **🛡️ JWT Authentication**: Secure token-based authentication
- **🔒 Password Hashing**: bcrypt encryption for user passwords
- **✉️ Email Verification**: Mandatory email verification for new accounts
- **🔑 Role-Based Access**: Separate permissions for students and admins
- **🛠️ Error Boundaries**: Comprehensive error handling and recovery
- **🔍 Input Validation**: Client and server-side validation with Zod

### 🎨 **Modern UI/UX**
- **✨ Glass Morphism**: Beautiful glassmorphism design elements
- **🎭 Loading States**: Elegant loading indicators and spinners
- **🎯 Toast System**: User-friendly notification system
- **📐 Design System**: Consistent UI components and patterns
- **🌈 Color Schemes**: Professional gradient themes
- **🖱️ Interactive Elements**: Smooth hover effects and animations

## �️ Technology Stack

### Frontend
- **⚛️ Next.js 13+** - React framework with App Router
- **🔷 TypeScript** - Type-safe development
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🎭 Framer Motion** - Animation and interactive elements
- **📝 React Hook Form** - Form management and validation
- **🔍 Zod** - Schema validation library
- **🍞 React Hot Toast** - Toast notification system

### Backend & Database
- **🌐 Next.js API Routes** - Serverless API endpoints
- **🔐 NextAuth.js** - Authentication and session management
- **🗄️ Prisma ORM** - Type-safe database client
- **🍃 MongoDB** - NoSQL database with Atlas hosting
- **🔒 bcrypt** - Password hashing and encryption
- **🎫 JWT** - JSON Web Tokens for verification
- **📧 Nodemailer** - Email service integration

### Development Tools
- **🔍 ESLint** - Code linting and formatting
- **🎨 PostCSS** - CSS processing and optimization
- **🚀 Vercel** - Deployment and hosting platform
- **📱 Git** - Version control system
- **🐳 Docker** - Containerization (optional)
- **🧪 Jest** - Testing framework

## �🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- MongoDB Atlas account (or local MongoDB)
- Git for version control

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
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:

   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/admission_management?retryWrites=true&w=majority"

   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # Email (Optional)
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="noreply@yourdomain.com"
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

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
admission-management-system/
├── 📁 src/
│   ├── 📁 app/                    # Next.js 13+ App Router
│   │   ├── 📁 api/               # API routes
│   │   │   ├── 📁 auth/          # Authentication endpoints
│   │   │   ├── 📁 admin/         # Admin API routes
│   │   │   └── 📁 student/       # Student API routes
│   │   ├── 📁 admin/             # Admin dashboard pages
│   │   ├── 📁 student/           # Student portal pages
│   │   ├── 📁 login/             # Authentication pages
│   │   └── 📁 register/          # Registration pages
│   ├── 📁 components/            # Reusable React components
│   │   ├── 📄 UI.tsx             # UI component library
│   │   ├── 📄 FileUpload.tsx     # File upload component
│   │   ├── 📄 ErrorBoundary.tsx  # Error handling
│   │   ├── 📄 ToastProvider.tsx  # Toast notifications
│   │   └── 📄 Navbar.tsx         # Navigation component
│   ├── 📁 hooks/                 # Custom React hooks
│   │   ├── 📄 useToast.ts        # Toast notifications
│   │   ├── 📄 useValidation.ts   # Form validation
│   │   └── 📄 useApi.ts          # API requests
│   ├── 📁 lib/                   # Utility libraries
│   │   ├── 📄 prisma.ts          # Database client
│   │   ├── 📄 validation.ts      # Zod schemas
│   │   ├── 📄 cache.ts           # Caching utilities
│   │   └── 📄 auth.ts            # Authentication utilities
│   └── 📁 styles/                # Global styles
├── 📁 prisma/                    # Database schema and migrations
│   ├── 📄 schema.prisma          # Database schema
│   └── 📁 migrations/            # Database migrations
├── 📁 public/                    # Static assets
│   ├── 📄 favicon.ico            # Favicon
│   └── 📁 images/                # Image assets
└── 📁 docs/                      # Documentation
```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Database Configuration

The application uses Prisma with MongoDB. The database schema includes:

- **Users**: Student and admin accounts with authentication
- **Applications**: Student program applications with status tracking
- **Sessions**: Secure session management with NextAuth.js

### Authentication Setup

NextAuth.js is configured with:

- **Credentials Provider**: Email/password authentication
- **JWT Strategy**: Secure token-based sessions
- **Role-Based Access**: Separate interfaces for students and admins
- **Email Verification**: Optional email verification workflow

### File Upload Configuration

- **Supported Formats**: PDF, DOC, DOCX, JPG, PNG
- **Size Limit**: Maximum 5MB per file
- **Storage**: Local storage (can be configured for cloud storage)
- **Validation**: Client and server-side file validation

## 📚 API Documentation

### Authentication Endpoints

```typescript
POST /api/register              # User registration
POST /api/auth/[...nextauth]    # NextAuth.js authentication
GET  /api/auth/verify-email     # Email verification
```

### Student Endpoints

```typescript
POST /api/student/application   # Submit application
GET  /api/student/status        # Check application status
PUT  /api/student/application   # Update application
```

### Admin Endpoints

```typescript
GET  /api/admin/applications    # List all applications
PUT  /api/admin/applications/:id # Update application status
GET  /api/admin/users          # Manage users
POST /api/admin/users          # Create new user
```

### Response Format

All API endpoints return consistent JSON responses:

```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": { ... }
}
```

## 🎨 UI Components

### Core Components

- **Card**: Versatile container with glass morphism effects
- **Button**: Multiple variants with loading states
- **Input**: Form inputs with validation support
- **Select**: Dropdown selections with error handling
- **FileUpload**: Drag-and-drop file upload component
- **Toast**: Notification system with multiple types
- **Spinner**: Loading indicators in various sizes
- **Alert**: Contextual alerts and messages
- **Badge**: Status indicators and labels

### Component Library Features

- **TypeScript Support**: Fully typed component props
- **Accessibility**: ARIA labels and keyboard navigation
- **Responsive Design**: Mobile-first approach
- **Theme Consistency**: Unified color palette and spacing
- **Animation**: Smooth transitions and hover effects

## 🔐 Security Features

### Authentication Security

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure session management
- **CSRF Protection**: Cross-site request forgery protection
- **Role Verification**: Server-side role checking
- **Session Expiry**: Automatic session timeout

### Data Protection

- **Input Validation**: Client and server-side validation
- **SQL Injection Prevention**: Prisma ORM protection
- **XSS Protection**: Content sanitization
- **Rate Limiting**: API request throttling
- **Error Handling**: Secure error messages

### Privacy & Compliance

- **Data Encryption**: Sensitive data encryption
- **Audit Logging**: User action tracking
- **GDPR Ready**: Data privacy compliance
- **Secure Headers**: Security-focused HTTP headers

## ⚡ Performance & SEO

### Performance Optimizations

- **Server-Side Rendering**: Fast initial page loads
- **Static Generation**: Pre-built pages for optimal performance
- **Image Optimization**: Automatic image compression and lazy loading
- **Code Splitting**: Bundle optimization for faster loading
- **Caching Strategy**: Smart API response caching
- **Database Optimization**: Efficient Prisma queries

### SEO Features

- **Meta Tags**: Comprehensive page metadata
- **Open Graph**: Social media preview optimization
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Automatic sitemap generation
- **Performance Metrics**: Core Web Vitals tracking
- **Accessibility**: Screen reader optimization

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy automatically

3. **Environment Variables**
   Add these to your Vercel dashboard:

   ```env
   DATABASE_URL=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_production_secret
   NEXTAUTH_URL=https://yourdomain.vercel.app
   EMAIL_SERVER_HOST=your_smtp_host
   EMAIL_SERVER_USER=your_email
   EMAIL_SERVER_PASSWORD=your_password
   ```

### Alternative Deployment Options

- **Docker**: Containerized deployment
- **AWS**: EC2, Lambda, or Amplify
- **Railway**: Simple deployment platform
- **DigitalOcean**: App Platform deployment

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Test Coverage

- **Unit Tests**: Component and utility testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Complete user workflow testing
- **Performance Tests**: Load and stress testing
│   └── UI.tsx             # UI component library
## 🤝 Contributing

We welcome contributions to improve the University Admission Management System! Here's how you can help:

### Development Workflow

1. **Fork the repository**

   ```bash
   git clone https://github.com/yourusername/Admission-Management-System.git
   cd Admission-Management-System
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Test your changes**

   ```bash
   npm run test
   npm run lint
   npm run build
   ```

5. **Commit your changes**

   ```bash
   git commit -m 'Add some amazing feature'
   ```

6. **Push to your branch**

   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**

### Code Style Guidelines

- Use TypeScript for all new code
- Follow ESLint rules and Prettier formatting
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Ensure accessibility compliance

### Reporting Issues

When reporting issues, please include:

- Clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node.js version)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 University Admission Management System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Support

Need help? We're here to assist you!

### 📧 Contact Information

- **Email**: [amitesh.maurya@university-admission.com](mailto:amitesh.maurya@university-admission.com)
- **GitHub Issues**: [Report a Bug](https://github.com/amitesh-maurya/Admission-Management-System/issues)
- **Discussions**: [GitHub Discussions](https://github.com/amitesh-maurya/Admission-Management-System/discussions)

### 📖 Documentation

- **API Docs**: [/docs/api.md](./docs/api.md)
- **Setup Guide**: [/docs/setup.md](./docs/setup.md)
- **Deployment Guide**: [/docs/deployment.md](./docs/deployment.md)
- **Contributing Guide**: [/docs/contributing.md](./docs/contributing.md)

### 🛠️ Troubleshooting

Common issues and solutions:

- **Database Connection**: Ensure MongoDB URI is correct
- **Environment Variables**: Double-check all required variables
- **Port Conflicts**: Change port in package.json if needed
- **Dependencies**: Run `npm install` to update packages

### 🌟 Roadmap

Upcoming features and improvements:

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Bulk application processing
- [ ] Integration with external APIs
- [ ] Multi-language support
- [ ] Advanced reporting features
- [ ] Real-time notifications
- [ ] Video interview scheduling

---

## 🙏 Acknowledgments

Special thanks to all contributors and the open-source community:

- **Next.js Team** - Amazing React framework
- **Prisma Team** - Excellent database toolkit
- **Tailwind CSS** - Utility-first CSS framework
- **MongoDB** - Flexible NoSQL database
- **Vercel** - Seamless deployment platform
- **All Contributors** - Thank you for your valuable contributions!

---

<div align="center">

**⭐ If you find this project helpful, please consider giving it a star! ⭐**

**Built with ❤️ by [Amitesh Maurya](https://github.com/amitesh-maurya)**

</div>
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
