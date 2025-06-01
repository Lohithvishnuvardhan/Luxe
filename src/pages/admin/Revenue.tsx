import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { DollarSign, Calendar, CreditCard, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Revenue: React.FC = () => {
  // Mock data for the revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1900 },
    { month: 'Mar', revenue: 1600 },
    { month: 'Apr', revenue: 2100 },
    { month: 'May', revenue: 1800 },
    { month: 'Jun', revenue: 2300 },
    { month: 'Jul', revenue: 2500 },
    { month: 'Aug', revenue: 2800 },
    { month: 'Sep', revenue: 3000 },
    { month: 'Oct', revenue: 2700 },
    { month: 'Nov', revenue: 3200 },
    { month: 'Dec', revenue: 3500 }
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$1899.95',
      change: '+25%',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$1899.95',
      change: '+18%',
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Average Order Value',
      value: '$271.42',
      change: '+12%',
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Total Orders',
      value: '7',
      change: '+15%',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const topProducts = [
    { name: 'Silk Evening Dress', sales: 1, revenue: 799.99 },
    { name: 'Premium Wireless Headphones', sales: 2, revenue: 499.98 },
    { name: 'Cashmere Sweater', sales: 1, revenue: 249.99 },
    { name: 'Italian Silk Dress Shirt', sales: 2, revenue: 259.98 },
    { name: 'Leather Travel Bag', sales: 1, revenue: 299.99 }
  ];

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
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-subtle">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-green-600 text-sm font-medium">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-gray-600">{stat.title}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-subtle p-6">
              <h2 className="text-xl font-bold mb-6">Revenue Trends</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#6b7280"
                      tick={{ fill: '#6b7280' }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      tick={{ fill: '#6b7280' }}
                      tickFormatter={(value: any) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                      }}
                      formatter={(value: any) => [`$${value}`, 'Revenue']}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#D4AF37"
                      strokeWidth={2}
                      dot={{ fill: '#D4AF37', strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-subtle p-6">
              <h2 className="text-xl font-bold mb-6">Top Products</h2>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                    <span className="font-medium">${product.revenue.toFixed(2)}</span>
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

export default Revenue;
