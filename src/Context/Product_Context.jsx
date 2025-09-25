import axios from "axios";
import { createContext, useContext, useState } from "react"
import { show_categories } from "../api_base_routes";

const Product_Context_Provider = createContext()
const Product_Context = ({ children }) => {















  return (
    <Product_Context_Provider.Provider value={{}}>
      {children}
    </Product_Context_Provider.Provider>
  )
}

export default Product_Context

// coustom hooks
export const useProduct_Context = () => {
  return useContext(Product_Context_Provider)
};