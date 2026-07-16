import type { CartContextType } from '@/types/cart'
import { createContext, useContext } from 'react'

export const CartContext = createContext<CartContextType | null>(null)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
