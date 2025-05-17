import React, { useState } from 'react';
import { useCart } from '../components/checkout/CartContext';

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful checkout
    clearCart();
    alert('Order placed successfully!');
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="Full Name"
          value={shippingInfo.name}
          onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
          required
          className="w-full border px-4 py-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
          required
          className="w-full border px-4 py-2 rounded-md"
        />
        <input
          type="text"
          placeholder="City"
          value={shippingInfo.city}
          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
          required
          className="w-full border px-4 py-2 rounded-md"
        />
        <div className="font-semibold text-lg">
          Order Total: ${total}
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Place Order
        </button>
      </form>
    </section>
  );
};

export default Checkout;
