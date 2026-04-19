import { createContext, useContext } from 'react'

export type CartItems = Record<string, number>

export type CartContextValue = {
  cartItems: CartItems
  setCartItems: (newCartItems: CartItems) => void
  updateQuantity: (productId: string | number, quantity: number) => void
}

export const cartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const ctx = useContext(cartContext)
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider')
  }
  return ctx
}
