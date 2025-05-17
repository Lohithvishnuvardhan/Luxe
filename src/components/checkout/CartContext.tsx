import React, { createContext, useContext, useState } from 'react';

type CartItem = {
id: string;
name: string;
price: number;
image: string;
quantity: number;
};

type CartContextType = {
cart: CartItem[];
addToCart: (item: CartItem) => void;
removeFromCart: (id: string) => void;
clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
const [cart, setCart] = useState<CartItem[]>([]);

const addToCart = (item: CartItem) => {
setCart((prev) => {
const existing = prev.find((i) => i.id === item.id);
if (existing) {
return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
}
return [...prev, { ...item, quantity: 1 }];
});
};

const removeFromCart = (id: string) => {
setCart((prev) => prev.filter((item) => item.id !== id));
};

const clearCart = () => setCart([]);

return (
<CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
{children}
</CartContext.Provider>
);
};

export const useCart = () => {
const context = useContext(CartContext);
if (!context) throw new Error('useCart must be used within a CartProvider');
return context;