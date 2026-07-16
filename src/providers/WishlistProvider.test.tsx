import { useWishlist } from '@/context/WishlistContext'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import WishlistProvider from './WishlistProvider'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  image: '/image.jpg',
  category: 'test-category',
  description: 'Test description',
}

const WishlistTest = () => {
  const { wishlist, toggleWishlist, isInWishlist, clearWishlist } = useWishlist()

  return (
    <div>
      <span data-testid="wishlist-count">{wishlist.length}</span>

      <span data-testid="is-in-wishlist">{isInWishlist(mockProduct.id).toString()}</span>

      <button onClick={() => toggleWishlist(mockProduct)}>Toggle</button>

      <button onClick={clearWishlist}>Clear</button>
    </div>
  )
}

const renderProvider = () =>
  render(
    <WishlistProvider>
      <WishlistTest />
    </WishlistProvider>,
  )

describe('WishlistProvider', () => {
  it('initializes with an empty wishlist', () => {
    renderProvider()

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('0')

    expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('false')
  })

  it('adds a product to the wishlist', () => {
    renderProvider()

    fireEvent.click(screen.getByText('Toggle'))

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('1')

    expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('true')
  })

  it('removes a product when toggled again', () => {
    renderProvider()

    const button = screen.getByText('Toggle')

    fireEvent.click(button)

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('1')

    fireEvent.click(button)

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('0')

    expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('false')
  })

  it('clears the wishlist', () => {
    renderProvider()

    fireEvent.click(screen.getByText('Toggle'))

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('1')

    fireEvent.click(screen.getByText('Clear'))

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('0')
  })

  it('does not add duplicated products', () => {
    renderProvider()

    const button = screen.getByText('Toggle')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('0')
  })
})
