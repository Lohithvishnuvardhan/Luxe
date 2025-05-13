import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

const About: React.FC = () => {
  return (
    <div className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-serif font-bold mb-6">About LuxeCommerce</h1>
          <p className="text-gray-600 mb-12">
            Discover the story behind our commitment to bringing you the finest luxury products and exceptional shopping experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Our team"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-serif font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, LuxeCommerce has grown from a small startup to a leading destination for premium products. Our journey began with a simple mission: to provide discerning customers with access to the finest quality products while delivering an unparalleled shopping experience.
            </p>
            <p className="text-gray-600">
              Today, we continue to curate an exclusive collection of luxury items, working directly with artisans and premium brands to ensure every product meets our exacting standards of quality and craftsmanship.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary-600 mb-2">150+</div>
            <div className="text-gray-600">Premium Products</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
            <div className="text-gray-600">Countries Served</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-primary-50 rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-serif font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-2">Quality</h3>
              <p className="text-gray-600">We never compromise on the quality of our products.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Transparency</h3>
              <p className="text-gray-600">Clear communication and honest business practices.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Customer First</h3>
              <p className="text-gray-600">Your satisfaction is our top priority.</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default About;