import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import useProductDetail from './useProductDetail'

describe('useProductDetail', () => {
  it('sets an error if productId is not a valid number', async () => {
    const { result } = renderHook(() => useProductDetail('abc'))

    await waitFor(() => {
      expect(result.current.error).toBe('Product not found.')
      expect(result.current.product).toBeNull()
    })
  })
})
