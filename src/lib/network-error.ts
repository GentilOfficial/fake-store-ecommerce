type NetworkErrorListener = (message: string) => void

const listeners = new Set<NetworkErrorListener>()

export const emitNetworkError = (message: string) => {
  listeners.forEach((listener) => listener(message))
}

export const subscribeNetworkError = (listener: NetworkErrorListener) => {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}
