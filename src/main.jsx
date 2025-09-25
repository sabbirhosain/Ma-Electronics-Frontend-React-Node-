import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Categories_Context from './Context/Categories_Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Categories_Context>
        <App />
      </Categories_Context>
    </BrowserRouter>
  </StrictMode>,
)
