import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'

type NavLinkListProps = {
  categories: string[]
  isLoading: boolean
  error: string | null
  listClassName?: string
  onSelect?: () => void
}

const NavLinkList = ({ categories, isLoading, error, listClassName, onSelect }: NavLinkListProps) => {
  const location = useLocation()

  const isRoot = location.pathname === '/'

  if (error) return <div>Error: {error}</div>

  return (
    <NavigationMenu viewport={false} className="max-w-full">
      <NavigationMenuList className={cn('gap-2', listClassName)}>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button asChild variant={isRoot ? 'secondary' : 'link'} className="font-medium whitespace-nowrap">
              <Link to="/" onClick={onSelect}>
                All
              </Link>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <NavigationMenuItem key={`loading-${i}`}>
              <NavigationMenuLink asChild>
                <div className="h-4 w-20 rounded-full animate-pulse bg-primary/10"></div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        {!isLoading &&
          categories.map((category, i) => (
            <NavigationMenuItem key={`category-${category}-${i}`}>
              <NavigationMenuLink asChild>
                <Button
                  asChild
                  variant={location.pathname === `/category/${encodeURIComponent(category)}` ? 'secondary' : 'link'}
                  className="capitalize whitespace-nowrap"
                >
                  <Link to={`/category/${encodeURIComponent(category)}`} onClick={onSelect}>
                    {category}
                  </Link>
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavLinkList
