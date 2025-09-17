# Contributing to AdmitPro Portal

First off, thank you for considering contributing to AdmitPro Portal! 🎉

The following is a set of guidelines for contributing to this project. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Issue Guidelines](#issue-guidelines)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Admission-Management-System.git
   cd Admission-Management-System
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables** (see `.env.example`)
5. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🛠️ How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node.js version)

### 💡 Suggesting Enhancements

Enhancement suggestions are welcome! Please:

- **Use a clear and descriptive title**
- **Provide detailed explanation** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **Include mockups or examples** if applicable

### 🔧 Code Contributions

#### 🌟 Good First Issues

Look for issues labeled `good-first-issue` or `beginner-friendly` for easy entry points.

#### 🏗️ Development Areas

- **Frontend**: React components, UI/UX improvements, accessibility
- **Backend**: API endpoints, database optimizations, authentication
- **Testing**: Unit tests, integration tests, E2E tests
- **Documentation**: README improvements, code comments, tutorials
- **DevOps**: CI/CD, deployment, performance optimizations

## 🛠️ Development Setup

### Prerequisites

- **Node.js 18+**
- **MongoDB** (local or Atlas)
- **Git**

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Database
DATABASE_URL="mongodb://localhost:27017/admitpro"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Email (optional)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_FROM="noreply@admitpro.com"
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npm run seed
```

## 📝 Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our style guidelines

3. **Test your changes**:
   ```bash
   npm run lint
   npm run type-check
   npm run test
   ```

4. **Commit with conventional commits**:
   ```bash
   git commit -m "feat: add user profile management"
   git commit -m "fix: resolve authentication redirect issue"
   git commit -m "docs: update API documentation"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** with:
   - Clear title and description
   - Link to related issues
   - Screenshots/videos if UI changes
   - Testing instructions

## 🎨 Style Guidelines

### 💻 Code Style

- **TypeScript**: Use strict type checking
- **ESLint**: Follow the configured rules
- **Prettier**: Use for consistent formatting
- **Naming**: Use camelCase for variables, PascalCase for components
- **Comments**: Write clear, concise comments for complex logic

### 📁 File Organization

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── types/           # TypeScript type definitions
└── styles/          # Global styles and themes
```

### 🎯 Component Guidelines

- Use **functional components** with hooks
- Implement **TypeScript interfaces** for props
- Add **JSDoc comments** for component documentation
- Follow **single responsibility principle**
- Use **custom hooks** for complex logic

### 🗃️ Database Guidelines

- Use **Prisma schema** for database modeling
- Write **migrations** for schema changes
- Follow **naming conventions** (snake_case for database, camelCase for Prisma)
- Add **indexes** for frequently queried fields

## 🐛 Issue Guidelines

### 🏷️ Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good-first-issue`: Good for newcomers
- `help-wanted`: Extra attention is needed
- `question`: Further information is requested

### 📊 Issue Templates

Use the provided issue templates for:
- Bug reports
- Feature requests
- Documentation improvements

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks in project documentation

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Email**: amitesh@amiteshmaurya.com for direct contact

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

Thank you for contributing to AdmitPro Portal! 🚀