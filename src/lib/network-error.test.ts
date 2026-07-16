import { describe, expect, it, vi } from 'vitest'
import { emitNetworkError, subscribeNetworkError } from './network-error'

describe('network-error', () => {
  it('notify all subscribed listeners when a network error is emitted', () => {
    const listener = vi.fn()
    subscribeNetworkError(listener)

    emitNetworkError('test-error')

    expect(listener).toHaveBeenCalledWith('test-error')
  })

  it('unsubscribe stops notifying the listener', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeNetworkError(listener)
    unsubscribe()

    emitNetworkError('test-error')

    expect(listener).not.toHaveBeenCalled()
  })
})
