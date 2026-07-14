import ThemeMenu from '@/components/theme/ThemeMenu'

const Footer = () => {
  return (
    <footer className="border-t border-border px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">Fake Store | E-Commerce</p>
        <ThemeMenu />
      </div>
    </footer>
  )
}

export default Footer
