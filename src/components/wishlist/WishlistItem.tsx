import { Button } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'
import { Spinner } from '@/components/ui/spinner'
import type { Product } from '@/types/product'
import { HeartCrack } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const WishlistItem = ({ item, handleRemoveAction }: { item: Product; handleRemoveAction: () => void }) => {
  const [isRemoving, setIsRemoving] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(handleRemoveAction, 500)
  }

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ${
        isRemoving ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'
      }`}
    >
      <article
        className={`relative flex items-center gap-5 rounded-3xl bg-primary/5 p-5 transition-all duration-500 ${
          isRemoving ? 'scale-95 grayscale' : ''
        }`}
      >
        {isRemoving && (
          <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-3xl bg-background/70 backdrop-blur-sm">
            <Spinner />
            <span className="text-sm font-medium">Removing...</span>
          </div>
        )}
        <div
          className={`relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background ${
            !isImageLoaded ? 'animate-pulse' : ''
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            className={`size-16 object-contain p-2 transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 font-medium">{item.title}</p>
          <SheetClose asChild>
            <Button variant="link" asChild className="p-0">
              <Link to={`/product/${item.id}`}>View product</Link>
            </Button>
          </SheetClose>
        </div>
        <Button
          variant="ghost"
          size="icon"
          disabled={isRemoving}
          className="text-destructive hover:bg-destructive/10"
          onClick={handleRemove}
          aria-label={`Remove ${item.title} from wishlist`}
        >
          <HeartCrack className="size-4" />
        </Button>
      </article>
    </div>
  )
}

export default WishlistItem
