import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get application statistics
    const totalApplications = await prisma.application.count();
    const pendingApplications = await prisma.application.count({
      where: { status: "PENDING" }
    });
    const acceptedApplications = await prisma.application.count({
      where: { status: "ACCEPTED" }
    });
    const rejectedApplications = await prisma.application.count({
      where: { status: "REJECTED" }
    });

    // Get recent applications (last 5)
    const recentApplications = await prisma.application.findMany({
      include: { student: true },
      orderBy: { submittedAt: "desc" },
      take: 5
    });

    // Get total users
    const totalUsers = await prisma.user.count();
    const totalStudents = await prisma.user.count({
      where: { role: "STUDENT" }
    });

    // Get applications by program
    const programStats = await prisma.application.groupBy({
      by: ['program'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    });

    const dashboardData = {
      statistics: {
        totalApplications,
        pendingApplications,
        acceptedApplications,
        rejectedApplications,
        totalUsers,
        totalStudents
      },
      recentApplications,
      programStats: programStats.map(stat => ({
        program: stat.program,
        count: stat._count.id
      }))
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}