import * as client from '@/services/client'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useProducts from './useProducts'

vi.mock('@/services/client')

describe('useProducts', () => {
  beforeEach(() => vi.clearAllMocks())

  it('loads products successfully', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Test product',
        price: 10,
        description: 'Test description',
        category: 'test-category',
        image: '/image.jpg',
      },
    ]
    vi.mocked(client.getProducts).mockResolvedValue(mockProducts)

    const { result } = renderHook(() => useProducts())

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.products).toEqual(mockProducts)
    expect(result.current.error).toBeNull()
  })

  it('sets an error when the fetch fails', async () => {
    vi.mocked(client.getProducts).mockRejectedValue(new Error('fail'))

    const { result } = renderHook(() => useProducts())

    await waitFor(() => expect(result.current.error).toBe('An error occurred while fetching products.'))
  })

  it('refetches when the category changes', async () => {
    vi.mocked(client.getProducts).mockResolvedValue([])

    const { rerender } = renderHook(({ category }) => useProducts(category), {
      initialProps: { category: 'test-1' },
    })

    await waitFor(() => expect(client.getProducts).toHaveBeenCalledWith('test-1'))

    rerender({ category: 'test-2' })

    await waitFor(() => expect(client.getProducts).toHaveBeenCalledWith('test-2'))
  })
})
