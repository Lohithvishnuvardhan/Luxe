
import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { Building2, Award, Users, TrendingUp } from 'lucide-react';

const BusinessDetails: React.FC = () => {
  return (
    <div className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-serif font-bold mb-8">Business Details</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-subtle p-6">
              <div className="flex items-center mb-4">
                <Building2 className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-medium">Company Overview</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Business Name</h3>
                  <p className="text-gray-600">LuxeCommerce Enterprise</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Industry</h3>
                  <p className="text-gray-600">E-commerce & Retail</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Established</h3>
                  <p className="text-gray-600">2020</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-subtle p-6">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-medium">Premium Status</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Membership Level</h3>
                  <p className="text-gray-600">Enterprise Premium</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Member Since</h3>
                  <p className="text-gray-600">January 2024</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Benefits</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Priority Support</li>
                    <li>Advanced Analytics</li>
                    <li>Custom Solutions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-subtle p-6">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-medium">Team</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Size</h3>
                  <p className="text-gray-600">50-100 employees</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Departments</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Sales & Marketing</li>
                    <li>Customer Support</li>
                    <li>Product Development</li>
                    <li>Operations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-subtle p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-medium">Growth Metrics</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Annual Revenue</h3>
                  <p className="text-gray-600">$5M - $10M</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Growth Rate</h3>
                  <p className="text-gray-600">25% YoY</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Market Presence</h3>
                  <p className="text-gray-600">Global</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default BusinessDetails;
