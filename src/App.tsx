import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import HomePage from '@/pages/HomePage'
import { Navigate, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
