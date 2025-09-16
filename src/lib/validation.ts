// Validation schemas using Zod
import { z } from 'zod';

// User registration validation
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  role: z.enum(['STUDENT', 'ADMIN'], {
    message: 'Role must be either STUDENT or ADMIN'
  })
});

// Login validation
export const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  password: z
    .string()
    .min(1, 'Password is required')
});

// Application validation
export const applicationSchema = z.object({
  program: z
    .string()
    .min(2, 'Program name must be at least 2 characters')
    .max(100, 'Program name must be less than 100 characters'),
  personalStatement: z
    .string()
    .min(50, 'Personal statement must be at least 50 characters')
    .max(2000, 'Personal statement must be less than 2000 characters'),
  previousEducation: z
    .string()
    .min(10, 'Previous education must be at least 10 characters')
    .max(500, 'Previous education must be less than 500 characters')
});

// Email verification
export const emailVerificationSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
});

// Password reset request
export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
});

// Password reset
export const passwordResetSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// File upload validation
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg'];
        return allowedTypes.includes(file.type);
      },
      'File must be PDF, Word document, or image (JPG, PNG)'
    )
});

// Admin user creation
export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  role: z.enum(['STUDENT', 'ADMIN'])
});

// Export types for TypeScript
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ApplicationData = z.infer<typeof applicationSchema>;
export type EmailVerificationData = z.infer<typeof emailVerificationSchema>;
export type PasswordResetRequestData = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetData = z.infer<typeof passwordResetSchema>;
export type FileUploadData = z.infer<typeof fileUploadSchema>;
export type CreateUserData = z.infer<typeof createUserSchema>;