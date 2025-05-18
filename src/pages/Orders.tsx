
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { Package, Clock } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    currency: string;
    imageUrl: string;
  }>;
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="py-24">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">No Orders Yet</h1>
            <p className="text-gray-600">You haven't placed any orders yet.</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-serif font-bold mb-8">My Orders</h1>
          
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-subtle p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-medium">Order #{order.id}</h2>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Clock size={16} className="mr-1" />
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Package size={16} className="mr-1" />
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Orders;
