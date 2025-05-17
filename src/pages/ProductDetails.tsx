import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';
import { useCart } from '../components/checkout/CartContext';

const ProductDetails = () => {
const { id } = useParams<{ id: string }>();
const product = products.find((p) => p.id === id);
const { addToCart } = useCart();

if (!product) {
return <p className="text-center py-10 text-lg text-gray-700">Product not found.</p>;
}

return (
<section className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
<img src={product.image} alt={product.name} className="w-full h-[500px] object-cover rounded-xl" />
<div className="flex flex-col justify-center">
<h2 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h2>
<p className="text-gray-600 text-lg mb-6">{product.description}</p>
<p className="text-2xl font-bold text-black mb-6">${product.price}</p>
<button
onClick={() => addToCart({ ...product, quantity: 1 })}
className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
>
Add to Cart
</button>
</div>
</section>
);
};

export default ProductDetails;