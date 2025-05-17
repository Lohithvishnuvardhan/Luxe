import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';

const Products = () => {
return (
<section className="max-w-7xl mx-auto px-6 py-10">
<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Products</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
{products.map((product) => (
<Link
to={/product/${product.id}}
key={product.id}
className="bg-white shadow rounded-2xl overflow-hidden transition hover:shadow-lg"
>
<img src={product.image} alt={product.name} className="h-64 w-full object-cover" />
<div className="p-4">
<h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
<p className="text-gray-600 text-sm mt-1">{product.description}</p>
<p className="text-black font-bold mt-2">${product.price}</p>
</div>
</Link>
))}
</div>
</section>
);
};

export default Products;