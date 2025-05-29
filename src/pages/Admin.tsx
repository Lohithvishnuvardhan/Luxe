import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Container from '@/components/ui/Container';
import { Users, Package, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit, where, Timestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  userGrowth: number;
  productGrowth: number;
  orderGrowth: number;
  revenueGrowth: number;
}

interface RecentOrder {
  id: string;
  date: string;
  total: number;
  items: any[];
  status: string;
}

interface NewUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  avatar?: string;
}

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    userGrowth: 0,
    productGrowth: 0,
    orderGrowth: 0,
    revenueGrowth: 0
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [newUsers, setNewUsers] = useState<NewUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

        // Users
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const totalUsers = usersSnapshot.size;

        const newUsersQuery = query(
          usersRef,
          where('createdAt', '>=', Timestamp.fromDate(thirtyDaysAgo)),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const newUsersSnapshot = await getDocs(newUsersQuery);
        const newUsersData = newUsersSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Unknown',
            email: data.email || 'unknown@example.com',
            avatar: data.avatar || undefined,
            joinDate: data.createdAt?.toDate().toISOString() || ''
          };
        });

        // Products
        const productsRef = collection(db, 'products');
        const productsSnapshot = await getDocs(productsRef);
        const totalProducts = productsSnapshot.size;

        // Orders
        const ordersRef = collection(db, 'orders');
        const ordersSnapshot = await getDocs(ordersRef);
        const orders = ordersSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            total: data.total || 0
          };
        });

        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

        const recentOrdersQuery = query(
          ordersRef,
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const recentOrdersSnapshot = await getDocs(recentOrdersQuery);
        const recentOrdersData = recentOrdersSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            date: data.createdAt?.toDate().toISOString() || '',
            total: data.total || 0,
            items: data.items || [],
            status: data.status || 'Pending'
          };
        });

        const userGrowth = ((newUsersSnapshot.size / totalUsers) * 100).toFixed(1);
        const productGrowth = 5;
        const orderGrowth = 18;
        const revenueGrowth = 25;

        setStats({
          totalUsers,
          totalProducts,
          totalOrders: orders.length,
          totalRevenue,
          userGrowth: parseFloat(userGrowth),
          productGrowth,
          orderGrowth,
          revenueGrowth
        });

        setRecentOrders(recentOrdersData);
        setNewUsers(newUsersData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && isAdmin) {
      fetchDashboardData();
    }
  }, [user, isAdmin]);

  if (!user || !isAdmin) {
    return <Navigate to="/auth/login" />;
  }

  if (loading) {
    return (
      <div className="py-24">
        <Container>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </Container>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: `${stats.userGrowth > 0 ? '+' : ''}${stats.userGrowth}%`,
      icon: Users,
      color: 'bg-blue-500',
      link: '/admin/users'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      change: `${stats.productGrowth > 0 ? '+' : ''}${stats.productGrowth}%`,
      icon: Package,
      color: 'bg-green-500',
      link: '/admin/products'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: `${stats.orderGrowth > 0 ? '+' : ''}${stats.orderGrowth}%`,
      icon: ShoppingBag,
      color: 'bg-purple-500',
      link: '/admin/orders'
    },
    {
      title: 'Revenue',
      value: `$${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: `${stats.revenueGrowth > 0 ? '+' : ''}${stats.revenueGrowth}%`,
      icon: DollarSign,
      color: 'bg-accent-500',
      link: '/admin/revenue'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="py-24">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.displayName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            return (
              <Link
                key={index}
                to={stat.link}
                className="bg-white rounded-lg p-6 shadow-subtle hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${stat.color} rounded-lg text-white`}>
                    <Icon size={24} />
                  </div>
                  <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                    {isPositive ? (
                      <ArrowUpRight size={16} className="ml-1" />
                    ) : (
                      <ArrowDownRight size={16} className="ml-1" />
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-subtle p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <Link to="/admin/orders" className="text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <ShoppingBag size={20} className="text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{order.items.length} items</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center py-4">No recent orders</p>
              )}
            </div>
          </div>

          {/* New Users */}
          <div className="bg-white rounded-lg shadow-subtle p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">New Users</h2>
              <Link to="/admin/users" className="text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {newUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-primary-600 font-medium">
                          {user.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={14} className="mr-1" />
                    {formatDate(user.joinDate)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Admin;
