import { CartContext } from '@/context/CartContext'
import type { Product } from '@/types/product'
import { useState } from 'react'

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<(Product & { cartItemId: string })[]>([])

  const addToCart = (product: Product) => {
    setCart((prevItems) => [...prevItems, { ...product, cartItemId: crypto.randomUUID() }])
  }

  const removeFromCart = (cartItemId: string) => {
    setCart((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId))
  }

  const clearCart = () => {
    setCart([])
  }

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
}

export default CartProvider
