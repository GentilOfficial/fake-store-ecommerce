import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { MemoryRouter } from 'react-router-dom'
import ProductPage from './ProductPage'

const addToCartMock = vi.fn()

const toggleWishlistMock = vi.fn()

const authMock = vi.hoisted(() => ({
  isAuthenticated: false,
}))

const wishlistMock = vi.hoisted(() => ({
  isInWishlist: vi.fn(() => false),
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

vi.mock('@/context/WishlistContext', () => ({
  useWishlist: () => ({
    isInWishlist: wishlistMock.isInWishlist,
    toggleWishlist: toggleWishlistMock,
  }),
}))

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => authMock,
}))

describe('ProductPage authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    authMock.isAuthenticated = false

    wishlistMock.isInWishlist.mockReturnValue(false)
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

  it('blocks guests from adding products to wishlist', () => {
    authMock.isAuthenticated = false

    renderProductPage()

    const wishlistButton = screen.getByRole('button', {
      name: /add to wishlist/i,
    })

    expect(wishlistButton).toBeDisabled()

    fireEvent.click(wishlistButton)

    expect(toggleWishlistMock).not.toHaveBeenCalled()
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

  it('allows authenticated users to add products to wishlist', () => {
    authMock.isAuthenticated = true

    renderProductPage()

    const wishlistButton = screen.getByRole('button', {
      name: /add to wishlist/i,
    })

    expect(wishlistButton).not.toBeDisabled()

    fireEvent.click(wishlistButton)

    expect(toggleWishlistMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Product',
      }),
    )
  })

  it('shows remove wishlist state when product is already in wishlist', () => {
    authMock.isAuthenticated = true

    wishlistMock.isInWishlist.mockReturnValue(true)

    renderProductPage()

    expect(
      screen.getByRole('button', {
        name: /remove from wishlist/i,
      }),
    ).toBeInTheDocument()
  })
})
