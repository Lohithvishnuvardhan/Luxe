import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { CreditCard, Truck, Shield } from 'lucide-react';

const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Processing payment:', formData);
    clearCart();
    alert("Payment successful! Order confirmed.");
  };

  return (
    <div className="py-20 bg-gray-100 min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-10">Secure Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Information</h2>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Shipping Information */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:outline-none"
                      required
                    />
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment Method</h2>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:outline-none"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Expiry (MM/YY)"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full mt-4">
                  Complete Purchase
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>
                <div className="space-y-4 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-700">{item.name}</h3>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" /> Secure checkout
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-500" /> Free shipping on orders over $100
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-purple-500" /> All major credit cards accepted
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Checkout;
