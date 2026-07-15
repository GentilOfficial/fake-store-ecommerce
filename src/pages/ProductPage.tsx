import ProductDetailEmptyState from '@/components/products/empty/ProductDetailEmptyState'
import ProductDetailLoadingState from '@/components/products/loading/ProductDetailLoadingState'
import ProductImageLoadingState from '@/components/products/loading/ProductImageLoadingState'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useProductDetail from '@/hooks/useProductDetail'
import AppLayout from '@/layouts/AppLayout'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const CURRENCY = 'EUR'

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>()
  const { product, isLoading, error } = useProductDetail(productId)
  const [isImageLoading, setIsImageLoading] = useState(true)

  useEffect(() => {
    setIsImageLoading(true)
  }, [productId])

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
      <article className="mx-auto grid w-full max-w-6xl animate-in fade-in-0 zoom-in-95 gap-8 px-4 py-12 duration-500 md:grid-cols-2">
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
          <Badge variant="secondary">{product.category}</Badge>
          <h1 className="text-2xl font-semibold leading-tight md:text-3xl">{product.title}</h1>
          <p className="text-3xl font-bold">
            {CURRENCY} {product.price.toFixed(2)}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">{product.description}</p>

          <Button asChild className="mt-2 w-fit">
            <Link to="/">Back to products</Link>
          </Button>
        </div>
      </article>
    </AppLayout>
  )
}

export default ProductPage
