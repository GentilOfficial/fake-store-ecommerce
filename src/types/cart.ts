import type { Product } from '@/types/product'

export interface CartContextType {
  cart: (Product & { cartItemId: string })[]
  addToCart: (item: Product) => void
  removeFromCart: (cartItemId: string) => void
  clearCart: () => void
}
