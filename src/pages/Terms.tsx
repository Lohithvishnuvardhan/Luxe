import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

const Terms: React.FC = () => {
  return (
    <div className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-serif font-bold text-center mb-12">Terms & Conditions</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">1. Introduction</h2>
              <p className="text-gray-600">
                These Terms and Conditions govern your use of LuxeCommerce and the services we provide. By accessing or using our website, you agree to be bound by these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">2. Definitions</h2>
              <div className="bg-white rounded-lg shadow-subtle p-6">
                <ul className="space-y-4 text-gray-600">
                  <li>
                    <strong>"Service"</strong> refers to the website operated by LuxeCommerce
                  </li>
                  <li>
                    <strong>"You"</strong> means the individual accessing or using the Service
                  </li>
                  <li>
                    <strong>"Products"</strong> refers to the items available for purchase through the Service
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">3. Account Registration</h2>
              <p className="text-gray-600 mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">4. Purchases</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  All purchases through our Service are subject to product availability. We reserve the right to modify or discontinue any product without notice.
                </p>
                <p>
                  Prices for all products are subject to change. We reserve the right to modify or discontinue the Service without notice at any time.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">5. Prohibited Uses</h2>
              <div className="bg-white rounded-lg shadow-subtle p-6">
                <p className="text-gray-600 mb-4">You agree not to use the Service:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>In any way that violates any applicable laws</li>
                  <li>To transmit harmful or malicious code</li>
                  <li>To impersonate or attempt to impersonate the Company</li>
                  <li>To engage in any fraudulent activity</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">6. Intellectual Property</h2>
              <p className="text-gray-600">
                The Service and its original content, features, and functionality are and will remain the exclusive property of LuxeCommerce. The Service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600">
                In no event shall LuxeCommerce be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-medium mb-4">8. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">9. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:legal@luxecommerce.com" className="text-primary-600 hover:text-primary-700">
                  legal@luxecommerce.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Terms;