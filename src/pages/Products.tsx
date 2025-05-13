import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { ShoppingCart, Heart, Eye, Search, Filter } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';

const Products: React.FC = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isRotating, setIsRotating] = useState<{ [key: string]: boolean }>({});
  const rotationRefs = useRef<{ [key: string]: number }>({});

  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return b.rating - a.rating;
    }
  });

  const startRotation = (productId: string) => {
    if (isRotating[productId]) return;
    
    setIsRotating(prev => ({ ...prev, [productId]: true }));
    rotationRefs.current[productId] = 0;
    
    const animate = () => {
      if (!isRotating[productId]) return;
      
      rotationRefs.current[productId] += 2;
      const productElement = document.getElementById(`product-${productId}`);
      if (productElement) {
        productElement.style.transform = `rotateY(${rotationRefs.current[productId]}deg)`;
      }
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  };

  const stopRotation = (productId: string) => {
    setIsRotating(prev => ({ ...prev, [productId]: false }));
  };

  return (
    <div className="py-24">
      <Container>
        <div className="mb-12">
          <motion.h1 
            className="text-4xl font-serif font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Products
          </motion.h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="relative overflow-hidden">
                <div 
                  id={`product-${product.id}`}
                  className="relative aspect-square transition-transform duration-500 transform-gpu preserve-3d"
                  onMouseEnter={() => startRotation(product.id)}
                  onMouseLeave={() => stopRotation(product.id)}
                >
                  <Link to={`/products/${product.id}`}>
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover backface-hidden"
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
                    onClick={() => addItem(product)}
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
                    onClick={() => addItem(product)}
                    className="text-sm bg-primary-600 hover:bg-primary-700 text-white py-1 px-3 rounded transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Products;