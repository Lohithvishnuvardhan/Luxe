import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Luxury: A Guide to Premium Products",
      excerpt: "Discover what makes luxury products truly special and how to identify quality craftsmanship in your purchases.",
      image: "https://images.pexels.com/photos/1619651/pexels-photo-1619651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Luxury Lifestyle"
    },
    {
      id: 2,
      title: "Sustainable Luxury: The Future of Premium Products",
      excerpt: "How luxury brands are embracing sustainability without compromising on quality and elegance.",
      image: "https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      author: "Michael Chen",
      date: "March 12, 2024",
      category: "Sustainability"
    },
    {
      id: 3,
      title: "Investment Pieces: Products That Stand the Test of Time",
      excerpt: "A comprehensive guide to choosing luxury items that retain their value and style over the years.",
      image: "https://images.pexels.com/photos/9428799/pexels-photo-9428799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      author: "Emma Thompson",
      date: "March 10, 2024",
      category: "Shopping Guide"
    }
  ];

  return (
    <div className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif font-bold mb-4">Our Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends, insights, and stories about luxury products, sustainable practices, and premium lifestyle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-subtle overflow-hidden"
            >
              <div className="relative aspect-[16/9]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-sm font-medium px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-serif font-bold mb-3">
                  <Link to={`/blog/${post.id}`} className="hover:text-primary-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User size={16} className="mr-1" />
                    {post.author}
                  </div>
                  <div className="mx-2">•</div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {post.date}
                  </div>
                </div>
                
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Read More
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Blog;