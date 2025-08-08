import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User, Eye, EyeOff, Github } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { signup, signupWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !name) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await signup(email, password, name);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'github' | 'facebook' | 'apple') => {
    try {
      setError('');
      setSocialLoading(provider);
      await signupWithProvider(provider);
      // Navigation will be handled by the auth callback
    } catch (error: any) {
      setError('Failed to sign up with ' + provider + ': ' + error.message);
    } finally {
      setSocialLoading(null);
    }
  };
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
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
              <p className="text-gray-600 mt-2">
                Join our premium shopping experience
              </p>
            </div>

            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
                {error}
              </div>
            )}

            {success ? (
              <div className="text-center">
                <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6">
                  <h3 className="font-medium mb-2">Account created successfully!</h3>
                  <p className="text-sm">Please check your email to verify your account before signing in.</p>
                </div>
                <Link
                  to="/auth/login"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              <>
                {/* Social Signup Buttons */}
                <div className="space-y-3 mb-6">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-3 py-3 border-gray-300 hover:bg-gray-50"
                    onClick={() => handleSocialSignup('google')}
                    isLoading={socialLoading === 'google'}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-3 py-3 border-gray-300 hover:bg-gray-50"
                    onClick={() => handleSocialSignup('github')}
                    isLoading={socialLoading === 'github'}
                  >
                    <Github className="w-5 h-5" />
                    Continue with GitHub
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-3 py-3 border-gray-300 hover:bg-gray-50"
                    onClick={() => handleSocialSignup('facebook')}
                    isLoading={socialLoading === 'facebook'}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Continue with Facebook
                  </Button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-12 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full"
                    isLoading={loading}
                  >
                    Sign Up
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                  <span className="text-gray-600">Already have an account?</span>{' '}
                  <Link to="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default SignUp;