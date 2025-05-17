import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
return (
<header className="bg-white shadow-md sticky top-0 z-50">
<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
<Link to="/" className="text-2xl font-bold text-gray-800">Luxe</Link>
<nav className="flex gap-6 text-sm font-medium text-gray-600">
<Link to="/products" className="hover:text-black">Products</Link>
<Link to="/cart" className="hover:text-black">Cart</Link>
<Link to="/profile" className="hover:text-black">Profile</Link>
<Link to="/admin" className="hover:text-black">Admin</Link>
</nav>
</div>
</header>
);
};

export default Header;