import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

type NavLinkListProps = {
  categories: string[]
  isLoading: boolean
  error: string | null
  listClassName?: string
  onSelect?: () => void
}

const NavLinkList = ({ categories, isLoading, error, listClassName, onSelect }: NavLinkListProps) => {
  if (isLoading) return <Spinner className="mx-auto" />

  if (error) return <div>Error: {error}</div>

  return (
    <NavigationMenu viewport={false} className="max-w-full">
      <NavigationMenuList className={cn('gap-2', listClassName)}>
        {categories.map((category, i) => (
          <NavigationMenuItem key={`category-${category}-${i}`}>
            <NavigationMenuLink asChild>
              <Button variant="link" type="button" className="capitalize" onClick={onSelect}>
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
