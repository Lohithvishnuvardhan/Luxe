import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { Product } from '@/types';

const AdminProducts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    currency: '$',
    rating: 4.5,
    reviews: 0,
    featured: false,
    bestseller: false,
    new: true
  });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        currency: '$',
        rating: 4.5,
        reviews: 0,
        featured: false,
        bestseller: false,
        new: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      currency: '$',
      rating: 4.5,
      reviews: 0,
      featured: false,
      bestseller: false,
      new: true
    });
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.price || !formData.category || !formData.imageUrl) {
      alert('Please fill in all required fields');
      return;
    }

    const productData: Product = {
      id: editingProduct?.id || `product-${Date.now()}`,
      name: formData.name,
      description: formData.description || '',
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      currency: formData.currency || '$',
      imageUrl: formData.imageUrl,
      category: formData.category,
      featured: formData.featured || false,
      bestseller: formData.bestseller || false,
      new: formData.new || false,
      rating: formData.rating || 4.5,
      reviews: formData.reviews || 0,
      stock: Number(formData.stock) || 0
    };

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? productData : p
      );
      setProducts(updatedProducts);
      
      // Update ALL_PRODUCTS array
      const index = ALL_PRODUCTS.findIndex(p => p.id === editingProduct.id);
      if (index !== -1) {
        ALL_PRODUCTS[index] = productData;
      }
    } else {
      // Add new product
      setProducts(prev => [...prev, productData]);
      ALL_PRODUCTS.push(productData);
    }
    
    handleCloseModal();
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Remove from local state
      setProducts(prev => prev.filter(p => p.id !== productId));
      
      // Remove from ALL_PRODUCTS array
      const index = ALL_PRODUCTS.findIndex(p => p.id === productId);
      if (index !== -1) {
        ALL_PRODUCTS.splice(index, 1);
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              onClick={() => handleOpenModal()}
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

            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
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
                          className="text-primary-600 hover:text-primary-900 mr-4"
                          onClick={() => handleOpenModal(product)}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteProduct(product.id)}
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
      </Container>

      {/* Product Modal (Add/Edit) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
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
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Original Price
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.stock || ''}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="mr-2"
                  />
                  Featured
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.bestseller || false}
                    onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                    className="mr-2"
                  />
                  Bestseller
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.new || false}
                    onChange={(e) => setFormData({ ...formData, new: e.target.checked })}
                    className="mr-2"
                  />
                  New Arrival
                </label>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSaveProduct}
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;