import { Button } from '@/components/ui/button'
import { TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductDetailEmptyState = ({ message }: { message: string }) => {
  return (
    <section className="mx-auto flex w-full max-w-2xl items-center justify-center p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full border border-dashed bg-background p-3">
          <TriangleAlert className="size-6 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Product unavailable</h2>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <Button asChild>
          <Link to="/">Back to products</Link>
        </Button>
      </div>
    </section>
  )
}

export default ProductDetailEmptyState
