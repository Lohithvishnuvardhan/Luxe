import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import FAQ from './pages/FAQ';
import ShippingReturns from './pages/ShippingReturns';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';

import BusinessDetails from './pages/BusinessDetails';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/Signup';
import AdminLayout from './components/layout/Layout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>

              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="auth/login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />

                {/* Protected Routes */}
                <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                <Route path="about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
                <Route path="products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
                <Route path="faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
                <Route path="shipping" element={<ProtectedRoute><ShippingReturns /></ProtectedRoute>} />
                <Route path="privacy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
                <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="business-details" element={<ProtectedRoute><BusinessDetails /></ProtectedRoute>} />
                <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                <Route path="terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
                <Route path="blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;