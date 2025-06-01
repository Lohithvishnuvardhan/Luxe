import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { ShoppingCart, Heart, Eye, Search, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/categories';
import { Product } from '@/types';
import { ALL_PRODUCTS } from '@/data/products';

const Products: React.FC = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [] = useState<{ [key: string]: boolean }>({});
  const rotationRefs = useRef<{ [key: string]: { x: number; y: number } }>({});
  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);

  useEffect(() => {
    // Load initial products
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }

    // Listen for changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminProducts' && e.newValue) {
        setProducts(JSON.parse(e.newValue));
      }
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
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
        return (b.rating || 0) - (a.rating || 0);
      default:
        return (b.rating || 0) - (a.rating || 0);
    }
  });

  const handleMouseMove = (e: React.MouseEvent, productId: string) => {
    if (!productRefs.current[productId]) return;

    const element = productRefs.current[productId];
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 20;
    const rotateY = ((centerX - x) / centerX) * 20;

    if (!rotationRefs.current[productId]) {
      rotationRefs.current[productId] = { x: 0, y: 0 };
    }

    rotationRefs.current[productId] = { x: rotateX, y: rotateY };
    
    if (element) {
      element.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;
    }
  };

  const handleMouseLeave = (productId: string) => {
    const element = productRefs.current[productId];
    if (element) {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    rotationRefs.current[productId] = { x: 0, y: 0 };
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

          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-4">
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

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md min-w-[160px]"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Min"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Max"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md min-w-[160px]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md"
              >
                <div 
                  className="relative h-[400px] transition-all duration-300"
                  ref={(el) => productRefs.current[product.id] = el}
                  onMouseMove={(e) => handleMouseMove(e, product.id)}
                  onMouseLeave={() => handleMouseLeave(product.id)}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Link to={`/products/${product.id}`}>
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      style={{ transform: 'translateZ(20px)' }}
                    />
                  </Link>

                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded" style={{ transform: 'translateZ(40px)' }}>
                      SALE
                    </div>
                  )}

                  {product.new && (
                    <div className="absolute top-4 right-4 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded" style={{ transform: 'translateZ(40px)' }}>
                      NEW
                    </div>
                  )}

                  <div className="absolute bottom-4 right-4 flex flex-col gap-2" style={{ transform: 'translateZ(40px)' }}>
                    <button 
                      className="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-2 min-w-[130px]"
                      aria-label="Add to wishlist"
                    >
                      <Heart size={18} />
                      <span>Wishlist</span>
                    </button>
                    <Link 
                      to={`/products/${product.id}`}
                      className="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-2 min-w-[130px]"
                      aria-label="Quick view"
                    >
                      <Eye size={18} />
                      <span>Quick View</span>
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-xl font-medium text-gray-900 hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-accent-500" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating || 0}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2 text-lg">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div>
                      {product.originalPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            {product.currency || '$'}{product.price}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            {product.currency || '$'}{product.originalPrice}
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-gray-900">
                          {product.currency || '$'}{product.price}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => addItem(product)}
                        className="text-base bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        Cart
                      </button>
                      <Link
                        to={`/products/${product.id}`}
                        className="text-base bg-accent-500 hover:bg-accent-600 text-white py-3 px-6 rounded-md transition-colors text-center"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Products;