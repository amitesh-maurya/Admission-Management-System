# Production deployment configuration for subdomain hosting

## Subdomain Deployment Guide

### 1. Environment Variables
Create a `.env.production` file with:

```env
# Database Configuration (use your production database)
DATABASE_URL="your-production-database-url"

# NextAuth Configuration
NEXTAUTH_SECRET="your-production-secret-key"
NEXTAUTH_URL="https://admission.yourdomain.com"

# Optional: Email configuration for notifications
# SMTP_HOST="your-smtp-server"
# SMTP_PORT=587
# SMTP_USER="your-email"
# SMTP_PASS="your-password"
```

### 2. Build Configuration
Update `next.config.ts` for production:

```typescript
const nextConfig = {
  output: 'standalone',
  trailingSlash: false,
  // Add your subdomain configuration here
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ]
  },
}

export default nextConfig
```

### 3. Database Setup
For production, consider using:
- PostgreSQL (recommended)
- MySQL
- MongoDB

Update your `schema.prisma` for production database:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "mysql"
  url      = env("DATABASE_URL")
}
```

### 4. Deployment Steps

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Test production build locally**
   ```bash
   npm start
   ```

3. **Deploy to your hosting platform**
   - Upload files to your web server
   - Set environment variables
   - Run database migrations
   - Start the application

### 5. Server Configuration (if using custom server)

Create a `server.js` file:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

### 6. Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure session cookies
- [ ] Enable CSRF protection
- [ ] Configure proper CORS settings
- [ ] Use strong database credentials
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging

### 7. Performance Optimization

- [ ] Enable gzip compression
- [ ] Configure CDN for static assets
- [ ] Set up database connection pooling
- [ ] Enable Next.js Image Optimization
- [ ] Configure caching headers

### 8. Backup Strategy

- [ ] Set up automated database backups
- [ ] Configure file storage backups
- [ ] Test backup restoration process
- [ ] Document recovery procedures

Ready for production deployment! 🚀