import * as client from '@/services/client'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useCategories from './useCategories'

vi.mock('@/services/client')

describe('useCategories', () => {
  beforeEach(() => vi.clearAllMocks())

  it('loads categories successfully', async () => {
    vi.mocked(client.getCategories).mockResolvedValue(['test-1', 'test-2'])

    const { result } = renderHook(() => useCategories())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.categories).toEqual(['test-1', 'test-2'])
  })

  it('sets an error when the fetch fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.mocked(client.getCategories).mockRejectedValue(new Error('fail'))

    const { result } = renderHook(() => useCategories())

    await waitFor(() => expect(result.current.error).toBe('An error occurred while fetching categories.'))

    errorSpy.mockRestore()
  })
})
