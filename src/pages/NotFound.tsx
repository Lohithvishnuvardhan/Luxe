import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

const NotFound: React.FC = () => {
  return (
    <Container className="py-24">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Page not found</h2>
        <p className="mt-4 text-base text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        <div className="mt-10">
          <Button 
            as={Link} 
            to="/"
            variant="primary"
            size="lg"
          >
            Go back home
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;