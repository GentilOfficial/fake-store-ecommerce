import { WishlistContext } from '@/context/WishlistContext'
import type { Product } from '@/types/product'
import { useState } from 'react'

const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([])

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id) ? prev.filter((item) => item.id !== product.id) : [...prev, product],
    )
  }

  const isInWishlist = (productId: number) => wishlist.some((item) => item.id === productId)

  const clearWishlist = () => {
    setWishlist([])
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export default WishlistProvider
