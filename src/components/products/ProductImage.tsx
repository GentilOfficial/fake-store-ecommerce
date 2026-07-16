import ProductImageLoadingState from '@/components/products/loading/ProductImageLoadingState'
import type { Product } from '@/types/product'
import { useState } from 'react'

const ProductImage = ({ product }: { product: Product }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <ProductImageLoadingState />}
      <img
        key={product.id}
        src={product.image}
        alt={product.title}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        className={`h-full w-full object-contain transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </>
  )
}

export default ProductImage
