import React from 'react';
import { ArrowRight, ShieldCheck, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Container from '../ui/Container';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white py-24 lg:py-32 overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-accent-500/20 text-accent-400 px-3 py-1 rounded-full text-sm font-medium">
                Premium Quality
              </span>
              <span className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                Trusted by 10k+ Customers
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Transform Your Business with Premium Solutions
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              Experience unparalleled quality and innovation with our curated collection of premium business solutions and products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                variant="primary" 
                className="bg-accent-500 hover:bg-accent-600 text-gray-900 font-medium"
                rightIcon={<ArrowRight size={20} />}
                as={Link}
                to="/products"
              >
                Explore Products
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                as={Link}
                to="/contact"
              >
                Schedule Consultation
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <ShieldCheck className="w-8 h-8 text-accent-400 mx-auto mb-2" />
                <h3 className="text-xl font-bold mb-1">100%</h3>
                <p className="text-sm text-gray-400">Secure Transactions</p>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-accent-400 mx-auto mb-2" />
                <h3 className="text-xl font-bold mb-1">Premium</h3>
                <p className="text-sm text-gray-400">Quality Products</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-accent-400 mx-auto mb-2" />
                <h3 className="text-xl font-bold mb-1">24/7</h3>
                <p className="text-sm text-gray-400">Customer Support</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Business professionals collaborating" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white text-gray-900 rounded-lg p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="bg-accent-500 rounded-full p-3">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Trusted by</p>
                  <p className="text-xl font-bold">10,000+ Businesses</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent"></div>
    </section>
  );
};

export default Hero;