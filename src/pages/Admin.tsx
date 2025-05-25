import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Container from '@/components/ui/Container';
import { Users, Package, ShoppingBag } from 'lucide-react';

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    return <Navigate to="/auth/login" />;
  }

  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { title: 'Total Products', value: '456', icon: Package, color: 'bg-green-500' },
    { title: 'Total Orders', value: '789', icon: ShoppingBag, color: 'bg-purple-500' },
  ];

  return (
    <div className="py-24">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.displayName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-subtle p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full text-white`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-subtle p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <button className="text-primary-600 hover:text-primary-700">View All</button>
            </div>
            <div className="space-y-4">
              {/* Add order list items here */}
              <p className="text-gray-600">No recent orders</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-subtle p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Latest Products</h2>
              <button className="text-primary-600 hover:text-primary-700">View All</button>
            </div>
            <div className="space-y-4">
              {/* Add product list items here */}
              <p className="text-gray-600">No products added recently</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Admin;