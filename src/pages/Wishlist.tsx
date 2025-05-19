
import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ShoppingCart, Trash2 } from 'lucide-react';

const Wishlist: React.FC = () => {
  // This would typically come from your state management
  const wishlistItems = [
    {
      id: 1,
      name: "Premium Business Suite",
      price: 999.99,
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
    },
    // Add more items as needed
  ];

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
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-subtle p-6 flex items-center gap-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium mb-2">{item.name}</h3>
                  <p className="text-primary-600 font-medium">${item.price}</p>
                </div>
                <div className="flex gap-4">
                  <Button variant="primary">
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="text-red-500 hover:bg-red-50">
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>
            ))}
            
            {wishlistItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">Your wishlist is empty</p>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Wishlist;
