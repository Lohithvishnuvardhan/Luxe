import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Container from '@/components/ui/Container';
import { Users, Package, ShoppingBag } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import Button from '@/components/ui/Button';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
}

const Admin: React.FC = () => {
  const { user, isAdmin, makeAdmin, removeAdmin } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const adminsCollection = collection(db, 'admins');
        
        const [usersSnapshot, adminsSnapshot] = await Promise.all([
          getDocs(usersCollection),
          getDocs(adminsCollection)
        ]);

        const adminIds = new Set(adminsSnapshot.docs.map(doc => doc.id));
        
        const userData = usersSnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data(),
          isAdmin: adminIds.has(doc.id)
        })) as UserData[];

        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (!user || !isAdmin) {
    return <Navigate to="/auth/login" />;
  }

  const handleToggleAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await removeAdmin(userId);
      } else {
        await makeAdmin(userId);
      }
      
      // Update local state
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.uid === userId ? { ...u, isAdmin: !currentStatus } : u
        )
      );
    } catch (error) {
      console.error('Error toggling admin status:', error);
    }
  };

  const stats = [
    { title: 'Total Users', value: users.length.toString(), icon: Users, color: 'bg-blue-500' },
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

        {/* Stats Grid */}
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

        {/* User Management Section */}
        <div className="bg-white rounded-lg shadow-subtle p-6">
          <h2 className="text-xl font-bold mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-right py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((userData) => (
                  <tr key={userData.uid} className="border-b">
                    <td className="py-2">{userData.displayName}</td>
                    <td className="py-2">{userData.email}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        userData.isAdmin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {userData.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="py-2 text-right">
                      <Button
                        variant={userData.isAdmin ? "outline" : "primary"}
                        size="sm"
                        onClick={() => handleToggleAdmin(userData.uid, userData.isAdmin)}
                        disabled={userData.uid === user.uid}
                      >
                        {userData.isAdmin ? 'Remove Admin' : 'Make Admin'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Admin;