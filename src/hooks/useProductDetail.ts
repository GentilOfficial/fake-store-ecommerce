import { getProductById } from '@/services/client'
import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'

const useProductDetail = (productId?: string) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const parsedProductId = Number(productId)

    if (!productId || Number.isNaN(parsedProductId)) {
      setError('Product not found.')
      setProduct(null)
      setIsLoading(false)
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
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  return { product, isLoading, error }
}

export default useProductDetail
