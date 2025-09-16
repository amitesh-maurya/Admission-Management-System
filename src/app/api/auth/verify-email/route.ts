// Email verification API route
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Verify the JWT token
    const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret';
    let decoded;
    
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Find the user and update their email verification status
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: 'Email is already verified' },
        { status: 200 }
      );
    }

    // Update user's email verification status
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { 
        emailVerified: new Date(),
        updatedAt: new Date()
      }
    });

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: 'Email is already verified' },
        { status: 200 }
      );
    }

    // Generate verification token
    const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret';
    const verificationToken = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // In a real application, you would send this via email service (SendGrid, AWS SES, etc.)
    // For development, we'll return the token in the response
    const verificationLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/verify-email?token=${verificationToken}`;

    console.log('Email verification link:', verificationLink);

    return NextResponse.json(
      { 
        message: 'Verification email sent',
        // Remove this in production - only for development
        verificationLink: process.env.NODE_ENV === 'development' ? verificationLink : undefined
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Send verification email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}