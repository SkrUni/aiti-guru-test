import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initAuthFromStorage } from './store/authStore'

// Synchronously restore auth state before first render
// so ProtectedRoute sees the correct user immediately
initAuthFromStorage()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
