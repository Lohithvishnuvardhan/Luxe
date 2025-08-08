import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const VerifyEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { user, resendVerification, isEmailVerified } = useAuth();

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      setError('');
      await resendVerification();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification email');
    } finally {
      setLoading(false);
    }
  };

  if (isEmailVerified) {
    return (
      <div className="min-h-screen bg-gray-50 py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
              <p className="text-gray-600 mb-6">
                Your email has been successfully verified. You can now access all features.
              </p>
              <Link
                to="/products"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
              <p className="text-gray-600 mt-2">
                We've sent a verification link to <strong>{user?.email}</strong>
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4 flex items-center gap-2">
                <CheckCircle size={20} />
                Verification email sent successfully!
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Please check your email and click the verification link to activate your account.
              </p>

              <Button
                variant="primary"
                className="w-full"
                onClick={handleResendVerification}
                isLoading={loading}
              >
                Resend Verification Email
              </Button>

              <div className="text-center text-sm">
                <Link to="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default VerifyEmail;