import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Update meta tags based on current route
    const updateMetaTags = () => {
      const path = location.pathname;
      let title = 'LuxeCommerce - Premium Shopping Experience';
      let description = 'Discover our curated collection of luxury products and exceptional service.';

      // Update meta tags based on current route
      switch (path) {
        case '/products':
          title = 'Shop Premium Products | LuxeCommerce';
          description = 'Browse our exclusive collection of luxury products. Find premium items curated for discerning customers.';
          break;
        case '/about':
          title = 'About Us | LuxeCommerce';
          description = 'Learn about our commitment to quality and exceptional service. Discover the LuxeCommerce story.';
          break;
        case '/contact':
          title = 'Contact Us | LuxeCommerce';
          description = 'Get in touch with our customer service team. We\'re here to help with any questions.';
          break;
        // Add more routes as needed
      }

      // Update document title and meta tags
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', title);
      document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', description);
    };

    updateMetaTags();
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;