import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { useLocation, useNavigate } from 'react-router-dom'

type NavLinkListProps = {
  categories: string[]
  isLoading: boolean
  error: string | null
  listClassName?: string
  onSelect?: () => void
}

const NavLinkList = ({ categories, isLoading, error, listClassName, onSelect }: NavLinkListProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isRoot = location.pathname === '/'

  const handleNavigate = (to: string) => {
    navigate(to)
    onSelect?.()
  }

  if (isLoading) return <Spinner className="mx-auto" />

  if (error) return <div>Error: {error}</div>

  return (
    <NavigationMenu viewport={false} className="max-w-full">
      <NavigationMenuList className={cn('gap-2', listClassName)}>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button
              type="button"
              variant={isRoot ? 'secondary' : 'link'}
              className="font-medium whitespace-nowrap"
              onClick={() => handleNavigate('/')}
            >
              All
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {categories.map((category, i) => (
          <NavigationMenuItem key={`category-${category}-${i}`}>
            <NavigationMenuLink asChild>
              <Button
                type="button"
                variant={location.pathname === `/category/${encodeURIComponent(category)}` ? 'secondary' : 'link'}
                className="capitalize whitespace-nowrap"
                onClick={() => handleNavigate(`/category/${encodeURIComponent(category)}`)}
              >
                {category}
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavLinkList
