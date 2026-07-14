import { useEffect, useMemo, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

const THEME_STORAGE_KEY = 'theme'
const THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)'

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'

  return window.matchMedia(THEME_MEDIA_QUERY).matches ? 'dark' : 'light'
}

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system'

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
    return storedTheme
  }

  return 'system'
}

const applyThemeClass = (theme: Theme) => {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

  root.classList.toggle('dark', resolvedTheme === 'dark')
}

const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme())

  const resolvedTheme = useMemo(() => (theme === 'system' ? getSystemTheme() : theme), [theme])

  useEffect(() => {
    applyThemeClass(theme)

    if (theme !== 'system' || typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY)
    const onSystemThemeChange = () => applyThemeClass('system')

    mediaQuery.addEventListener('change', onSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', onSystemThemeChange)
    }
  }, [theme])

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    }
  }

  return { theme, resolvedTheme, setTheme }
}

export default useTheme
