import NavLinkList from '@/components/navbar/menu/NavLinkList'
import Profile from '@/components/navbar/menu/Profile'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import useCategories from '@/hooks/useCategories'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { categories, isLoading, error } = useCategories()
  const { clearCart } = useCart()
  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    clearCart()
    navigate('/login', { replace: true })
  }

  return (
    <header className="relative border-b border-border px-4 py-3 md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link to="/">
          <h1 className="text-xl font-bold md:text-2xl">Fake Store</h1>
        </Link>
        <div className="hidden md:block ms-auto">
          <NavLinkList categories={categories} isLoading={isLoading} error={error} />
        </div>
        <div className="ms-auto">
          <Profile isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
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
