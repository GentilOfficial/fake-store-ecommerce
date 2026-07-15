import GlobalNetworkErrorProvider from '@/components/provider/GlobalNetworkErrorProvider.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalNetworkErrorProvider>
        <App />
      </GlobalNetworkErrorProvider>
    </BrowserRouter>
  </StrictMode>,
)
