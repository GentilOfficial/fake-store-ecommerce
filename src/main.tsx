import GlobalNetworkErrorProvider from '@/components/provider/GlobalNetworkErrorProvider.tsx'
import AuthProvider from '@/providers/AuthProvider.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalNetworkErrorProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </GlobalNetworkErrorProvider>
    </BrowserRouter>
  </StrictMode>,
)
