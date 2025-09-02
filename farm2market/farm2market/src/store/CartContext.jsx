import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i._id === product._id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx].quantity += qty;
        return next;
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(i => i._id !== id));
  };

  const updateQty = (id, qty) => {
    setItems(prev => prev.map(i => i._id === id ? { ...i, quantity: Math.max(1, qty) } : i));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
