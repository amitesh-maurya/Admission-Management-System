"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, Button, Spinner, Alert } from "@/components/UI";

export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setVerificationStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setVerificationStatus('success');
          setMessage(data.message || 'Email verified successfully!');
        } else {
          setVerificationStatus('error');
          setMessage(data.error || 'Verification failed');
        }
      } catch (error) {
        setVerificationStatus('error');
        setMessage('Network error. Please try again.');
        console.error('Email verification error:', error);
      }
    };

    verifyEmail();
  }, [token]);

  const handleResendVerification = async () => {
    // Implementation would require storing email or user context
    setMessage('Please contact support for a new verification link.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <Card variant="glass" className="p-8 text-center max-w-md w-full">
        <div className="mb-6">
          {verificationStatus === 'loading' && (
            <>
              <Spinner size="lg" className="mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verifying Email
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </>
          )}
          
          {verificationStatus === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Email Verified!
              </h2>
            </>
          )}
          
          {verificationStatus === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Verification Failed
              </h2>
            </>
          )}
        </div>

        {message && (
          <Alert 
            variant={verificationStatus === 'success' ? 'success' : 'danger'} 
            className="mb-6"
          >
            {message}
          </Alert>
        )}

        <div className="space-y-4">
          {verificationStatus === 'success' && (
            <Button 
              onClick={() => window.location.href = '/login'}
              variant="primary"
              className="w-full"
            >
              Go to Login
            </Button>
          )}
          
          {verificationStatus === 'error' && (
            <Button 
              onClick={handleResendVerification}
              variant="secondary"
              className="w-full"
            >
              Request New Link
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}