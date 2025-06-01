import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data/products';
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { CATEGORIES } from '@/data/categories';
import { Product } from '@/types';

interface NewProduct {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  imageUrl: string;
  stock: number;
  featured: boolean;
  bestseller: boolean;
  new: boolean;
  currency: string;
  rating: number;
  reviews: number;
}

const AdminProducts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([...ALL_PRODUCTS]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: '',
    category: '',
    price: 0,
    description: '',
    imageUrl: '',
    stock: 0,
    featured: false,
    bestseller: false,
    new: false,
    currency: '$',
    rating: 0,
    reviews: 0
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const firebaseProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];

        // Combine Firebase products with ALL_PRODUCTS
        const allProducts = [...ALL_PRODUCTS, ...firebaseProducts];
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add to Firebase
      const docRef = await addDoc(collection(db, 'products'), {
        ...newProduct,
        createdAt: new Date().toISOString()
      });

      // Add to local state
      const newProductWithId = {
        ...newProduct,
        id: docRef.id
      } as Product;

      const updatedProducts = [...products, newProductWithId];
      setProducts(updatedProducts);

      // Update localStorage to sync with products page
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('productsUpdated'));

      setIsModalOpen(false);
      setNewProduct({
        name: '',
        category: '',
        price: 0,
        description: '',
        imageUrl: '',
        stock: 0,
        featured: false,
        bestseller: false,
        new: false,
        currency: '$',
        rating: 0,
        reviews: 0
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      description: product.description,
      imageUrl: product.imageUrl,
      stock: product.stock,
      featured: product.featured,
      bestseller: product.bestseller,
      new: product.new,
      currency: product.currency,
      rating: product.rating || 0,
      reviews: product.reviews || 0
    });
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    setLoading(true);

    try {
      // Update Firebase if it's a Firebase product
      if (!editingProduct.id.startsWith('product-') && !editingProduct.id.startsWith('clothing-')) {
        const productRef = doc(db, 'products', editingProduct.id);
        await updateDoc(productRef, {
          ...newProduct,
          updatedAt: new Date().toISOString()
        });
      }

      // Update local state
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...newProduct, id: editingProduct.id } as Product
          : p
      );
      setProducts(updatedProducts);

      // Update localStorage
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
      window.dispatchEvent(new CustomEvent('productsUpdated'));

      setIsModalOpen(false);
      setEditingProduct(null);
      setNewProduct({
        name: '',
        category: '',
        price: 0,
        description: '',
        imageUrl: '',
        stock: 0,
        featured: false,
        bestseller: false,
        new: false,
        currency: '$',
        rating: 0,
        reviews: 0
      });
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      // Delete from Firebase if it's a Firebase product
      if (!product.id.startsWith('product-') && !product.id.startsWith('clothing-')) {
        await deleteDoc(doc(db, 'products', product.id));
      }

      // Update local state
      const updatedProducts = products.filter(p => p.id !== product.id);
      setProducts(updatedProducts);

      // Update localStorage
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
      window.dispatchEvent(new CustomEvent('productsUpdated'));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif font-bold">Product Management</h1>
            <Button
              variant="primary"
              leftIcon={<Plus size={20} />}
              onClick={() => setIsModalOpen(true)}
            >
              Add Product
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-subtle overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {product.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.currency}{product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Add Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                    setNewProduct({
                      name: '',
                      category: '',
                      price: 0,
                      description: '',
                      imageUrl: '',
                      stock: 0,
                      featured: false,
                      bestseller: false,
                      new: false,
                      currency: '$',
                      rating: 0,
                      reviews: 0
                    });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Original Price
                    </label>
                    <input
                      type="number"
                      value={newProduct.originalPrice || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newProduct.featured}
                      onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                      className="mr-2"
                    />
                    Featured
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newProduct.bestseller}
                      onChange={(e) => setNewProduct({ ...newProduct, bestseller: e.target.checked })}
                      className="mr-2"
                    />
                    Bestseller
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newProduct.new}
                      onChange={(e) => setNewProduct({ ...newProduct, new: e.target.checked })}
                      className="mr-2"
                    />
                    New Arrival
                  </label>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={loading}
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AdminProducts;