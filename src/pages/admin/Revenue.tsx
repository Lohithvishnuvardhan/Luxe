import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { DollarSign, TrendingUp, Calendar, CreditCard } from 'lucide-react';

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
  status: string;
}

interface RevenueStats {
  totalRevenue: number;
  monthlyRevenue: number;
  averageOrderValue: number;
  totalOrders: number;
  topProducts: { [key: string]: { count: number; revenue: number } };
}

const AdminRevenue: React.FC = () => {
  const [stats, setStats] = useState<RevenueStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    averageOrderValue: 0,
    totalOrders: 0,
    topProducts: {}
  });

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      const orders: Order[] = JSON.parse(savedOrders);
      
      // Calculate total revenue
      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
      
      // Calculate monthly revenue
      const now = new Date();
      const monthlyOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.getMonth() === now.getMonth() &&
               orderDate.getFullYear() === now.getFullYear();
      });
      const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.total, 0);
      
      // Calculate average order value
      const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
      
      // Calculate top products
      const topProducts: { [key: string]: { count: number; revenue: number } } = {};
      orders.forEach(order => {
        order.items.forEach(item => {
          if (!topProducts[item.name]) {
            topProducts[item.name] = { count: 0, revenue: 0 };
          }
          topProducts[item.name].count += item.quantity;
          topProducts[item.name].revenue += item.price * item.quantity;
        });
      });

      setStats({
        totalRevenue,
        monthlyRevenue,
        averageOrderValue,
        totalOrders: orders.length,
        topProducts
      });
    }
  }, []);

  return (
    <div className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-serif font-bold mb-8">Revenue Analytics</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-green-600">+25%</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">${stats.totalRevenue.toFixed(2)}</h3>
              <p className="text-gray-600">Total Revenue</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-accent-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-accent-600" />
                </div>
                <span className="text-sm font-medium text-green-600">+18%</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">${stats.monthlyRevenue.toFixed(2)}</h3>
              <p className="text-gray-600">Monthly Revenue</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-secondary-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-secondary-600" />
                </div>
                <span className="text-sm font-medium text-green-600">+12%</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">
                ${stats.averageOrderValue.toFixed(2)}
              </h3>
              <p className="text-gray-600">Average Order Value</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-success-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-success-600" />
                </div>
                <span className="text-sm font-medium text-green-600">+15%</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stats.totalOrders}</h3>
              <p className="text-gray-600">Total Orders</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-subtle p-6">
              <h2 className="text-xl font-bold mb-6">Revenue Trends</h2>
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">Revenue chart will be implemented here</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-subtle p-6">
              <h2 className="text-xl font-bold mb-6">Top Products</h2>
              <div className="space-y-4">
                {Object.entries(stats.topProducts)
                  .sort((a, b) => b[1].revenue - a[1].revenue)
                  .slice(0, 5)
                  .map(([productName, data]) => (
                    <div key={productName} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">{productName}</h3>
                        <p className="text-sm text-gray-600">{data.count} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${data.revenue.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default AdminRevenue;