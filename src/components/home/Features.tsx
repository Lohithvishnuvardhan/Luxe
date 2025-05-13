import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { Shield, BarChart, Users, Clock, Award, Headphones } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Enterprise Security',
      description: 'Advanced security measures to protect your business data',
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: 'Analytics & Insights',
      description: 'Detailed reports and analytics for informed decisions',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Collaboration',
      description: 'Seamless tools for team productivity and coordination',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fast Implementation',
      description: 'Quick setup and integration with existing systems',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Quality Assurance',
      description: 'Rigorous testing and quality control standards',
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: 'Premium Support',
      description: '24/7 dedicated customer support and assistance',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Enterprise Solutions
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Comprehensive business solutions designed to enhance your operations and drive growth
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-subtle hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;