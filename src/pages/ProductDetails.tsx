
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { ALL_PRODUCTS } from '@/data/products';
import { Product } from '@/types';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const [, setProducts] = useState<Product[]>(ALL_PRODUCTS);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Load products from localStorage (same logic as Products page)
    const storedProducts = localStorage.getItem('adminProducts');
    let allProducts = ALL_PRODUCTS;
    
    if (storedProducts) {
      try {
        allProducts = JSON.parse(storedProducts);
        setProducts(allProducts);
      } catch (error) {
        console.error('Error parsing stored products:', error);
        setProducts(ALL_PRODUCTS);
      }
    }

    // Find the specific product
    const foundProduct = allProducts.find(p => p.id === id);
    setProduct(foundProduct || null);

    // Listen for changes in localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminProducts' && e.newValue) {
        try {
          const updatedProducts = JSON.parse(e.newValue);
          setProducts(updatedProducts);
          const updatedProduct = updatedProducts.find((p: { id: string | undefined; }) => p.id === id);
          setProduct(updatedProduct || null);
        } catch (error) {
          console.error('Error parsing updated products:', error);
        }
      }
    };

    // Custom event listener for same-window updates
    const handleCustomUpdate = () => {
      const storedProducts = localStorage.getItem('adminProducts');
      if (storedProducts) {
        try {
          const updatedProducts = JSON.parse(storedProducts);
          setProducts(updatedProducts);
          const updatedProduct = updatedProducts.find((p: { id: string | undefined; }) => p.id === id);
          setProduct(updatedProduct || null);
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
  }, [id]);
  
  if (!product) {
    return (
      <div className="py-24 text-center">
        <Container>
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </Container>
      </div>
    );
  }

  const handleBuyNow = () => {
    addItem(product);
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                  SALE
                </div>
              )}
              {product.new && (
                <div className="absolute top-4 right-4 bg-accent-500 text-white text-sm font-bold px-2 py-1 rounded">
                  NEW
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl font-serif font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex mr-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-5 h-5 ${i < (product.rating || 0) ? 'text-accent-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">{product.reviews || 0} reviews</span>
            </div>

            <div className="mb-6">
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

            <p className="text-gray-600 mb-8">{product.description}</p>

            <div className="flex gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                onClick={() => addItem(product)}
                leftIcon={<ShoppingCart size={20} />}
                className="flex-1"
              >
                Add to Cart
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleBuyNow}
                className="flex-1"
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlistToggle}
                className={isInWishlist(product.id) ? 'text-red-500 border-red-500 hover:bg-red-50' : ''}
                leftIcon={<Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />}
              >
                Wishlist
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="mb-4">
                <span className="font-medium">Availability:</span>{' '}
                <span className={product.stock > 0 ? 'text-success-600' : 'text-error-600'}>
                  {product.stock > 0 ? `In Stock (${product.stock} items)` : 'Out of Stock'}
                </span>
              </div>
              <div>
                <span className="font-medium">Category:</span>{' '}
                <span className="capitalize">{product.category}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
