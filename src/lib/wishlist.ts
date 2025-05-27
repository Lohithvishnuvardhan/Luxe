import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product } from '@/types';

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export const addToWishlist = async (userId: string, product: Product) => {
  try {
    const wishlistRef = collection(db, 'wishlist');
    const newItem = {
      userId,
      productId: product.id,
      product,
      addedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(wishlistRef, newItem);
    return { id: docRef.id, ...newItem };
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

export const removeFromWishlist = async (itemId: string) => {
  try {
    const docRef = doc(db, 'wishlist', itemId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

export const getUserWishlist = async (userId: string): Promise<WishlistItem[]> => {
  try {
    const wishlistRef = collection(db, 'wishlist');
    const q = query(
      wishlistRef, 
      where('userId', '==', userId),
      orderBy('addedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as WishlistItem));
  } catch (error) {
    console.error('Error getting user wishlist:', error);
    throw error;
  }
};

function orderBy(_arg0: string, _arg1: string): import("@firebase/firestore").QueryConstraint {
  throw new Error('Function not implemented.');
}
