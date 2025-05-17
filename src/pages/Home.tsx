import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
return (
<section className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
<div className="text-center max-w-2xl">
<h1 className="text-5xl font-extrabold text-gray-900 mb-4">Welcome to Luxe</h1>
<p className="text-lg text-gray-600 mb-6">Discover high-end fashion tailored for elegance and simplicity.</p>
<Link to="/products" className="inline-block bg-black text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-800 transition" >
Browse Products
</Link>
</div>
</section>
);
};

export default Home;