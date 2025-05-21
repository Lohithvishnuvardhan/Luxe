import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

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
                <Link to={`/products/${item.id}`} className="w-24 h-24 rounded-lg overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="text-xl font-medium mb-2">{item.name}</h3>
                  </Link>
                  <p className="text-primary-600 font-medium">{item.currency}{item.price}</p>
                </div>
                <div className="flex gap-4">
                  <Button 
                    variant="primary"
                    onClick={() => addItem(item)}
                  >
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => removeItem(item.id)}
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