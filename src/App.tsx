import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1"></main>
      <Footer />
    </div>
  )
}

export default App
