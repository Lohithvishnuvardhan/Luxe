import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from '../../components/api/firebase/products';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Products</h2>
        <Link
          to="/admin/add-product"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Add New Product
        </Link>
      </div>
      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow-md flex gap-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-24 w-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500 mb-2">${product.price}</p>
                <div className="flex gap-3 text-sm">
                  <Link
                    to={`/admin/edit-product/${product.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminProducts;
