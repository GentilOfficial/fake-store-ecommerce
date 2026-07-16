import type { WishlistContextType } from '@/types/wishlist'
import { createContext, useContext } from 'react'

export const WishlistContext = createContext<WishlistContextType | null>(null)

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
