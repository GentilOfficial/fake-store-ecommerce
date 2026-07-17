import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getProducts, login } from './client'

describe('getProducts', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  const products = [
    {
      id: 1,
      title: 'product title',
      price: 10.99,
      description: 'product description',
      category: 'test-category',
      image: 'https://example.com/image.jpg',
    },
  ]

  it('call the correct endpoint while category is not passed', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => products,
    }) as any

    const result = await getProducts()

    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products', expect.any(Object))
    expect(result).toEqual(products)
  })

  it('call the correct endpoint while category is passed', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => products,
    }) as any

    const result = await getProducts('test-category')

    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/category/test-category', expect.any(Object))
    expect(result).toEqual(products)
  })

  it('throws an error if the response is not ok', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500, statusText: 'Internal Server Error' }) as any

    const request = getProducts()

    await expect(request).rejects.toThrow('Internal Server Error')
  })
})

describe('login', () => {
  it('posts credentials and returns a token', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'abc123' }),
    }) as any

    const result = await login('test-user', 'P@ssw0rd!')

    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/auth/login',
      expect.objectContaining({ method: 'POST' }),
    )

    expect(result).toEqual({ token: 'abc123' })
  })
})
