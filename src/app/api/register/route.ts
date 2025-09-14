import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();
  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  }
  const hashed = await hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role },
  });
  return NextResponse.json({ id: user.id, email: user.email, role: user.role });
}
