import { create } from "zustand";
import { CartItem } from "../types";

type cartStoreType = {
    cart: CartItem[];
    initCart: (items: CartItem[]) => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<cartStoreType>((set) => ({
    cart: [],
    initCart: (items) => set({ cart: items }),
    addToCart: (item) => set((state) => ({
        cart: state.cart.some(cartItem => cartItem.id === item.id)
          ? state.cart.map(cartItem =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: item.quantity }
                : cartItem
            )
          : [...state.cart, { ...item, quantity: item.quantity || 1 }]
      })),
    removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
    clearCart: () => set({ cart: [] }),
})); 
