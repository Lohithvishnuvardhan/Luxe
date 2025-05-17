// AdminOrders.tsx
import React from 'react';

const orders = [
  { id: 'ORD001', user: 'Lohith', total: 2300, status: 'Shipped', date: '2025-05-16' },
  { id: 'ORD002', user: 'Rahul', total: 4900, status: 'Processing', date: '2025-05-15' },
];

const AdminOrders = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Orders</h2>
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-sm uppercase text-left">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4">{order.user}</td>
                <td className="px-6 py-4">₹{order.total}</td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminOrders;
