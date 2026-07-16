import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
import { CURRENCY } from '@/constants/currency'
import { useCart } from '@/context/CartContext'
import { ShoppingCart } from 'lucide-react'
import CartItem from './CartItem'

const CartItems = () => {
  const { cart, removeFromCart, clearCart } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full transition hover:bg-primary/10"
          aria-label="Open shopping cart"
        >
          {cart.length > 0 && (
            <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full p-1 font-bold animate-in zoom-in-50">
              {cart.length < 100 ? cart.length : '99+'}
            </Badge>
          )}
          <ShoppingCart className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="border-b">
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>List of items in your shopping cart</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 p-6 overflow-auto">
          {cart.length === 0 ? (
            <small className="text-muted-foreground">Add items to your cart to get started.</small>
          ) : (
            cart.map((item) => (
              <CartItem key={item.cartItemId} item={item} handleRemoveAction={() => removeFromCart(item.cartItemId)} />
            ))
          )}
        </div>
        <SheetFooter className="border-t">
          <p className="w-full flex items-center justify-between gap-1 text-muted-foreground">
            <span>Total items:</span>
            <span>{cart.length}</span>
          </p>
          <p className="w-full flex items-center justify-between gap-1 text-lg font-semibold">
            <span>Total price:</span>
            <span>
              {CURRENCY} {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </span>
          </p>
          <Separator className="my-2" />
          {cart.length > 0 && (
            <Button variant="destructive" onClick={clearCart}>
              Clear Cart
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

export default CartItems
