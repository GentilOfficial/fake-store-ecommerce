import { emitNetworkError } from '@/lib/network-error'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import GlobalNetworkErrorProvider from './GlobalNetworkErrorProvider'

describe('GlobalNetworkErrorProvider', () => {
  it('shows the error dialog when a network error is emitted', async () => {
    render(
      <GlobalNetworkErrorProvider>
        <div>App content</div>
      </GlobalNetworkErrorProvider>,
    )

    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()

    act(() => {
      emitNetworkError('Network error')
    })

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument()
  })

  it('closes the dialog when Dismiss is clicked', async () => {
    render(
      <GlobalNetworkErrorProvider>
        <div>App content</div>
      </GlobalNetworkErrorProvider>,
    )

    act(() => {
      emitNetworkError('Network error')
    })

    await screen.findByText('Something went wrong')

    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }))

    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })
})
