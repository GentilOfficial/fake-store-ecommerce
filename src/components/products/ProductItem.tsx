import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Product } from '@/types/product'
import { useState } from 'react'

const CURRENCY: string = 'EUR'

const ProductItem = ({ product }: { product: Product }) => {
  const [isImageLoading, setIsImageLoading] = useState(true)

  return (
    <Card className="relative mx-auto h-full w-full max-w-sm pt-0">
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
          className="relative z-20 aspect-video w-full bg-primary/5 object-contain p-6"
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
        <Button type="button">View Product</Button>
      </CardFooter>
    </Card>
  )
}

export default ProductItem
