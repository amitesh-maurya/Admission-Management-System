export const runtime = "nodejs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  // Debug logging for session
  console.log("=== STUDENT STATUS SESSION DEBUG ===");
  console.log("Session exists:", !!session);
  console.log("User exists:", !!session?.user);
  console.log("User role:", session?.user?.role);
  console.log("User ID:", session?.user?.id);
  console.log("=====================================");
  if (!session || !session.user || session.user.role !== "STUDENT" || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized or missing user info" }, { status: 401 });
  }
  const applications = await prisma.application.findMany({
    where: { studentId: session.user.id },
    orderBy: { submittedAt: "desc" },
  });
  return NextResponse.json(applications);
}
