import type { Product } from '@/types/product'

export interface WishlistContextType {
  wishlist: Product[]
  toggleWishlist: (item: Product) => void
  isInWishlist: (productId: number) => boolean
  clearWishlist: () => void
}
