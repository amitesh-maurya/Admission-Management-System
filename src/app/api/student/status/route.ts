import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "STUDENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const applications = await prisma.application.findMany({
    where: { studentId: session.user.id },
    orderBy: { submittedAt: "desc" },
  });
  return NextResponse.json(applications);
}
