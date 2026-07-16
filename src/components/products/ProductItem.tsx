import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CURRENCY } from '@/constants/currency'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/product'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({ product, index }: { product: Product; index: number }) => {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const currentCard = cardRef.current

    if (!currentCard) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px 64px 0px',
      },
    )

    observer.observe(currentCard)

    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={cardRef}
      className={cn(
        'h-full transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none',
        isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-[2px]',
      )}
      style={{ transitionDelay: `${Math.min((index % 4) * 35, 105)}ms` }}
    >
      <Card className="relative mx-auto h-full w-full max-w-sm pt-0 transition-transform duration-300 hover:-translate-y-1">
        <div className="relative w-full">
          {isImageLoading && <div className="absolute inset-x-0 top-0 z-30 aspect-video animate-pulse bg-primary/10" />}
          <Badge variant="secondary" className="absolute top-5 right-5 z-40">
            {product.category}
          </Badge>
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            className={cn(
              'relative z-20 aspect-video w-full bg-primary/5 object-contain p-6 transition-transform duration-700',
              isVisible ? 'scale-100' : 'scale-95',
            )}
          />
        </div>
        <CardHeader className="gap-2">
          <CardTitle className="line-clamp-2 leading-tight" title={product.title}>
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pt-0">
          <CardDescription className="line-clamp-3 text-sm leading-relaxed" title={product.description}>
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
          <p className="text-lg font-semibold">
            {CURRENCY} {product.price.toFixed(2)}
          </p>
          <Button asChild>
            <Link to={`/product/${product.id}`}>View Product</Link>
          </Button>
        </CardFooter>
      </Card>
    </article>
  )
}

export default ProductItem
