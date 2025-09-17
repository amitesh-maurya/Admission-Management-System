"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

const PROGRAMS = [
	{ id: 'computer-science', name: 'Computer Science', courses: ['Programming Fundamentals', 'Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering', 'Machine Learning'] },
	{ id: 'medicine', name: 'Medicine', courses: ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology', 'Clinical Medicine'] },
	{ id: 'engineering', name: 'Engineering', courses: ['Mathematics', 'Physics', 'Engineering Design', 'Materials Science', 'Thermodynamics', 'Circuit Analysis'] },
	{ id: 'business', name: 'Business Administration', courses: ['Management', 'Marketing', 'Finance', 'Economics', 'Business Strategy', 'Operations Management'] },
	{ id: 'psychology', name: 'Psychology', courses: ['General Psychology', 'Cognitive Psychology', 'Social Psychology', 'Research Methods', 'Statistics', 'Abnormal Psychology'] },
];

const STUDY_MODES = [
	{ value: 'FULLTIME', label: 'Full-time' },
	{ value: 'PARTTIME', label: 'Part-time' },
	{ value: 'ONLINE', label: 'Online' },
	{ value: 'HYBRID', label: 'Hybrid' },
];

const EXPECTED_GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'Pass'];

const EDUCATION_LEVELS = [
	{ value: 'high_school', label: 'High School Diploma' },
	{ value: 'associate', label: 'Associate Degree' },
	{ value: 'bachelor', label: 'Bachelor\'s Degree' },
	{ value: 'master', label: 'Master\'s Degree' },
	{ value: 'doctoral', label: 'Doctoral Degree' },
	{ value: 'professional', label: 'Professional Certification' },
	{ value: 'other', label: 'Other' }
];

const COUNTRIES = [
	{ value: 'us', label: 'United States' },
	{ value: 'ca', label: 'Canada' },
	{ value: 'uk', label: 'United Kingdom' },
	{ value: 'au', label: 'Australia' },
	{ value: 'de', label: 'Germany' },
	{ value: 'fr', label: 'France' },
	{ value: 'in', label: 'India' },
	{ value: 'cn', label: 'China' },
	{ value: 'jp', label: 'Japan' },
	{ value: 'other', label: 'Other' }
];

const PREFERRED_CONTACT = [
	{ value: 'email', label: 'Email' },
	{ value: 'phone', label: 'Phone' },
	{ value: 'sms', label: 'SMS/Text' },
	{ value: 'mail', label: 'Postal Mail' }
];

export default function ApplicationForm() {
	const [currentStep, setCurrentStep] = useState(1);
	const [form, setForm] = useState({
		program: "",
		courses: [] as string[],
		personalStatement: "",
		previousEducation: "",
		educationLevel: "",
		schoolName: "",
		graduationYear: "",
		educationCountry: "",
		expectedGrade: "",
		currentGPA: "",
		email: "",
		phoneNumber: "",
		emergencyContact: "",
		emergencyPhone: "",
		preferredContact: "",
		workExperience: "",
		extracurricularActivities: "",
		scholarshipNeeded: false,
		startDate: "",
		studyMode: "FULLTIME",
		accommodation: false,
	});
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { data: session } = useSession();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		if (type === 'checkbox') {
			const checked = (e.target as HTMLInputElement).checked;
			setForm({ ...form, [name]: checked });
		} else {
			setForm({ ...form, [name]: value });
		}
	};

	const handleCourseToggle = (course: string) => {
		const updatedCourses = form.courses.includes(course)
			? form.courses.filter(c => c !== course)
			: [...form.courses, course];
		setForm({ ...form, courses: updatedCourses });
	};

	const selectedProgram = PROGRAMS.find(p => p.id === form.program);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setMessage("");
		setLoading(true);
		try {
			const res = await fetch("/api/student/application", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...form,
					currentGPA: form.currentGPA ? parseFloat(form.currentGPA) : null,
					startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
				}),
			});
			setLoading(false);
			if (res.ok) {
				const data = await res.json();
				setMessage(`Application submitted successfully! Application ID: ${data.application?.id?.slice(-8) || 'Generated'}`);
				setForm({
					program: "", courses: [], personalStatement: "", previousEducation: "",
					educationLevel: "", schoolName: "", graduationYear: "", educationCountry: "",
					expectedGrade: "", currentGPA: "", email: "", phoneNumber: "", emergencyContact: "", emergencyPhone: "",
					preferredContact: "", workExperience: "", extracurricularActivities: "", scholarshipNeeded: false,
					startDate: "", studyMode: "FULLTIME", accommodation: false,
				});
				setCurrentStep(1);
			} else {
				const data = await res.json();
				setError(data.error || "Submission failed");
			}
		} catch (error) {
			setLoading(false);
			setError("Network error. Please try again.");
		}
	};

	const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
	const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

	const isStepValid = (step: number): boolean => {
		switch (step) {
			case 1: return !!(form.program && form.courses.length >= 3);
			case 2: return !!(form.personalStatement && form.previousEducation && form.expectedGrade);
			case 3: return !!(form.email && form.phoneNumber);
			case 4: return true;
			default: return false;
		}
	};

	if (!session) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
				<div className="p-8 text-center max-w-md bg-white rounded shadow">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
					<p className="text-gray-600 mb-6">Please log in to submit an application.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="p-6 mb-8 bg-white rounded shadow">
					<div className="text-center">
						<h1 className="text-4xl font-bold text-gray-900 mb-2">University Application</h1>
						<p className="text-lg text-gray-600">Complete your application in 4 easy steps</p>
					</div>
					{/* Progress Bar */}
					<div className="mt-8">
						<div className="flex justify-between items-center">
							{[1, 2, 3, 4].map((step) => (
								<div key={step} className="flex flex-col items-center">
									<div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
										${currentStep >= step 
											? 'bg-blue-600 text-white' 
											: 'bg-gray-200 text-gray-500'
										}
									`}>
										{step}
									</div>
									<span className="text-xs mt-2 text-gray-600">
										{step === 1 && 'Program'}
										{step === 2 && 'Academic'}
										{step === 3 && 'Personal'}
										{step === 4 && 'Review'}
									</span>
								</div>
							))}
						</div>
						<div className="mt-4 bg-gray-200 rounded-full h-2">
							<div 
								className={`bg-blue-600 h-2 rounded-full transition-all duration-300 ${
									currentStep === 1 ? 'w-1/4' : 
									currentStep === 2 ? 'w-2/4' : 
									currentStep === 3 ? 'w-3/4' : 'w-full'
								}`}
							/>
						</div>
					</div>
				</div>

				{/* Form */}
				<div className="p-8 bg-white rounded shadow">
					{message && (
						<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
							{message}
						</div>
					)}
					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
							{error}
						</div>
					)}
					<form onSubmit={handleSubmit} className="space-y-8">
						{/* Step 1: Program & Course Selection */}
						{currentStep === 1 && (
							<div className="space-y-8">
								<div className="text-center mb-8">
									<h2 className="text-3xl font-bold text-gray-900 mb-2">🎓 Choose Your Program</h2>
									<p className="text-lg text-gray-600">Select your desired program and customize your course selection</p>
								</div>
								
								{/* Enhanced Program Selection */}
								<div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
									<label className="block text-lg font-semibold text-gray-800 mb-4">
										🎯 Select Program <span className="text-red-500">*</span>
									</label>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{PROGRAMS.map((program) => (
											<div key={program.id} className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg
												${form.program === program.id 
													? 'border-blue-500 bg-gradient-to-br from-blue-100 to-blue-50 shadow-lg' 
													: 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
												}`}
												onClick={() => setForm({ ...form, program: program.id, courses: [] })}
											>
												{form.program === program.id && (
													<div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
														✓
													</div>
												)}
												<div className="text-center">
													<div className="text-2xl mb-2">
														{program.id === 'computer-science' && '💻'}
														{program.id === 'medicine' && '🏥'}
														{program.id === 'engineering' && '⚙️'}
														{program.id === 'business' && '📊'}
														{program.id === 'psychology' && '🧠'}
													</div>
													<h3 className="font-bold text-gray-900 text-lg mb-2">{program.name}</h3>
													<div className="flex items-center justify-center gap-2 text-sm text-gray-600">
														<span className="bg-gray-100 px-2 py-1 rounded-full">
															{program.courses.length} courses
														</span>
														<span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
															Popular
														</span>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Enhanced Course Selection */}
								{selectedProgram && (
									<div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
										<label className="block text-lg font-semibold text-gray-800 mb-4">
											📚 Select Your Courses <span className="text-red-500">*</span>
										</label>
										<div className="mb-4 p-4 bg-white rounded-lg border-l-4 border-blue-500">
											<div className="flex items-center gap-2 mb-2">
												<div className="text-2xl">
													{selectedProgram.id === 'computer-science' && '💻'}
													{selectedProgram.id === 'medicine' && '🏥'}
													{selectedProgram.id === 'engineering' && '⚙️'}
													{selectedProgram.id === 'business' && '📊'}
													{selectedProgram.id === 'psychology' && '🧠'}
												</div>
												<h3 className="text-xl font-bold text-gray-900">{selectedProgram.name}</h3>
											</div>
											<p className="text-gray-600 text-sm">Choose at least 3 courses to proceed. These courses will form the foundation of your program.</p>
										</div>
										
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
											{selectedProgram.courses.map((course, index) => (
												<div key={course} 
													className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md
														${form.courses.includes(course)
															? 'border-green-500 bg-gradient-to-br from-green-100 to-green-50 shadow-md'
															: 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
														}`}
													onClick={() => handleCourseToggle(course)}
												>
													{form.courses.includes(course) && (
														<div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
															✓
														</div>
													)}
													<div className="text-center">
														<div className="text-lg mb-2">
															{index < 2 ? '⭐' : index < 4 ? '📖' : '🎯'}
														</div>
														<span className="text-sm font-semibold text-gray-800 leading-tight">{course}</span>
														{index < 2 && (
															<div className="mt-2">
																<span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
																	Core
																</span>
															</div>
														)}
													</div>
												</div>
											))}
										</div>
										
										<div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
											<div className="flex items-center justify-between">
												<div>
													<span className="text-sm font-medium text-gray-700">
														Selected: {form.courses.length} course{form.courses.length !== 1 ? 's' : ''}
													</span>
													<div className="text-xs text-gray-500 mt-1">
														Minimum 3 required • Maximum {selectedProgram.courses.length} available
													</div>
												</div>
												<div className="flex items-center gap-2">
													{form.courses.length >= 3 ? (
														<span className="text-green-600 text-sm font-medium flex items-center gap-1">
															<span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
															Ready to proceed
														</span>
													) : (
														<span className="text-amber-600 text-sm font-medium flex items-center gap-1">
															<span className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
															Select {3 - form.courses.length} more
														</span>
													)}
												</div>
											</div>
											{form.courses.length > 0 && (
												<div className="mt-3 pt-3 border-t border-gray-100">
													<div className="text-xs text-gray-600 mb-2">Selected courses:</div>
													<div className="flex flex-wrap gap-1">
														{form.courses.map((course) => (
															<span key={course} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
																{course}
															</span>
														))}
													</div>
												</div>
											)}
										</div>
									</div>
								)}
							</div>
						)}
						{/* Step 2: Academic Information */}
						{currentStep === 2 && (
							<div className="space-y-8">
								<div className="text-center mb-8">
									<h2 className="text-3xl font-bold text-gray-900 mb-2">📚 Academic Information</h2>
									<p className="text-lg text-gray-600">Tell us about your academic background and qualifications</p>
								</div>
								
								{/* Academic Performance */}
								<div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
									<h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
										🎯 Academic Performance
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Expected Grade <span className="text-red-500">*</span>
											</label>
											<select
												name="expectedGrade"
												value={form.expectedGrade}
												onChange={handleChange}
												required
												aria-label="Expected Grade"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white transition-all duration-200"
											>
												<option value="">Select expected grade</option>
												{EXPECTED_GRADES.map(grade => (
													<option key={grade} value={grade}>{grade}</option>
												))}
											</select>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Current GPA (Optional)
											</label>
											<input
												type="number"
												name="currentGPA"
												value={form.currentGPA}
												onChange={handleChange}
												step="0.01"
												min="0"
												max="4.0"
												placeholder="e.g., 3.75"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
											/>
										</div>
									</div>
								</div>

								{/* Previous Education */}
								<div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6">
									<h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
										🏫 Previous Education <span className="text-red-500">*</span>
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Highest Education Level <span className="text-red-500">*</span>
											</label>
											<select
												name="educationLevel"
												value={form.educationLevel}
												onChange={handleChange}
												required
												aria-label="Highest Education Level"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white transition-all duration-200"
											>
												<option value="">Select education level</option>
												{EDUCATION_LEVELS.map(level => (
													<option key={level.value} value={level.value}>{level.label}</option>
												))}
											</select>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												School/Institution Name
											</label>
											<input
												type="text"
												name="schoolName"
												value={form.schoolName}
												onChange={handleChange}
												placeholder="Name of your school or institution"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Graduation Year
											</label>
											<input
												type="number"
												name="graduationYear"
												value={form.graduationYear}
												onChange={handleChange}
												min="1990"
												max="2030"
												placeholder="e.g., 2024"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Country of Education
											</label>
											<select
												name="educationCountry"
												value={form.educationCountry}
												onChange={handleChange}
												aria-label="Country of Education"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white transition-all duration-200"
											>
												<option value="">Select country</option>
												{COUNTRIES.map(country => (
													<option key={country.value} value={country.value}>{country.label}</option>
												))}
											</select>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Educational Background Details <span className="text-red-500">*</span>
										</label>
										<textarea
											name="previousEducation"
											value={form.previousEducation}
											onChange={handleChange}
											required
											rows={4}
											placeholder="Describe your educational background, subjects studied, achievements, etc."
											className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
										/>
									</div>
								</div>

								{/* Personal Statement */}
								<div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
									<h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
										✍️ Personal Statement <span className="text-red-500">*</span>
									</h3>
									<div className="mb-4 p-4 bg-white rounded-lg border-l-4 border-blue-500">
										<h4 className="font-semibold text-gray-800 mb-2">Guidelines for your statement:</h4>
										<ul className="text-sm text-gray-600 space-y-1">
											<li>• Why do you want to study this program?</li>
											<li>• What are your career goals and aspirations?</li>
											<li>• What unique perspective will you bring?</li>
											<li>• How will this program help achieve your goals?</li>
										</ul>
									</div>
									<textarea
										name="personalStatement"
										value={form.personalStatement}
										onChange={handleChange}
										required
										rows={8}
										placeholder="Write your personal statement here. This is your opportunity to tell us about yourself, your motivations, and your goals..."
										className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
									/>
									<div className="mt-2 text-sm text-gray-500 text-right">
										{form.personalStatement.length}/1000 characters
									</div>
								</div>
							</div>
						)}
						{/* Step 3: Personal & Contact Information */}
						{currentStep === 3 && (
							<div className="space-y-8">
								<div className="text-center mb-8">
									<h2 className="text-3xl font-bold text-gray-900 mb-2">👤 Personal & Contact Information</h2>
									<p className="text-lg text-gray-600">Help us connect with you and understand your preferences</p>
								</div>
								
								{/* Contact Information */}
								<div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6">
									<h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
										📱 Contact Details
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Email Address <span className="text-red-500">*</span>
											</label>
											<input
												type="email"
												name="email"
												value={form.email}
												onChange={handleChange}
												required
												placeholder="your.email@example.com"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Phone Number <span className="text-red-500">*</span>
											</label>
											<input
												type="tel"
												name="phoneNumber"
												value={form.phoneNumber}
												onChange={handleChange}
												required
												placeholder="+1 (555) 123-4567"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Preferred Contact Method
											</label>
											<select
												name="preferredContact"
												value={form.preferredContact}
												onChange={handleChange}
												aria-label="Preferred Contact Method"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white transition-all duration-200"
											>
												<option value="">Select preferred method</option>
												{PREFERRED_CONTACT.map(method => (
													<option key={method.value} value={method.value}>{method.label}</option>
												))}
											</select>
										</div>
									</div>
								</div>

								{/* Study Preferences */}
								<div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
									<h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
										🎓 Study Preferences
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Expected Start Date
											</label>
											<input
												type="date"
												name="startDate"
												value={form.startDate}
												onChange={handleChange}
												aria-label="Expected Start Date"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all duration-200"
											/>
										</div>
									</div>
									
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-4">
											Study Mode Preference
										</label>
										<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
											{STUDY_MODES.map((mode) => (
												<div key={mode.value} 
													className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 text-center hover:shadow-md
														${form.studyMode === mode.value
															? 'border-indigo-500 bg-gradient-to-br from-indigo-100 to-indigo-50 shadow-md'
															: 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'
														}`}
													onClick={() => setForm({ ...form, studyMode: mode.value })}
												>
													{form.studyMode === mode.value && (
														<div className="absolute -top-2 -right-2 bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
															✓
														</div>
													)}
													<div className="text-lg mb-2">
														{mode.value === 'FULLTIME' && '🎯'}
														{mode.value === 'PARTTIME' && '⏰'}
														{mode.value === 'ONLINE' && '💻'}
														{mode.value === 'HYBRID' && '🔄'}
													</div>
													<span className="text-sm font-semibold text-gray-800">{mode.label}</span>
													<div className="text-xs text-gray-500 mt-1">
														{mode.value === 'FULLTIME' && 'On-campus'}
														{mode.value === 'PARTTIME' && 'Flexible hours'}
														{mode.value === 'ONLINE' && 'Remote learning'}
														{mode.value === 'HYBRID' && 'Mixed format'}
													</div>
												</div>
											))}
										</div>
									</div>
								</div>

								{/* Emergency Contact */}
								<div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6">
									<h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
										🚨 Emergency Contact Information
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
											<input
												type="text"
												name="emergencyContact"
												value={form.emergencyContact}
												onChange={handleChange}
												placeholder="Full name"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone</label>
											<input
												type="tel"
												name="emergencyPhone"
												value={form.emergencyPhone}
												onChange={handleChange}
												placeholder="+1 (555) 123-4567"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
											/>
										</div>
									</div>
								</div>

								{/* Additional Information */}
								<div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
									<h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
										📝 Additional Information
									</h3>
									<div className="space-y-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Work Experience (Optional)</label>
											<textarea
												name="workExperience"
												value={form.workExperience}
												onChange={handleChange}
												rows={4}
												placeholder="Describe any relevant work experience, internships, or professional activities..."
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Extracurricular Activities (Optional)</label>
											<textarea
												name="extracurricularActivities"
												value={form.extracurricularActivities}
												onChange={handleChange}
												rows={4}
												placeholder="Sports, clubs, volunteer work, hobbies, leadership roles, achievements..."
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
											/>
										</div>
									</div>
								</div>

								{/* Support Services */}
								<div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
									<h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
										🤝 Support Services
									</h3>
									<div className="space-y-4">
										<div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
											<input
												type="checkbox"
												id="scholarshipNeeded"
												name="scholarshipNeeded"
												checked={form.scholarshipNeeded}
												onChange={handleChange}
												className="mt-1 h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
											/>
											<div>
												<label htmlFor="scholarshipNeeded" className="block text-sm font-medium text-gray-900">
													💰 I am interested in scholarship opportunities
												</label>
												<p className="text-xs text-gray-600 mt-1">
													We&apos;ll provide information about available financial aid and scholarship programs
												</p>
											</div>
										</div>
										<div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
											<input
												type="checkbox"
												id="accommodation"
												name="accommodation"
												checked={form.accommodation}
												onChange={handleChange}
												className="mt-1 h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
											/>
											<div>
												<label htmlFor="accommodation" className="block text-sm font-medium text-gray-900">
													🏠 I need accommodation assistance
												</label>
												<p className="text-xs text-gray-600 mt-1">
													Help with finding housing options near campus
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
						{/* Step 4: Review & Submit */}
						{currentStep === 4 && (
							<div className="space-y-6">
								<div className="text-center mb-8">
									<h2 className="text-2xl font-bold text-gray-900">Review Your Application</h2>
									<p className="text-gray-600 mt-2">Please review all information before submitting</p>
								</div>
								<div className="bg-gray-50 rounded-lg p-6 space-y-4">
									<div>
										<h3 className="font-semibold text-gray-900">Program Information</h3>
										<p className="text-gray-600">
											Program: {PROGRAMS.find(p => p.id === form.program)?.name}
										</p>
										<p className="text-gray-600">
											Selected Courses: {form.courses.join(', ')}
										</p>
										<p className="text-gray-600">Study Mode: {STUDY_MODES.find(m => m.value === form.studyMode)?.label}</p>
									</div>
									<div>
										<h3 className="font-semibold text-gray-900">Academic Information</h3>
										<p className="text-gray-600">Expected Grade: {form.expectedGrade}</p>
										{form.currentGPA && <p className="text-gray-600">Current GPA: {form.currentGPA}</p>}
									</div>
									<div>
										<h3 className="font-semibold text-gray-900">Contact Information</h3>
										<p className="text-gray-600">Phone: {form.phoneNumber}</p>
										{form.startDate && <p className="text-gray-600">Expected Start Date: {form.startDate}</p>}
									</div>
									<div>
										<h3 className="font-semibold text-gray-900">Additional Information</h3>
										<p className="text-gray-600">Scholarship Interest: {form.scholarshipNeeded ? 'Yes' : 'No'}</p>
										<p className="text-gray-600">Accommodation Needed: {form.accommodation ? 'Yes' : 'No'}</p>
									</div>
								</div>
							</div>
						)}
						{/* Navigation Buttons */}
						<div className="flex justify-between pt-8">
							<button
								type="button"
								onClick={prevStep}
								disabled={currentStep === 1}
								className={`px-6 py-2 rounded-md ${currentStep === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-600 text-white hover:bg-gray-700'}`}
							>
								Previous
							</button>
							<div className="flex space-x-4">
								{currentStep < 4 ? (
									<button
										type="button"
										onClick={nextStep}
										disabled={!isStepValid(currentStep)}
										className={`px-6 py-2 rounded-md ${!isStepValid(currentStep) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
									>
										Next Step
									</button>
								) : (
									<button
										type="submit"
										disabled={loading}
										className="px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
									>
										{loading ? 'Submitting...' : 'Submit Application'}
									</button>
								)}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
