import { supabase } from '../config/supabase';
import { CartItem } from '@/types';

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  created_at: string;
  customer_name?: string;
  customer_email?: string;
  shipping_address?: string;
}

export const createOrder = async (userId: string, items: CartItem[], total: number): Promise<Order> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        user_id: userId,
        items,
        total,
        status: 'processing'
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting user orders:', error);
    return [];
  }
};

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        users (
          name,
          email
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting all orders:', error);
    return [];
  }
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<void> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};