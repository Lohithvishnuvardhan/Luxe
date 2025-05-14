import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { ShoppingCart, Heart, Eye, Search, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';

const Products: React.FC = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isRotating, setIsRotating] = useState<{ [key: string]: boolean }>({});
  const rotationRefs = useRef<{ [key: string]: number }>({});

  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
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
    <div className="py-24 bg-gray-50">
      <Container>
        <div className="mb-12">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-serif font-bold mb-4">Premium Collection</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of luxury items, crafted with precision and designed for excellence.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Section */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-4">Filters</h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="lg:w-3/4">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="flex gap-4">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Rating</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative overflow-hidden">
                      <div 
                        id={`product-${product.id}`}
                        className="relative h-[400px] transition-transform duration-500 transform-gpu preserve-3d"
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

                      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
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
                          <Star className="w-4 h-4 text-accent-500" />
                          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
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
                          className="text-sm bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition-colors flex items-center gap-2"
                        >
                          <ShoppingCart size={16} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Products;