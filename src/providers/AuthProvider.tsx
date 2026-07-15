import { AuthContext } from '@/context/AuthContext'
import { login as loginService } from '@/services/client'
import { useState } from 'react'

const LOCAL_STORAGE_KEY = 'authToken'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem(LOCAL_STORAGE_KEY))
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (username: string, password: string) => {
    try {
      setError(null)
      setIsLoading(true)

      const data = await loginService(username, password)

      if (!data.token) {
        throw new Error('Authentication failed: no token received')
      }

      setToken(data.token)
      localStorage.setItem(LOCAL_STORAGE_KEY, data.token)
      return true
    } catch (error: any) {
      if (error.status === 401) {
        setError('Authentication failed: invalid credentials')
      } else {
        setError('An error occurred during login. Please try again later.')
      }
    } finally {
      setIsLoading(false)
    }
    return false
  }

  const logout = () => {
    setError(null)
    setToken(null)
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: Boolean(token),
        login,
        logout,
        error,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
