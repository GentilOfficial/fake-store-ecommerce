import { getProductById } from '@/services/client'
import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'

const useProductDetail = (productId?: string) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const parsedProductId = Number(productId)
  const isValidProductId = productId !== undefined && !Number.isNaN(parsedProductId)

  useEffect(() => {
    if (!isValidProductId) {
      return
    }

    const fetchProduct = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const productData = await getProductById(parsedProductId)
        setProduct(productData)
      } catch (e) {
        console.error('Error fetching product:', e)
        setError('An error occurred while fetching this product.')
        setProduct(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [parsedProductId, isValidProductId])

  return {
    product,
    isLoading,
    error: isValidProductId ? error : 'Product not found.',
  }
}

export default useProductDetail
