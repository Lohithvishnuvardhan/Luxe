import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { Users, Package, ShoppingBag, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      link: '/admin/users'
    },
    {
      title: 'Total Products',
      value: '156',
      change: '+5%',
      icon: Package,
      link: '/admin/products'
    },
    {
      title: 'Total Orders',
      value: '892',
      change: '+18%',
      icon: ShoppingBag,
      link: '/admin/orders'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+25%',
      icon: DollarSign,
      link: '/admin/revenue'
    }
  ];

  return (
    <div className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-serif font-bold mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Link
                  key={index}
                  to={stat.link}
                  className="bg-white rounded-lg p-6 shadow-subtle hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-gray-600">{stat.title}</p>
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-subtle p-6">
              <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
              {/* Add recent orders table/list here */}
            </div>

            <div className="bg-white rounded-lg shadow-subtle p-6">
              <h2 className="text-xl font-bold mb-6">New Users</h2>
              {/* Add new users list here */}
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Dashboard;