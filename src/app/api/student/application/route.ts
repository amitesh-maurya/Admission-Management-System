import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  id?: string;
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions) as { user?: SessionUser } | null;
  if (!session || !session.user || session.user.role !== "STUDENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { program } = await req.json();
  if (!program) {
    return NextResponse.json({ error: "Program is required" }, { status: 400 });
  }
  if (!session.user.id) {
    return NextResponse.json({ error: "Student ID is missing" }, { status: 400 });
  }
  const application = await prisma.application.create({
    data: {
      program,
      studentId: session.user.id,
    },
  });
  return NextResponse.json(application);
}
