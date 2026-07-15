import { getProducts } from '@/services/client'
import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const products = await getProducts()

        setProducts(products)
      } catch (e) {
        console.error('Error fetching products:', e)
        setError('An error occurred while fetching products.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, isLoading, error }
}

export default useProducts
