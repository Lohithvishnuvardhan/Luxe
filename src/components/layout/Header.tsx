import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, LogOut } from 'lucide-react';
import Container from '../ui/Container';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-serif font-bold text-primary-600"
          >
            LuxeCommerce
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-800 hover:text-accent-500 transition-colors">
              Home
            </Link>
            <Link to="/products" className="font-medium text-gray-800 hover:text-accent-500 transition-colors">
              Shop
            </Link>
            <Link to="/about" className="font-medium text-gray-800 hover:text-accent-500 transition-colors">
              About
            </Link>
            <Link to="/contact" className="font-medium text-gray-800 hover:text-accent-500 transition-colors">
              Contact
            </Link>
            {isAdmin && (
              <Link to="/admin" className="font-medium text-gray-800 hover:text-accent-500 transition-colors">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="h-12 w-12 flex items-center justify-center rounded-full bg-primary-600 text-white hover:bg-accent-500 transition-all duration-300 transform hover:scale-105">
              <Search size={20} />
            </button>
            {user ? (
              <>
                <Link 
                  to="/profile"
                  className="h-12 w-12 flex items-center justify-center rounded-full bg-primary-600 text-white hover:bg-accent-500 transition-all duration-300 transform hover:scale-105"
                >
                  <User size={20} />
                </Link>
                <Link 
                  to="/cart" 
                  className="h-12 w-12 flex items-center justify-center rounded-full bg-primary-600 text-white hover:bg-accent-500 transition-all duration-300 transform hover:scale-105 relative"
                >
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="h-12 w-12 flex items-center justify-center rounded-full bg-primary-600 text-white hover:bg-accent-500 transition-all duration-300 transform hover:scale-105"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Button
                as={Link}
                to="/auth/login"
                variant="primary"
                className="bg-accent-500 hover:bg-accent-600"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            {user && (
              <Link 
                to="/cart" 
                className="h-12 w-12 flex items-center justify-center rounded-full bg-primary-600 text-white hover:bg-accent-500 transition-all duration-300 relative"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-12 w-12 flex items-center justify-center rounded-full bg-primary-600 text-white hover:bg-accent-500 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
          <nav className="py-4 px-4 space-y-4">
            <Link 
              to="/" 
              className="block font-medium text-gray-800 hover:text-accent-500 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block font-medium text-gray-800 hover:text-accent-500 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className="block font-medium text-gray-800 hover:text-accent-500 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block font-medium text-gray-800 hover:text-accent-500 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="block font-medium text-gray-800 hover:text-accent-500 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block font-medium text-gray-800 hover:text-accent-500 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left font-medium text-gray-800 hover:text-accent-500 py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="block font-medium text-gray-800 hover:text-accent-500 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;