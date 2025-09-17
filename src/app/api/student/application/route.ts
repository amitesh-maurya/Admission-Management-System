export const runtime = "nodejs";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  id?: string;
};

export async function POST(req: NextRequest) {
  let session: { user?: SessionUser } | null = null;
  try {
    session = await getServerSession(authOptions) as { user?: SessionUser } | null;
    // Debug logging
    console.log("=== APPLICATION SUBMISSION DEBUG ===");
    console.log("Session exists:", !!session);
    console.log("User exists:", !!session?.user);
    console.log("User role:", session?.user?.role);
    console.log("User ID:", session?.user?.id);
    console.log("=====================================");
    if (!session || !session.user || !session.user.id) {
      console.log("❌ Authentication failed: No session, user, or user ID");
      return NextResponse.json({ 
        error: "Authentication required. Please log in first.",
        debug: "No session/user/userId found"
      }, { status: 401 });
    }
    if (session.user.role && session.user.role !== "STUDENT") {
      console.log(`❌ Authorization failed: Role is ${session.user.role}, expected STUDENT`);
      return NextResponse.json({ 
        error: `Access denied. Your role is '${session.user.role}' but 'STUDENT' is required.`,
        debug: `Current role: ${session.user.role}`
      }, { status: 403 });
    }
    console.log("✅ Authentication successful");
    if (session.user.role && session.user.role !== "STUDENT") {
      console.log(`❌ Authorization failed: Role is ${session.user.role}, expected STUDENT`);
      return NextResponse.json({ 
        error: `Access denied. Your role is '${session.user.role}' but 'STUDENT' is required.`,
        debug: `Current role: ${session.user.role}`
      }, { status: 403 });
    }
    console.log("✅ Authentication successful");
  } catch (authError) {
    console.error("Authentication error:", authError);
    return NextResponse.json({ 
      error: "Authentication system error. Please try again.",
      debug: "Auth system error"
    }, { status: 500 });
  }
  
  const { 
    program, 
    personalStatement, 
    previousEducation,
    courses,
    expectedGrade,
    currentGPA,
    phoneNumber,
    emergencyContact,
    emergencyPhone,
    workExperience,
    extracurricularActivities,
    scholarshipNeeded,
    startDate,
    studyMode,
    accommodation
  } = await req.json();
  
  // Validate required fields
  if (!program) {
    return NextResponse.json({ error: "Program is required" }, { status: 400 });
  }
  if (!personalStatement) {
    return NextResponse.json({ error: "Personal statement is required" }, { status: 400 });
  }
  if (!previousEducation) {
    return NextResponse.json({ error: "Previous education is required" }, { status: 400 });
  }
  if (!courses || !Array.isArray(courses) || courses.length < 3) {
    return NextResponse.json({ error: "At least 3 courses must be selected" }, { status: 400 });
  }
  if (!expectedGrade) {
    return NextResponse.json({ error: "Expected grade is required" }, { status: 400 });
  }
  if (!phoneNumber) {
    return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
  }
  
  if (!session.user.id) {
    return NextResponse.json({ error: "Student ID is missing" }, { status: 400 });
  }
  
  try {
    const application = await prisma.application.create({
      data: {
        program,
        personalStatement,
        previousEducation,
        courses,
        expectedGrade,
        currentGPA: currentGPA ? parseFloat(currentGPA) : null,
        phoneNumber,
        emergencyContact: emergencyContact || null,
        emergencyPhone: emergencyPhone || null,
        workExperience: workExperience || null,
        extracurricularActivities: extracurricularActivities || null,
        scholarshipNeeded: Boolean(scholarshipNeeded),
        startDate: startDate ? new Date(startDate) : null,
        studyMode: studyMode || "FULLTIME",
        accommodation: Boolean(accommodation),
        studentId: session.user.id,
      },
    });
    
    return NextResponse.json({ 
      message: "Application submitted successfully",
      application 
    });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
