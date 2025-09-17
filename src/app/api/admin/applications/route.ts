export const runtime = "nodejs";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions, req);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const applications = await prisma.application.findMany({
    include: { student: true },
    orderBy: { submittedAt: "desc" },
  });
  return NextResponse.json(applications);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions, req);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
