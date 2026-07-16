import ProductDetailEmptyState from '@/components/products/empty/ProductDetailEmptyState'
import ProductDetailLoadingState from '@/components/products/loading/ProductDetailLoadingState'
import ProductImageLoadingState from '@/components/products/loading/ProductImageLoadingState'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CURRENCY } from '@/constants/currency'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import useProductDetail from '@/hooks/useProductDetail'
import AppLayout from '@/layouts/AppLayout'
import { AlertCircle, ArrowLeft, Check, HeartCrack, HeartPlus, ShoppingBasket } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>()
  const { product, isLoading, error } = useProductDetail(productId)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const productInWishlist = product ? isInWishlist(product.id) : false

  const handleWishlistToggle = () => {
    if (!product || !isAuthenticated) return
    toggleWishlist(product)
  }

  useEffect(() => {
    setIsImageLoading(true)
  }, [productId])

  const handleAddToCart = () => {
    if (!product || !isAuthenticated) return

    addToCart(product)
    setIsAddedToCart(true)

    setTimeout(() => {
      setIsAddedToCart(false)
    }, 2000)
  }

  if (isLoading) {
    return (
      <AppLayout>
        <ProductDetailLoadingState />
      </AppLayout>
    )
  }

  if (error || !product) {
    return (
      <AppLayout>
        <ProductDetailEmptyState message={error ?? 'Product not found.'} />
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <Button asChild className="mt-2 w-fit" variant="link">
        <Link to="/">
          <ArrowLeft className="size-4" />
          <span>Back to products</span>
        </Link>
      </Button>
      <article className="mx-auto grid w-full max-w-6xl animate-in fade-in-0 zoom-in-95 gap-8 px-4 py-6 duration-500 md:grid-cols-2">
        <div className="relative animate-in rounded-3xl bg-primary/5 p-6 duration-500">
          <div className="relative h-80 md:h-96">
            {isImageLoading && <ProductImageLoadingState />}
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              decoding="async"
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
              className={`h-full w-full object-contain transition-opacity duration-500 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>
        </div>

        <div className="flex animate-in flex-col gap-5 delay-100 duration-500">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary">{product.category}</Badge>
            <Button
              variant={productInWishlist ? 'destructive' : 'secondary'}
              size="icon"
              aria-label={productInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              onClick={handleWishlistToggle}
              disabled={!isAuthenticated}
            >
              {productInWishlist ? <HeartCrack /> : <HeartPlus />}
            </Button>
          </div>
          <h1 className="text-2xl font-semibold leading-tight md:text-3xl">{product.title}</h1>
          <p className="text-3xl font-bold">
            {CURRENCY} {product.price.toFixed(2)}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">{product.description}</p>

          {!isAuthenticated && (
            <p className="text-sm text-destructive flex items-center gap-2">
              <AlertCircle className="size-4" />
              <span>You must be logged in to add items to the cart/wishlist.</span>
            </p>
          )}

          <Button className="mt-2 w-fit" onClick={handleAddToCart} disabled={isAddedToCart || !isAuthenticated}>
            {isAddedToCart ? (
              <>
                <Check className="size-4" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBasket className="size-4" />
                <span>Add to Cart</span>
              </>
            )}
          </Button>
        </div>
      </article>
    </AppLayout>
  )
}

export default ProductPage
