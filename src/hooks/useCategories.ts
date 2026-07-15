import { getCategories } from '@/services/client'
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
        const data = await getCategories()

        setCategories(data)
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
