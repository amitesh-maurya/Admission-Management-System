import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: List all users (admin only, for API)
export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(users);
}

// POST: Create a new user (admin or registration)
export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();
  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // Password should be hashed in registration route, not here
  const user = await prisma.user.create({
    data: { name, email, password, role },
  });
  return NextResponse.json({ id: user.id, email: user.email, role: user.role });
}
