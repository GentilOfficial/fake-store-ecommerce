import { CURRENCY } from '@/constants/currency'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import CartItem from './CartItem'

const product = {
  id: 1,
  title: 'Test Product',
  price: 10,
  image: '/image.jpg',
  category: 'test',
  description: 'description',
}

describe('CartItem', () => {
  it('renders product information', () => {
    render(<CartItem item={product} handleRemoveAction={vi.fn()} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText(`${CURRENCY} 10.00`)).toBeInTheDocument()
  })

  it('calls remove action after clicking delete', async () => {
    vi.useFakeTimers()

    const removeMock = vi.fn()

    render(<CartItem item={product} handleRemoveAction={removeMock} />)

    fireEvent.click(
      screen.getByRole('button', {
        name: new RegExp(`remove ${product.title} from cart`, 'i'),
      }),
    )

    expect(screen.getByText('Removing...')).toBeInTheDocument()

    vi.advanceTimersByTime(500)

    expect(removeMock).toHaveBeenCalledOnce()

    vi.useRealTimers()
  })

  it('disables remove button while removing', () => {
    render(<CartItem item={product} handleRemoveAction={vi.fn()} />)

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(button).toBeDisabled()
  })
})
