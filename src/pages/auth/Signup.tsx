
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate('/profile');
    } catch (error) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="py-24">
      <Container>
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
          {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600">
              Login
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
