import NavLinkList from '@/components/navbar/menu/NavLinkList'
import { Button } from '@/components/ui/button'
import useCategories from '@/hooks/useCategories'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { categories, isLoading, error } = useCategories()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="relative border-b border-border px-4 py-3 md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <h1 className="text-xl font-bold md:text-2xl">Fake Store | E-Commerce</h1>
        <div className="hidden md:block">
          <NavLinkList categories={categories} isLoading={isLoading} error={error} />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
          isMobileMenuOpen
            ? 'max-h-80 translate-y-0 opacity-100'
            : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
        }`}
      >
        <div className="p-3">
          <NavLinkList
            categories={categories}
            isLoading={isLoading}
            error={error}
            listClassName="flex-col"
            onSelect={closeMobileMenu}
          />
        </div>
      </div>
    </header>
  )
}

export default Navbar
