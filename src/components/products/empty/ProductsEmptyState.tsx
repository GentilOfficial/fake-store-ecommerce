import { Button } from '@/components/ui/button'
import { SearchX } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductsEmptyState = ({ showResetAction }: { showResetAction: boolean }) => {
  return (
    <section className="mx-auto flex w-full items-center justify-center p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-background p-3 border-dashed border">
          <SearchX className="size-6 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">No products found</h2>
          <p className="text-sm text-muted-foreground">Try changing category or go back to the full product list.</p>
        </div>
        {showResetAction && (
          <Button asChild type="button">
            <Link to="/">Show all products</Link>
          </Button>
        )}
      </div>
    </section>
  )
}

export default ProductsEmptyState
