// Data models and features outline for University Admission System

/**
 * User Roles:
 * - Student: Can register, login, submit applications, view status
 * - Admin: Can login, view/manage all applications, update status
 *
 * Main Features:
 * - Authentication (NextAuth.js)
 * - Student application form
 * - Admin dashboard
 * - Application status tracking
 * - API routes for CRUD
 * - Database integration (Prisma + SQLite/Postgres)
 */

// Data Models (Prisma schema preview)
/**
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      Role
  applications Application[]
}

enum Role {
  STUDENT
  ADMIN
}

model Application {
  id          String   @id @default(uuid())
  student     User     @relation(fields: [studentId], references: [id])
  studentId   String
  program     String
  status      ApplicationStatus @default(PENDING)
  submittedAt DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum ApplicationStatus {
  PENDING
  ACCEPTED
  REJECTED
}
*/

// Folder structure:
// src/app/student - student pages (dashboard, application form, status)
// src/app/admin - admin dashboard
// src/lib - shared utilities (db, auth)
// src/pages/api - API routes (CRUD)

// Next steps: Set up Prisma and database
