import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Truck } from 'lucide-react';
import Button from '@/components/ui/Button';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity\" onClick={onClose}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="inline-block w-full max-w-4xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:my-8"
            >
              <div className="px-6 py-4 bg-primary-600 text-white flex items-center justify-between">
                <h3 className="text-2xl font-bold">Order Details</h3>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="text-primary-600" size={20} />
                      <h4 className="font-medium">Order Information</h4>
                    </div>
                    <div className="space-y-2">
                      <p><span className="font-medium">Order ID:</span> {order.id}</p>
                      <p><span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </p>
                      <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleString()}</p>
                      <p><span className="font-medium">Total:</span> ${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Truck className="text-primary-600" size={20} />
                      <h4 className="font-medium">Shipping Details</h4>
                    </div>
                    <div className="space-y-2">
                      <p><span className="font-medium">Customer:</span> {order.customerName}</p>
                      <p><span className="font-medium">Email:</span> {order.customerEmail}</p>
                      <p><span className="font-medium">Address:</span> {order.shippingAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h4 className="font-medium">Order Items</h4>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="p-4 flex items-center gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      className="border-primary-600 text-primary-600"
                      onClick={() => {/* Handle print */}}
                    >
                      Print Order
                    </Button>
                    <Button
                      variant="outline"
                      className="border-primary-600 text-primary-600"
                      onClick={() => {/* Handle export */}}
                    >
                      Export PDF
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Order Total</p>
                    <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderDetailsModal;