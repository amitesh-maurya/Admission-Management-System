// Test application submission to debug the form submission issue
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['error', 'warn', 'info'],
});

async function testApplicationSubmission() {
  try {
    console.log('🧪 Testing Application Submission');
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
    
    // Try to create a test application
    console.log('📝 Creating test application...');
    const testApplication = {
      program: 'Computer Science',
      studentId: testUser.id,
      // Note: The current API only handles 'program', not personalStatement or previousEducation
    };
    
    const application = await prisma.application.create({
      data: testApplication
    });
    
    console.log('✅ SUCCESS: Application created!');
    console.log('🎉 Application ID:', application.id);
    console.log('📚 Program:', application.program);
    console.log('📅 Submitted:', application.submittedAt);
    console.log('📊 Status:', application.status);
    
    // Check total applications
    const appCount = await prisma.application.count();
    console.log(`📈 Total applications in database: ${appCount}`);
    
  } catch (error) {
    console.error('❌ APPLICATION SUBMISSION FAILED:');
    console.error('📋 Error Type:', error.name);
    console.error('💬 Error Message:', error.message);
    
    if (error.code === 'P2002') {
      console.log('\n💡 DUPLICATE APPLICATION:');
      console.log('This user may have already submitted an application');
    } else if (error.code === 'P2003') {
      console.log('\n💡 FOREIGN KEY CONSTRAINT:');
      console.log('Student ID does not exist in users table');
    } else if (error.message.includes('studentId')) {
      console.log('\n💡 STUDENT ID ISSUE:');
      console.log('Check if user has correct role and ID exists');
    }
    
  } finally {
    await prisma.$disconnect();
  }
}

testApplicationSubmission();