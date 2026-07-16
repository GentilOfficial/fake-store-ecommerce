import { useCart } from '@/context/CartContext'
import CartProvider from '@/providers/CartProvider'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CartSheet from './CartSheet'

const renderCart = () =>
  render(
    <CartProvider>
      <CartSheet />
    </CartProvider>,
  )

describe('CartSheet', () => {
  it('does not show badge when cart is empty', () => {
    renderCart()

    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('shows cart badge when items exist', () => {
    const TestButton = () => {
      const { addToCart } = useCart()

      return (
        <button
          onClick={() =>
            addToCart({
              id: 1,
              title: 'Product',
              price: 10,
              image: '/image.png',
              category: 'test',
              description: 'Test product',
            })
          }
        >
          add
        </button>
      )
    }

    render(
      <CartProvider>
        <TestButton />
        <CartSheet />
      </CartProvider>,
    )

    fireEvent.click(screen.getByText('add'))

    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
