import React from 'react';
import { useAuth } from '../components/auth/AuthContext';

const Profile = () => {
  const { currentUser, logout } = useAuth();

  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <p className="text-gray-700 mb-4">Email: <span className="font-medium">{currentUser?.email}</span></p>
        <button
          onClick={logout}
          className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default Profile;
