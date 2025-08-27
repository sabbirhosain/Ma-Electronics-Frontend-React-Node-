import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { ToastContainer } from "react-toastify"
import { Route, Routes } from "react-router-dom"
import Dashboard_Page from "./Pages/Dashboard_Page"
import Categories_Page from "./Pages/Categories_Page"
import Purchase_Page from "./Pages/Purchase_Page"
import Products_Page from "./Pages/Products_Page"
import Customer_Page from "./Pages/Customer_Page"
import Customer_Payment_Pages from "./Pages/Customer_Payment_Pages"
import Invoice_Page from "./Pages/Invoice_Page"
import Expense_Page from "./Pages/Expense_Page"
import Settings_Page from "./Pages/Settings_Page"
import './App.css'
import Create_Categories from "./Components/Categories/Create_Categories"
import Update_Categories from "./Components/Categories/Update_Categories"
import Create_Product from "./Components/Products/Create_Product"
import Update_Product from "./Components/Products/Update_Product"
import Create_Purchase from "./Components/Purchase/Create_Purchase"
import Update_Purchase from "./Components/Purchase/Update_Purchase"

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route path="/" element={<Dashboard_Page />} />
        <Route path="/categories-table" element={<Categories_Page />} />
        <Route path="/categories-create" element={<Create_Categories />} />
        <Route path="/categories-update/:id" element={<Update_Categories />} />
        <Route path="/product-table" element={<Products_Page />} />
        <Route path="/product-create" element={<Create_Product />} />
        <Route path="/product-update/:id" element={<Update_Product />} />
        <Route path="/purchase-table" element={<Purchase_Page />} />
        <Route path="/purchase-create" element={<Create_Purchase />} />
        <Route path="/purchase-update/:id" element={<Update_Purchase />} />
        <Route path="/customer-table" element={<Customer_Page />} />
        <Route path="/invoice-table" element={<Invoice_Page />} />
        <Route path="/customer-payment-table" element={<Customer_Payment_Pages />} />
        <Route path="/expense-table" element={<Expense_Page />} />
        <Route path="/profile-settings" element={<Settings_Page />} />
      </Routes>
    </>
  )
}

export default App