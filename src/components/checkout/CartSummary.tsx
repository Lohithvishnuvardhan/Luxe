import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Truck, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import SuccessModal from './SuccessModel';
import { createOrder } from '@/lib/orders';

const CartSummary: React.FC = () => {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      if (items.find(item => item.id === productId)?.quantity! > 1) {
        updateQuantity(productId, newQuantity);
      }
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCompletePurchase = async () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }

    try {
      await createOrder(user.uid, items, totalPrice);
      setIsSuccessModalOpen(true);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border-x">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">
                {item.currency}{(item.price * item.quantity).toFixed(2)}
              </p>
              {item.originalPrice && (
                <p className="text-sm text-gray-500 line-through">
                  {item.currency}{(item.originalPrice * item.quantity).toFixed(2)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-accent-500">Free</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-4">
          <span className="font-medium">Total</span>
          <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full mt-6 bg-accent-500 hover:bg-accent-600"
        onClick={handleCompletePurchase}
      >
        Complete Purchase
      </Button>

      <div className="mt-6 space-y-3 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-gray-600">
          <Shield className="w-5 h-5" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Truck className="w-5 h-5" />
          <span>Free shipping on orders over $100</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <CreditCard className="w-5 h-5" />
          <span>All major credit cards accepted</span>
        </div>
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default CartSummary;