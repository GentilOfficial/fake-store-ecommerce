import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import ProtectedRoute from './ProtectedRoute'

const authMock = vi.hoisted(() => ({ isAuthenticated: false }))
vi.mock('@/context/AuthContext', () => ({ useAuth: () => authMock }))

const renderWithRoute = (authRequired: boolean) =>
  render(
    <MemoryRouter initialEntries={['/private']}>
      <Routes>
        <Route element={<ProtectedRoute authenticated={authRequired} />}>
          <Route path="/private" element={<div>Private content</div>} />
        </Route>
        <Route path="/login" element={<div>Login page</div>} />
      </Routes>
    </MemoryRouter>,
  )

describe('ProtectedRoute', () => {
  it('redirects to login when auth is required but missing', () => {
    renderWithRoute(true)
    expect(screen.getByText('Login page')).toBeInTheDocument()
  })

  it('renders the route when auth matches', () => {
    authMock.isAuthenticated = true
    renderWithRoute(true)
    expect(screen.getByText('Private content')).toBeInTheDocument()
  })
})
