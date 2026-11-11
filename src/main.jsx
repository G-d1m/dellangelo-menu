import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/commissioner/400.css'
import '@fontsource/commissioner/500.css'
import '@fontsource/commissioner/600.css'
import '@fontsource/commissioner/700.css'
import '@fontsource/didact-gothic/400.css'
import '@fontsource/bodoni-moda/400.css'

import './styles/base.css'
import './styles/animations.css'
import './styles/intro.css'
import './styles/menu.css'
import './styles/mobile.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
