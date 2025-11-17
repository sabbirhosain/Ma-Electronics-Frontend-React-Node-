import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Categories_Context from './Context/Categories_Context.jsx'
import UnitType_Context from './Context/UnitType_Context.jsx'
import Product_Context from './Context/Product_Context.jsx'
import Purchase_Context from './Context/Purchase_Context.jsx'
import Invoice_Context from './Context/Invoice_Context.jsx'
import Customer_Payment_Context from './Context/Customer_Payment_Context.jsx'
import Expense_Context from './Context/Expense_Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UnitType_Context>
        <Categories_Context>
          <Product_Context>
            <Purchase_Context>
              <Invoice_Context>
                <Customer_Payment_Context>
                  <Expense_Context>
                    <App />
                  </Expense_Context>
                </Customer_Payment_Context>
              </Invoice_Context>
            </Purchase_Context>
          </Product_Context>
        </Categories_Context>
      </UnitType_Context>
    </BrowserRouter>
  </StrictMode>,
)
