import ProductsLoadingState from '@/components/products/ProductsLoadingState'
import ProductsView from '@/components/products/ProductsView'
import useProducts from '@/hooks/useProducts'
import AppLayout from '@/layouts/AppLayout'
import { useParams } from 'react-router-dom'

const HomePage = () => {
  const { category } = useParams()
  const { products, isLoading, error } = useProducts(category)

  return (
    <AppLayout>
      {isLoading && <ProductsLoadingState />}
      {error && <p>{error}</p>}
      {!isLoading && !error && <ProductsView products={products} />}
    </AppLayout>
  )
}

export default HomePage
