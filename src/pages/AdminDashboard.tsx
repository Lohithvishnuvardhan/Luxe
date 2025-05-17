import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { label: 'Total Sales', value: '₹82,300' },
  { label: 'Orders', value: 128 },
  { label: 'Users', value: 312 },
  { label: 'Products', value: 48 },
];

const chartData = [
  { month: 'Jan', sales: 12000 },
  { month: 'Feb', sales: 15000 },
  { month: 'Mar', sales: 20000 },
  { month: 'Apr', sales: 18000 },
  { month: 'May', sales: 27300 },
];

const AdminDashboard = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-start"
          >
            <span className="text-sm text-gray-500">{stat.label}</span>
            <span className="text-xl font-semibold mt-2">{stat.value}</span>
          </div>
        ))}
      </div>
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#000000" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AdminDashboard;
