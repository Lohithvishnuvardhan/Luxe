export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  bestseller: boolean;
  new: boolean;
  rating: number;
  reviews: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string;
}

export interface Newsletter {
  email: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}