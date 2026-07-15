import { emitNetworkError } from '@/lib/network-error'
import type { Product } from '@/types/product'

const request = async (url: string, method: string = 'GET', body?: any): Promise<any> => {
  const config: RequestInit = {
    method,
  }

  if (body) {
    config.headers = {
      'Content-Type': 'application/json',
    }
    config.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(`https://fakestoreapi.com${url}`, config)

    if (!response.ok) {
      throw new Error('Network error')
    }

    return await response.json()
  } catch (error) {
    emitNetworkError('Network error')
    throw error
  }
}

export const getCategories = async (): Promise<string[]> => await request('/products/categories')
export const getProducts = async (category?: string): Promise<Product[]> => {
  if (category) {
    return await request(`/products/category/${category}`)
  }
  return await request('/products')
}
export const getProductById = async (productId: number): Promise<Product> => await request(`/products/${productId}`)
