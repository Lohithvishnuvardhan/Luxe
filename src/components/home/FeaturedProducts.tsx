import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS } from '@/data/products';

const FeaturedProducts: React.FC = () => {
  const { addItem } = useCart();

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Products
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover our handpicked selection of premium products that combine style, quality, and functionality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              onAddToCart={() => addItem(product)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/products"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View All Products
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, onAddToCart }) => {
  const [isRotating, setIsRotating] = useState(false);
  const rotationRef = useRef(0);
  const animationRef = useRef<number>();

  const startRotation = () => {
    if (isRotating) return;
    setIsRotating(true);
    rotationRef.current = 0;
    
    const animate = () => {
      if (!isRotating) return;
      rotationRef.current += 2;
      const element = document.getElementById(`product-${product.id}`);
      if (element) {
        element.style.transform = `rotateY(${rotationRef.current}deg)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopRotation = () => {
    setIsRotating(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <div className="relative overflow-hidden">
        <div
          id={`product-${product.id}`}
          className="relative aspect-square transition-transform duration-500 transform-gpu preserve-3d"
          onMouseEnter={startRotation}
          onMouseLeave={stopRotation}
        >
          <Link to={`/products/${product.id}`}>
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-64 object-cover backface-hidden"
            />
          </Link>
        </div>
        
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </div>
        )}
        
        {product.new && (
          <div className="absolute top-4 right-4 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button 
            onClick={onAddToCart}
            className="bg-white text-gray-900 p-2 rounded-full hover:bg-primary-600 hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
          <button 
            className="bg-white text-gray-900 p-2 rounded-full hover:bg-primary-600 hover:text-white transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </button>
          <Link 
            to={`/products/${product.id}`}
            className="bg-white text-gray-900 p-2 rounded-full hover:bg-primary-600 hover:text-white transition-colors"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg 
                key={i}
                className={`w-4 h-4 ${i < product.rating ? 'text-accent-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            {product.originalPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {product.currency}{product.price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {product.currency}{product.originalPrice}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {product.currency}{product.price}
              </span>
            )}
          </div>
          <button
            onClick={onAddToCart}
            className="text-sm bg-primary-600 hover:bg-primary-700 text-white py-1 px-3 rounded transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProducts;