import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Container from '@/components/ui/Container';
import { ShoppingCart, Heart, Eye, Search, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/categories';
import { Product } from '@/types';
import { ALL_PRODUCTS } from '@/data/products';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

const Products: React.FC = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const rotationRefs = useRef<{ [key: string]: { x: number; y: number } }>({});
  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const firebaseProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];

        const allProducts = [...ALL_PRODUCTS, ...firebaseProducts];
        setProducts(allProducts);
        localStorage.setItem('adminProducts', JSON.stringify(allProducts));
      } catch (error) {
        console.error('Error loading products:', error);
        const storedProducts = localStorage.getItem('adminProducts');
        if (storedProducts) {
          try {
            setProducts(JSON.parse(storedProducts));
          } catch (parseError) {
            console.error('Error parsing stored products:', parseError);
            setProducts(ALL_PRODUCTS);
          }
        } else {
          setProducts(ALL_PRODUCTS);
        }
      }
    };

    loadProducts();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminProducts' && e.newValue) {
        try {
          setProducts(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error parsing updated products:', error);
        }
      }
    };

    const handleCustomUpdate = () => {
      const storedProducts = localStorage.getItem('adminProducts');
      if (storedProducts) {
        try {
          setProducts(JSON.parse(storedProducts));
        } catch (error) {
          console.error('Error parsing updated products:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('productsUpdated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productsUpdated', handleCustomUpdate);
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
    if (isMobile || !productRefs.current[productId]) return;

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
    if (isMobile) return;
    
    const element = productRefs.current[productId];
    if (element) {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    rotationRefs.current[productId] = { x: 0, y: 0 };
  };

  // Generate structured data for products
  const generateProductStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": sortedProducts.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "image": product.imageUrl,
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": product.currency || "USD",
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating || 5,
            "reviewCount": product.reviews || 0
          }
        }
      }))
    };
  };

  return (
    <>
      <Helmet>
        <title>Premium Collection | LuxeCommerce - Luxury Shopping Experience</title>
        <meta name="description" content="Discover our curated selection of luxury items, crafted with precision and designed for excellence. Browse premium products at LuxeCommerce." />
        <meta name="keywords" content="luxury products, premium collection, high-end shopping, designer items" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Premium Collection | LuxeCommerce" />
        <meta property="og:description" content="Discover our curated selection of luxury items, crafted with precision and designed for excellence." />
        <meta property="og:image" content="https://luxecommerce.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Collection | LuxeCommerce" />
        <meta name="twitter:description" content="Discover our curated selection of luxury items, crafted with precision and designed for excellence." />
        <meta name="twitter:image" content="https://luxecommerce.com/og-image.jpg" />

        {/* Mobile Specific */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://luxecommerce.com/products" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateProductStructuredData())}
        </script>
      </Helmet>

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

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col md:flex-row gap-4">
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

                <div className="grid grid-cols-2 md:flex gap-2 md:gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-2 md:px-4 py-2 border border-gray-300 rounded-md min-w-[120px] md:min-w-[160px]"
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
                    className="px-2 md:px-4 py-2 border border-gray-300 rounded-md min-w-[120px] md:min-w-[160px]"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="name">Name</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-20 md:w-24 px-2 md:px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Min"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-20 md:w-24 px-2 md:px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {sortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md"
                >
                  <div 
                    className="relative h-[300px] md:h-[400px] transition-all duration-300"
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
                        loading="lazy"
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

                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="text-lg md:text-xl font-medium text-gray-900 hover:text-primary-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-accent-500" />
                        <span className="ml-1 text-sm text-gray-600">{product.rating || 0}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2 text-base md:text-lg">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div>
                        {product.originalPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xl md:text-2xl font-bold text-gray-900">
                              {product.currency || '$'}{product.price}
                            </span>
                            <span className="text-base md:text-lg text-gray-500 line-through">
                              {product.currency || '$'}{product.originalPrice}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xl md:text-2xl font-bold text-gray-900">
                            {product.currency || '$'}{product.price}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => addItem(product)}
                          className="text-sm md:text-base bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 md:px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={18} />
                          Cart
                        </button>
                        <Link
                          to={`/products/${product.id}`}
                          className="text-sm md:text-base bg-accent-500 hover:bg-accent-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-md transition-colors text-center"
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
    </>
  );
};

export default Products;