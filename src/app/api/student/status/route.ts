/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!session || !(session.user && (session.user as any).role === "STUDENT")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const applications = await prisma.application.findMany({
    where: { studentId: (session.user as any).id },
    orderBy: { submittedAt: "desc" },
  });
  return NextResponse.json(applications);
}
