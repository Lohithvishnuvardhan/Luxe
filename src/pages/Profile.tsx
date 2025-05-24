import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  Heart, 
  LogOut,
  Edit3,
  Camera,
  Shield,
  Clock,
  CreditCard
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/config/firebase';
import { updateProfile } from 'firebase/auth';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  memberSince: string;
  membershipLevel: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    memberSince: new Date().toISOString(),
    membershipLevel: 'Premium'
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setFormData(prev => ({
              ...prev,
              ...userDoc.data() as UserProfile
            }));
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setError('Failed to load profile data');
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!user?.uid) throw new Error('No user found');

      // Update Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        ...formData,
        updatedAt: new Date().toISOString()
      });

      // Update Firebase Auth profile
      await updateProfile(auth.currentUser!, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });

      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package, path: '/orders' },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/wishlist' },

  ];

  return (
    <div className="py-24 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-subtle p-6">
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={user?.photoURL || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32"}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover ring-4 ring-primary-50"
                  />
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <Camera size={16} className="text-gray-600" />
                  </button>
                </div>
                <h2 className="text-xl font-bold">{`${formData.firstName} ${formData.lastName}`}</h2>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Shield size={14} className="text-accent-500" />
                  <span>{formData.membershipLevel} Member</span>
                </div>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.path) {
                          navigate(item.path);
                        } else {
                          setActiveTab(item.id);
                        }
                      }}
                      className={`w-full flex items-center px-4 py-2.5 rounded-lg text-left transition-all duration-300 ${
                        activeTab === item.id
                          ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={18} className="mr-3" />
                      {item.label}
                    </button>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2.5 rounded-lg text-left text-gray-600 hover:bg-gray-50 transition-all duration-300"
                >
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </button>
              </nav>
            </div>

            {/* Membership Status */}
            <div className="mt-6 bg-white rounded-xl shadow-subtle p-6">
              <h3 className="text-lg font-semibold mb-4">Membership Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-accent-500" />
                    <span>Member Since</span>
                  </div>
                  <span className="text-gray-600">
                    {new Date(formData.memberSince).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-accent-500" />
                    <span>Status</span>
                  </div>
                  <span className="text-accent-500 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-accent-500" />
                    <span>Next Billing</span>
                  </div>
                  <span className="text-gray-600">N/A</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-subtle">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">My Profile</h1>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      leftIcon={<Edit3 size={18} />}
                      className="!inline-flex !items-center !text-primary-600 !border-primary-600 !hover:bg-primary-50"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              <div className="p-6">
                {error && (
                  <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-lg">
                    {success}
                  </div>
                )}

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) =>
                          setFormData({ ...formData, zipCode: e.target.value })
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-4 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSave}
                        isLoading={loading}
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;