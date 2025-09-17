// Test full application submission with all fields
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['error', 'warn', 'info'],
});

async function testFullApplicationSubmission() {
  try {
    console.log('🧪 Testing Full Application Submission (All Fields)');
    console.log('📡 Connecting to database...');
    
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Check if we have any users to test with
    console.log('👥 Checking for existing users...');
    const users = await prisma.user.findMany({ take: 1 });
    
    if (users.length === 0) {
      console.log('❌ No users found - need to register a user first');
      return;
    }
    
    const testUser = users[0];
    console.log(`✅ Found test user: ${testUser.email} (${testUser.role})`);
    
    // Try to create a complete application with all fields
    console.log('📝 Creating complete application...');
    const completeApplication = {
      program: 'Computer Science',
      personalStatement: 'I am passionate about technology and want to pursue a career in software development. I have been programming for 3 years and built several projects.',
      previousEducation: 'High School Diploma from ABC School (2022). Completed coursework in Mathematics, Physics, and Computer Science.',
      courses: ['Programming Fundamentals', 'Data Structures', 'Algorithms'],
      expectedGrade: 'A',
      currentGPA: 3.8,
      phoneNumber: '+1 (555) 123-4567',
      emergencyContact: 'John Doe',
      emergencyPhone: '+1 (555) 987-6543',
      workExperience: '2 years as intern developer',
      extracurricularActivities: 'Programming club member, hackathon participant',
      scholarshipNeeded: true,
      startDate: new Date('2025-09-01'),
      studyMode: 'FULLTIME',
      accommodation: false,
      studentId: testUser.id,
    };
    
    const application = await prisma.application.create({
      data: completeApplication
    });
    
    console.log('✅ SUCCESS: Complete application created!');
    console.log('🎉 Application ID:', application.id);
    console.log('📚 Program:', application.program);
    console.log('📋 Courses:', application.courses?.join(', ') || 'None');
    console.log('🎯 Expected Grade:', application.expectedGrade);
    console.log('📊 Current GPA:', application.currentGPA || 'Not provided');
    console.log('📞 Phone:', application.phoneNumber);
    console.log('✍️ Personal Statement:', application.personalStatement.substring(0, 50) + '...');
    console.log('🎓 Previous Education:', application.previousEducation.substring(0, 50) + '...');
    console.log('💼 Work Experience:', application.workExperience?.substring(0, 30) + '...' || 'None');
    console.log('🏃 Activities:', application.extracurricularActivities?.substring(0, 30) + '...' || 'None');
    console.log('💰 Scholarship Needed:', application.scholarshipNeeded ? 'Yes' : 'No');
    console.log('🏠 Accommodation:', application.accommodation ? 'Yes' : 'No');
    console.log('📚 Study Mode:', application.studyMode);
    console.log('📅 Start Date:', application.startDate?.toISOString().split('T')[0] || 'Not specified');
    console.log('📅 Submitted:', application.submittedAt);
    console.log('📊 Status:', application.status);
    
    // Check total applications
    const appCount = await prisma.application.count();
    console.log(`📈 Total applications in database: ${appCount}`);
    
    console.log('\n🎯 FORM SUBMISSION SHOULD NOW WORK!');
    console.log('✅ All required fields are now supported in the database');
    
  } catch (error) {
    console.error('❌ APPLICATION SUBMISSION FAILED:');
    console.error('📋 Error Type:', error.name);
    console.error('💬 Error Message:', error.message);
    console.error('Stack:', error.stack);
    
  } finally {
    await prisma.$disconnect();
  }
}

testFullApplicationSubmission();