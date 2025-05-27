import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { Package, Clock, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  currency: string;
  imageUrl: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Get orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      setOrders(parsedOrders);
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  if (orders.length === 0) {
    return (
      <div className="py-24">
        <Container>
          <div className="text-center">
            <div className="mb-6">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto" />
            </div>
            <h1 className="text-3xl font-serif font-bold mb-4">No Orders Yet</h1>
            <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
            <Link 
              to="/products" 
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
            >
              Start Shopping
            </Link>
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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-serif font-bold">My Orders</h1>
            <span className="text-gray-600">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-subtle overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-wrap gap-4 justify-between items-start">
                    <div>
                      <h2 className="text-lg font-medium mb-1">Order #{order.id}</h2>
                      <div className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-1" />
                        {formatDate(order.date)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-primary-600" />
                      <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <Link to={`/products/${item.id}`} className="shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/products/${item.id}`}
                            className="text-lg font-medium hover:text-primary-600 transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {item.currency}{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.currency}{item.price} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-xl font-bold">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
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