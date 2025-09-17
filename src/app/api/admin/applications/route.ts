export const runtime = "nodejs";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import  authOptions  from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  // Debug logging for session
  console.log("=== ADMIN APPLICATIONS SESSION DEBUG ===");
  console.log("Session exists:", !!session);
  console.log("User exists:", !!session?.user);
  console.log("User role:", session?.user?.role);
  console.log("User ID:", session?.user?.id);
  console.log("=====================================");
  if (!session || !session.user || session.user.role !== "ADMIN" || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized or missing user info" }, { status: 401 });
  }
  const applications = await prisma.application.findMany({
    include: { student: true },
    orderBy: { submittedAt: "desc" },
  });
  return NextResponse.json(applications);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  // Debug logging for session
  console.log("=== ADMIN APPLICATIONS PATCH SESSION DEBUG ===");
  console.log("Session exists:", !!session);
  console.log("User exists:", !!session?.user);
  console.log("User role:", session?.user?.role);
  console.log("User ID:", session?.user?.id);
  console.log("=====================================");
  if (!session || !session.user || session.user.role !== "ADMIN" || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized or missing user info" }, { status: 401 });
  }
  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const updated = await prisma.application.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(updated);
}
