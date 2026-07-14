import type { Product } from '@/types/product'

const request = async (url: string, method: string = 'GET', body: any): Promise<any> => {
  const config: RequestInit = {
    method,
  }

  if (body) {
    config.headers = {
      'Content-Type': 'application/json',
    }
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`https://fakestoreapi.com${url}`, config)

  if (!response.ok) {
    throw new Error(`HTTP error, status: ${response.status}`)
  }

  return await response.json()
}

export const getProducts = async (): Promise<Product[]> => await request('/products', 'GET', null)
