import { useAuth } from '@/context/AuthContext'
import AuthProvider from '@/providers/AuthProvider'
import * as client from '@/services/client'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

beforeEach(() => {
  vi.clearAllMocks()
  localStorage.clear()
})

vi.mock('@/services/client')

describe('AuthProvider', () => {
  const LoginTest = () => {
    const { login, isAuthenticated, error } = useAuth()

    return (
      <>
        <button onClick={() => login('user', 'pass')}>Login</button>
        <span>{isAuthenticated ? 'authenticated' : 'anonymous'}</span>
        {error && <span>{error}</span>}
      </>
    )
  }

  const LogoutTest = () => {
    const { logout } = useAuth()

    return <button onClick={logout}>Logout</button>
  }

  const user = userEvent.setup()

  it('authenticates user after success login', async () => {
    vi.mocked(client.login).mockResolvedValue({
      token: 'fake-token',
    })

    render(
      <AuthProvider>
        <LoginTest />
      </AuthProvider>,
    )

    await user.click(screen.getByRole('button'))

    await waitFor(() => expect(screen.getByText('authenticated')).toBeInTheDocument())

    expect(localStorage.getItem('authToken')).toBe('fake-token')
  })

  it('shows authentication error', async () => {
    vi.mocked(client.login).mockRejectedValue({
      status: 401,
    })

    render(
      <AuthProvider>
        <LoginTest />
      </AuthProvider>,
    )

    await user.click(screen.getByRole('button'))

    await waitFor(() => expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument())

    expect(localStorage.getItem('authToken')).toBeNull()
  })

  it('clears token on logout', async () => {
    localStorage.setItem('authToken', 'abc')

    render(
      <AuthProvider>
        <LogoutTest />
      </AuthProvider>,
    )

    await user.click(screen.getByRole('button'))

    expect(localStorage.getItem('authToken')).toBeNull()
  })
})
