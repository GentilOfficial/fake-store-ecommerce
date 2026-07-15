import { Spinner } from '@/components/ui/spinner'

const ProductDetailLoadingState = () => {
  return (
    <section
      className="mx-auto flex w-full max-w-2xl items-center justify-center p-8 text-center"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full border border-dashed bg-background p-3">
          <Spinner className="size-6 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Loading product</h2>
          <p className="text-sm text-muted-foreground">Please wait while we fetch product details.</p>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailLoadingState
