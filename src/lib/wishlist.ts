import { supabase } from '../config/supabase';
import { Product } from '@/types';

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product: Product;
  created_at: string;
}

export const addToWishlist = async (userId: string, product: Product): Promise<WishlistItem> => {
  try {
    const { data, error } = await supabase
      .from('wishlist')
      .insert([{
        user_id: userId,
        product_id: product.id,
        product
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

export const removeFromWishlist = async (userId: string, productId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

export const getUserWishlist = async (userId: string): Promise<WishlistItem[]> => {
  try {
    const { data, error } = await supabase
      .from('wishlist')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting user wishlist:', error);
    return [];
  }
};

export const isInWishlist = async (userId: string, productId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
};