import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/config/supabase';
import Container from '@/components/ui/Container';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/auth/login?error=auth_callback_failed');
          return;
        }

        if (data.session) {
          // User is authenticated, redirect to intended page or home
          const redirectTo = sessionStorage.getItem('auth_redirect') || '/';
          sessionStorage.removeItem('auth_redirect');
          navigate(redirectTo);
        } else {
          navigate('/auth/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/auth/login?error=auth_callback_failed');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <Container>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Completing Sign In...</h1>
          <p className="text-gray-600">Please wait while we redirect you.</p>
        </div>
      </Container>
    </div>
  );
};

export default AuthCallback;