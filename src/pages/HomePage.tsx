import ProductsLoadingState from '@/components/products/ProductsLoadingState'
import ProductsView from '@/components/products/ProductsView'
import useProducts from '@/hooks/useProducts'
import { useParams } from 'react-router-dom'

const HomePage = () => {
  const { category } = useParams()
  const { products, isLoading, error } = useProducts(category)

  return (
    <main className="mx-auto flex-1 max-w-6xl px-4 py-8">
      {isLoading && <ProductsLoadingState />}
      {error && <p>{error}</p>}
      {!isLoading && !error && <ProductsView products={products} />}
    </main>
  )
}

export default HomePage
