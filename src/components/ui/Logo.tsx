import React from 'react';
import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <Crown className="w-8 h-8 text-accent-500" />
      <span className="text-2xl font-serif font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
        LuxeCommerce
      </span>
    </Link>
  );
};

export default Logo;