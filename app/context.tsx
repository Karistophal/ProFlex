"use client";

import React, { createContext, useContext, useState } from 'react';

interface ContextProviderType {
  cartQuantity: number;
  setCartQuantity: (quantity: number) => void;
}

const AppContext = createContext<ContextProviderType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState<number>(1);

  return (
    <AppContext.Provider value={{ cartQuantity, setCartQuantity }}>
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
