"use client";

import { CartItem } from '@prisma/client';
import React, { createContext, useContext, useState } from 'react';

import getCartItems from './actions/getCartItems';
import getCurrentUser from './actions/getCurrentUser';

interface ContextProviderType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  getCart: () => Promise<void>;
}

const AppContext = createContext<ContextProviderType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const getCart = async () => {
    const user = await getCurrentUser();
    if (!user) {
      return;
    }
    const cartItems = await getCartItems(user?.id);
    setCart(cartItems? cartItems : []);
  }
    

  return (
    <AppContext.Provider value={{ cart, setCart, getCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): ContextProviderType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext doit être utilisé dans un ContextProvider');
  }
  return context;
};
