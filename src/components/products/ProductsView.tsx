import ProductItem from '@/components/products/ProductItem'
import ProductsEmptyState from '@/components/products/ProductsEmptyState'
import type { Product } from '@/types/product'
import { useLocation } from 'react-router-dom'

const ProductsView = ({ products }: { products: Product[] }) => {
  const { pathname } = useLocation()

  if (products.length === 0) {
    return <ProductsEmptyState showResetAction={pathname !== '/'} />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductItem key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}

export default ProductsView
