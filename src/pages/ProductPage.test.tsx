import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { MemoryRouter } from 'react-router-dom'
import ProductPage from './ProductPage'

const addToCartMock = vi.fn()

const authMock = vi.hoisted(() => ({
  isAuthenticated: false,
}))

vi.mock('@/hooks/useProductDetail', () => ({
  default: () => ({
    product: {
      id: 1,
      title: 'Test Product',
      price: 10,
      image: '/image.jpg',
      category: 'test',
      description: 'Test product',
    },
    isLoading: false,
    error: null,
  }),
}))

vi.mock('@/context/CartContext', () => ({
  useCart: () => ({
    addToCart: addToCartMock,
  }),
}))

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => authMock,
}))

describe('ProductPage authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    authMock.isAuthenticated = false
  })

  const renderProductPage = () =>
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <ProductPage />
      </MemoryRouter>,
    )

  it('blocks guests from adding products to cart', () => {
    authMock.isAuthenticated = false

    renderProductPage()

    expect(screen.getByText(/must be logged in/i)).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: /add to cart/i,
    })

    expect(button).toBeDisabled()

    fireEvent.click(button)

    expect(addToCartMock).not.toHaveBeenCalled()
  })

  it('allows authenticated users to add products', () => {
    authMock.isAuthenticated = true

    renderProductPage()

    const button = screen.getByRole('button', {
      name: /add to cart/i,
    })

    expect(button).not.toBeDisabled()

    fireEvent.click(button)

    expect(addToCartMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Product',
      }),
    )
  })
})
