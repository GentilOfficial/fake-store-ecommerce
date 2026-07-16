import { emitNetworkError } from '@/lib/network-error'
import type { ApiError } from '@/types/api'
import type { Product } from '@/types/product'

const request = async <T>(url: string, method: string = 'GET', body?: unknown): Promise<T> => {
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
      const error = {
        status: response.status,
        message: response.statusText,
      }
      throw error
    }

    return (await response.json()) as T
  } catch (error) {
    const apiError = error as ApiError
    if (apiError.status === undefined) {
      emitNetworkError('Network error')
    }

    throw apiError
  }
}

export const getCategories = () => request<string[]>('/products/categories')
export const getProducts = (category?: string) =>
  category ? request<Product[]>(`/products/category/${category}`) : request<Product[]>('/products')
export const getProductById = (productId: number) => request<Product>(`/products/${productId}`)
export const login = (username: string, password: string) =>
  request<{ token: string }>('/auth/login', 'POST', { username, password })
