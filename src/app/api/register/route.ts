import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log('🔍 Registration attempt started');
    
    const { name, email, password, role } = await req.json();
    console.log('📝 Request data:', { name, email, role, hasPassword: !!password });
    
    if (!name || !email || !password || !role) {
      console.log('❌ Missing fields validation failed');
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    
    // Validate role
    if (!['STUDENT', 'ADMIN'].includes(role)) {
      console.log('❌ Invalid role:', role);
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    
    console.log('🔍 Checking if user exists...');
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log('❌ User already exists:', email);
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    
    console.log('🔒 Hashing password...');
    const hashed = await hash(password, 10);
    
    console.log('💾 Creating user in database...');
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role },
    });
    
    console.log('✅ User created successfully:', user.id);
    return NextResponse.json({ id: user.id, email: user.email, role: user.role });
  } catch (error) {
    console.error('💥 Registration error:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Check for specific database connection errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('MongoServerError') || errorMessage.includes('connection')) {
      return NextResponse.json({ 
        error: 'Database connection failed', 
        details: 'MongoDB Atlas connection issue'
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: process.env.NODE_ENV === 'development' ? errorMessage : 'Registration failed'
    }, { status: 500 });
  }
}
