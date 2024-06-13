'use client'

import { createContext, useState }from "react"

const CartContext = createContext("cart");

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState("cartItems");

    return (
      <CartContext.Provider value={{ cart, setCart }}>
        {children}
      </CartContext.Provider>
    )
}