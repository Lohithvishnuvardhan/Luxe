import { supabase } from '../config/supabase';
import { Product } from '@/types';

// Products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting product:', error);
    return null;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};