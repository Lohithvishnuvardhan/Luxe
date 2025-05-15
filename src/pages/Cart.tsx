import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-24">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-6">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button
              as={Link}
              to="/products"
              variant="primary"
              size="lg"
            >
              Continue Shopping
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-subtle">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border-b border-gray-200 last:border-0"
                  >
                    <Link to={`/products/${item.id}`} className="shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    </Link>

                    <div className="flex-1">
                      <Link
                        to={`/products/${item.id}`}
                        className="text-lg font-medium hover:text-primary-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-medium">
                        {item.currency}
                        {(item.price * item.quantity).toFixed(2)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-sm text-gray-500">
                          {item.currency}
                          {item.price.toFixed(2)} each
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-subtle p-6">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Button variant="primary" size="lg" className="w-full mb-4">
                  Proceed to Checkout
                </Button>
                <Link
                  to="/products"
                  className="text-primary-600 hover:text-primary-700 text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Cart;