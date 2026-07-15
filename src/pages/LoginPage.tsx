import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/context/AuthContext'
import AppLayout from '@/layouts/AppLayout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { login, error, isLoading } = useAuth()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const navigate = useNavigate()

  const canSubmit = Object.values(credentials).every(Boolean)

  const handleInputChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    const { username, password } = credentials
    const success = await login(username, password)

    setCredentials((prev) => ({
      ...prev,
      password: '',
    }))

    if (!success) return

    navigate('/')
  }

  return (
    <AppLayout>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-sm animate-in fade-in-0 zoom-in-95 gap-8 px-4 py-12 duration-500"
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Authentication</FieldLegend>
            <FieldDescription>Please enter your username and password to log in</FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  disabled={isLoading}
                  required
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  disabled={isLoading}
                  required
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              {error && <FieldContent className="text-destructive">{error}</FieldContent>}
              <Button type="submit" className="w-full" disabled={!canSubmit || isLoading}>
                {isLoading ? <Spinner /> : 'Login'}
              </Button>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </AppLayout>
  )
}

export default LoginPage
