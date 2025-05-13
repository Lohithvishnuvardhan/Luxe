import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/categories';

const Categories: React.FC = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Shop by Category
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Browse through our diverse range of meticulously crafted categories designed to cater to your unique preferences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category, index) => (
            <CategoryCard 
              key={category.id}
              id={category.id}
              name={category.name}
              count={category.count}
              image={category.image}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

interface CategoryCardProps {
  id: string;
  name: string;
  count: number;
  image: string;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, count, image, index }) => {
  return (
    <motion.div
      className="group relative rounded-lg overflow-hidden h-80"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <img 
        src={image}
        alt={name}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-medium text-white mb-1">{name}</h3>
          <p className="text-gray-300 mb-4">{count} Products</p>
          <Link 
            to={`/products?category=${id}`}
            className="inline-block bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm px-4 py-2 rounded-md transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Categories;