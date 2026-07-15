import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import ProductsView from '@/components/products/ProductsView'
import useProducts from '@/hooks/useProducts'

const App = () => {
  const { products, isLoading, error } = useProducts()
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto py-8 px-4">
        {isLoading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && <ProductsView products={products} />}
      </main>
      <Footer />
    </div>
  )
}

export default App
