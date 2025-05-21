
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Interface for product data
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
};

// Add a new product
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'products'), product);
  return docRef.id;
};

// Update a product
export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  const productRef = doc(db, 'products', id);
  await updateDoc(productRef, product);
};

// Get a single product
export const getProduct = async (id: string): Promise<Product | null> => {
  const productRef = doc(db, 'products', id);
  const productSnap = await getDoc(productRef);
  
  if (!productSnap.exists()) {
    return null;
  }
  
  return {
    id: productSnap.id,
    ...productSnap.data()
  } as Product;
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'products', id));
};
