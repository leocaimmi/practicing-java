import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { loadTheme } from './lib/storage.ts'

// Se aplica antes del primer render para evitar el destello de tema claro.
document.documentElement.dataset.theme = loadTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
