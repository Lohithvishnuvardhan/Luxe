import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { Truck, Package, RefreshCw, Clock } from 'lucide-react';

const ShippingReturns: React.FC = () => {
  return (
    <div className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-serif font-bold text-center mb-12">Shipping & Returns</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-subtle p-6">
              <div className="flex items-center mb-4">
                <Truck className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-medium">Shipping Information</h2>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li>• Free shipping on orders over $100</li>
                <li>• Standard shipping (3-5 business days)</li>
                <li>• Express shipping (1-2 business days)</li>
                <li>• International shipping available</li>
                <li>• Tracking information provided</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-subtle p-6">
              <div className="flex items-center mb-4">
                <RefreshCw className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-medium">Returns Policy</h2>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li>• 30-day return window</li>
                <li>• Free returns on all orders</li>
                <li>• Items must be unused with tags</li>
                <li>• Original packaging required</li>
                <li>• Full refund guaranteed</li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-serif font-bold mb-4">Shipping Details</h2>
              <div className="bg-white rounded-lg shadow-subtle p-6">
                <h3 className="text-lg font-medium mb-3">Processing Time</h3>
                <p className="text-gray-600 mb-4">
                  Orders are typically processed within 1-2 business days. During peak seasons or sales events, processing may take up to 3 business days.
                </p>

                <h3 className="text-lg font-medium mb-3">Shipping Methods</h3>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong>Standard Shipping:</strong> 3-5 business days ($5.99)
                  </p>
                  <p>
                    <strong>Express Shipping:</strong> 1-2 business days ($12.99)
                  </p>
                  <p>
                    <strong>International Shipping:</strong> 7-14 business days (varies by location)
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-4">Returns Process</h2>
              <div className="bg-white rounded-lg shadow-subtle p-6">
                <ol className="space-y-6">
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mr-4">1</span>
                    <div>
                      <h4 className="font-medium mb-1">Initiate Return</h4>
                      <p className="text-gray-600">Log into your account and select the items you wish to return. Print the provided return label.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mr-4">2</span>
                    <div>
                      <h4 className="font-medium mb-1">Package Items</h4>
                      <p className="text-gray-600">Pack the items securely in their original packaging with all tags attached.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mr-4">3</span>
                    <div>
                      <h4 className="font-medium mb-1">Ship Return</h4>
                      <p className="text-gray-600">Drop off the package at any authorized shipping location using our prepaid return label.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mr-4">4</span>
                    <div>
                      <h4 className="font-medium mb-1">Refund Processing</h4>
                      <p className="text-gray-600">Once we receive and inspect the return, your refund will be processed within 3-5 business days.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>
          </div>

          <div className="mt-12 bg-primary-50 rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium mb-2">Need Help?</h3>
            <p className="text-gray-600">
              Our customer service team is available to assist you with any questions about shipping or returns.{' '}
              <a href="/contact" className="text-primary-600 hover:text-primary-700">Contact us</a>.
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default ShippingReturns;