import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: List all applications (admin only, for API)
export async function GET() {
  const applications = await prisma.application.findMany({
    include: { student: true },
    orderBy: { submittedAt: "desc" },
  });
  return NextResponse.json(applications);
}

// POST: Create a new application (student)
export async function POST(req: Request) {
  const { program, studentId } = await req.json();
  if (!program || !studentId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const application = await prisma.application.create({
    data: { program, studentId },
  });
  return NextResponse.json(application);
}
