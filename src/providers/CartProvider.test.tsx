import { useCart } from '@/context/CartContext'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CartProvider from './CartProvider'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  image: '/image.jpg',
  category: 'test-category',
  description: 'test description',
}

const CartTest = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart()
  return (
    <div>
      <span data-testid="cart-count">{cart.length}</span>

      <button onClick={() => addToCart(mockProduct)}>Add</button>

      <button onClick={() => cart[0] && removeFromCart(cart[0].cartItemId)}>Remove</button>

      <button onClick={clearCart}>Clear</button>
    </div>
  )
}

const renderProvider = () =>
  render(
    <CartProvider>
      <CartTest />
    </CartProvider>,
  )

describe('CartProvider', () => {
  it('adds the same product twice as two separate entries', () => {
    renderProvider()

    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByText('Add'))

    expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
  })

  it('removes a single item by cartItemId', () => {
    renderProvider()

    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByText('Remove'))

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
  })
})
