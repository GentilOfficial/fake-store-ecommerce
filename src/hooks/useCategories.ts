import { getProducts } from '@/services/client'
import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'

const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const products = await getProducts()

        const uniqueCategories = products.reduce((cat: string[], product: Product) => {
          if (!cat.includes(product.category)) {
            cat.push(product.category)
          }
          return cat
        }, [] as string[])

        setCategories(uniqueCategories)
      } catch (e) {
        console.error('Error fetching categories:', e)
        setError('An error occurred while fetching categories.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { categories, isLoading, error }
}

export default useCategories
