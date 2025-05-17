// AdminSettings.tsx
import React, { useState } from 'react';

const AdminSettings = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic
  };

  return (
    <section className="max-w-md mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Admin Settings</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          Update Settings
        </button>
      </form>
    </section>
  );
};

export default AdminSettings;
