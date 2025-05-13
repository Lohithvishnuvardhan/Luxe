import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-serif font-bold text-center mb-12">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4">
                At LuxeCommerce, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">Information We Collect</h2>
              <div className="bg-white rounded-lg shadow-subtle p-6 mb-4">
                <h3 className="text-xl font-medium mb-3">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Name and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-subtle p-6">
                <h3 className="text-xl font-medium mb-3">Automatically Collected Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Usage data</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">How We Use Your Information</h2>
              <div className="text-gray-600 space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Process your orders and payments</li>
                  <li>Communicate with you about your orders</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Detect and prevent fraud</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy.
              </p>
              <p className="text-gray-600">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Payment processors for secure transactions</li>
                <li>Shipping partners to deliver your orders</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">Your Rights</h2>
              <div className="bg-white rounded-lg shadow-subtle p-6">
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to certain processing of your data</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">Security</h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@luxecommerce.com" className="text-primary-600 hover:text-primary-700">
                  privacy@luxecommerce.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;