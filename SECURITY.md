# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within AdmitPro Portal, please send an email to amitesh@amiteshmaurya.com. All security vulnerabilities will be promptly addressed.

Please do not report security vulnerabilities through public GitHub issues.

### What to include:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### Response Timeline:

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Security Fix**: Within 30 days (depending on complexity)

## Security Best Practices

This project implements several security measures:

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CSRF protection
- XSS protection
- SQL injection prevention through Prisma ORM
- Rate limiting on API endpoints
- Environment variable protection
- Secure HTTP headers

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine the affected versions
2. Audit code to find any potential similar problems
3. Prepare fixes for all supported releases
4. Release new versions as soon as possible
5. Prominently feature the problem in the release notes

Thank you for helping keep AdmitPro Portal and our users safe!