import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types/product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  items: CartItem[];
  itemCount: number;
  addItem: (product: Product) => void;
  addItemWithQuantity: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tl_atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  React.useEffect(() => {
    try {
      localStorage.setItem('tl_atelier_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart items to localStorage:', e);
    }
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.product.id === product.id);
      if (existing) {
        return prevItems.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const addItemWithQuantity = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.product.id === product.id);
      if (existing) {
        return prevItems.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        items,
        itemCount,
        addItem,
        addItemWithQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
