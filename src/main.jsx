import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Categories_Context from './Context/Categories_Context.jsx'
import UnitType_Context from './Context/UnitType_Context.jsx'
import Product_Context from './Context/Product_Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UnitType_Context>
        <Categories_Context>
          <Product_Context>
            <App />
          </Product_Context>
        </Categories_Context>
      </UnitType_Context>
    </BrowserRouter>
  </StrictMode>,
)
