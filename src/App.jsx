import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { useAuth_Context } from "./Context/Auth_Context"
import axios from "axios"
import { ToastContainer } from "react-toastify"
import { Route, Routes } from "react-router-dom"
import Dashboard_Page from "./Pages/Dashboard_Page"
import Categories_Page from "./Pages/Categories_Page"
import Purchase_Page from "./Pages/Purchase_Page"
import Products_Page from "./Pages/Products_Page"
import Invoice_Page from "./Pages/Invoice_Page"
import Expense_Page from "./Pages/Expense_Page"
import Settings_Page from "./Pages/Settings_Page"
import Customer_Payment_Pages from "./Pages/Customer_Payment_Pages"
import Create_Categories from "./Components/Categories/Create_Categories"
import Update_Categories from "./Components/Categories/Update_Categories"
import Create_Product from "./Components/Products/Create_Product"
import Update_Product from "./Components/Products/Update_Product"
import Create_Purchase from "./Components/Purchase/Create_Purchase"
import Update_Purchase from "./Components/Purchase/Update_Purchase"
import Unit_Type_page from "./Pages/Unit_Type_page"
import Create_Unit_Types from "./Components/Unit_Types/Create_Unit_Types"
import Update_Unit_Types from "./Components/Unit_Types/Update_Unit_Types"
import Create_Invoice from "./Components/Invoice/Create_Invoice"
import View_Invoice from "./Components/Invoice/View_Invoice"
import Update_Invoice from "./Components/Invoice/Update_Invoice"
import Create_Customer_Payment from "./Components/Customer_Payment/Create_Customer_Payment"
import Update_Customer_Payment from "./Components/Customer_Payment/Update_Customer_Payment"
import Create_Expense from "./Components/Expense/Create_Expense"
import Update_Expense from "./Components/Expense/Update_Expense"
import Protected_Route from "./Layout/Protected_Route"
import Login_Page from "./Pages/Login_Page"
import './App.css'

const App = () => {
  const { auth } = useAuth_Context()
  axios.defaults.headers.common['Authorization'] = `Bearer ${auth.access}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route path="/admin/login" element={<Login_Page />} />
        <Route element={<Protected_Route />}>
          <Route path="/" element={<Dashboard_Page />} />
          <Route path="/unittype-table" element={<Unit_Type_page />} />
          <Route path="/unittype-create" element={<Create_Unit_Types />} />
          <Route path="/unittype-update/:id" element={<Update_Unit_Types />} />
          <Route path="/categories-table" element={<Categories_Page />} />
          <Route path="/categories-create" element={<Create_Categories />} />
          <Route path="/categories-update/:id" element={<Update_Categories />} />
          <Route path="/product-table" element={<Products_Page />} />
          <Route path="/product-create" element={<Create_Product />} />
          <Route path="/product-update/:id" element={<Update_Product />} />
          <Route path="/purchase-table" element={<Purchase_Page />} />
          <Route path="/purchase-create" element={<Create_Purchase />} />
          <Route path="/purchase-update/:id" element={<Update_Purchase />} />
          <Route path="/invoice-table" element={<Invoice_Page />} />
          <Route path="/invoice-create" element={<Create_Invoice />} />
          <Route path="/invoice-view/:id" element={<View_Invoice />} />
          <Route path="/invoice-update/:id" element={<Update_Invoice />} />
          <Route path="/customer-payment-create" element={<Create_Customer_Payment />} />
          <Route path="/customer-payment-update/:id" element={<Update_Customer_Payment />} />
          <Route path="/customer-payment-table" element={<Customer_Payment_Pages />} />
          <Route path="/expense-table" element={<Expense_Page />} />
          <Route path="/expense-create" element={<Create_Expense />} />
          <Route path="/expense-update/:id" element={<Update_Expense />} />
          <Route path="/profile-settings" element={<Settings_Page />} />
        </Route>
      </Routes>
    </>
  )
}

export default App