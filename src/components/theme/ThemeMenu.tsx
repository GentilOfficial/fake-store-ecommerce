import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import useTheme, { type Theme } from '@/hooks/useTheme'
import { type ChangeEvent } from 'react'

const ThemeMenu = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setTheme(value as Theme)
  }

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
      <label htmlFor="theme-select">Theme</label>
      <NativeSelect id="theme-select" value={theme} onChange={handleThemeChange} aria-label="Theme selector">
        <NativeSelectOption value="light">Light</NativeSelectOption>
        <NativeSelectOption value="dark">Dark</NativeSelectOption>
        <NativeSelectOption value="system">System</NativeSelectOption>
      </NativeSelect>
    </div>
  )
}

export default ThemeMenu
