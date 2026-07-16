import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useWishlist } from '@/context/WishlistContext'
import { Heart } from 'lucide-react'
import WishlistItem from './WishlistItem'

const WishlistSheet = () => {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full transition hover:bg-primary/10"
          aria-label="Open wishlist"
        >
          <Heart className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="border-b">
          <SheetTitle>Wishlist</SheetTitle>
          <SheetDescription>List of items in your wishlist</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 p-6 overflow-auto">
          {wishlist.length === 0 ? (
            <small className="text-muted-foreground">Add items to your wishlist to get started.</small>
          ) : (
            wishlist.map((item) => (
              <WishlistItem key={item.id} item={item} handleRemoveAction={() => toggleWishlist(item)} />
            ))
          )}
        </div>
        <SheetFooter className="border-t">
          {wishlist.length > 0 && (
            <Button variant="destructive" onClick={clearWishlist}>
              Clear Wishlist
            </Button>
          )}
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default WishlistSheet
