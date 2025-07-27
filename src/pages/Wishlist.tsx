import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { getUserWishlist, removeFromWishlist, WishlistItem } from '@/lib/wishlist';

const Wishlist: React.FC = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const wishlistItems = await getUserWishlist(user.id);
        setItems(wishlistItems);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleRemoveItem = async (productId: string) => {
    if (!user) return;

    try {
      await removeFromWishlist(user.id, productId);
      setItems(items.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  if (!user) {
    return (
      <div className="py-24">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-8">You need to be signed in to view your wishlist.</p>
            <Button
              as={Link}
              to="/auth/login"
              variant="primary"
            >
              Sign In
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="py-24">
        <Container>
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h1 className="text-3xl font-serif font-bold mb-4">Loading Wishlist...</h1>
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
          <h1 className="text-3xl font-serif font-bold mb-8">My Wishlist</h1>
          
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-subtle p-6 flex items-center gap-6">
                <Link to={`/products/${item.product.id}`} className="w-24 h-24 rounded-lg overflow-hidden">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/products/${item.product.id}`}>
                    <h3 className="text-xl font-medium mb-2">{item.product.name}</h3>
                  </Link>
                  <p className="text-primary-600 font-medium">{item.product.currency}{item.product.price}</p>
                </div>
                <div className="flex gap-4">
                  <Button 
                    variant="primary"
                    onClick={() => addItem(item.product)}
                  >
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => handleRemoveItem(item.product_id)}
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>
            ))}
            
            {items.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                <Button
                  as={Link}
                  to="/products"
                  variant="primary"
                >
                  Browse Products
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Wishlist;