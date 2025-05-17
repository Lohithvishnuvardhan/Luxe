import React from 'react';
import { useCart } from '../components/checkout/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, total } = useCart();

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white p-4 shadow rounded-xl">
              <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price} × {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right text-lg font-bold mt-4">
            Total: ${total}
          </div>
          <div className="text-right">
            <Link
              to="/checkout"
              className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
