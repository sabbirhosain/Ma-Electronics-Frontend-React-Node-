import axios from "axios";
import { createContext, useContext, useState } from "react";
import { show_products } from "../api_base_routes";
import { useCategories_Context } from "./Categories_Context";

const Product_Context_Provider = createContext();
const Product_Context = ({ children }) => {

  const { categories } = useCategories_Context()
  const [products, setProducts] = useState({ isLoading: false, data: [], pagination: null, search: '', status: '', error_message: null, options: [], options_value: null })
  const updateProductState = (newState) => { setProducts(prev => ({ ...prev, ...newState })) };

  const fetchProductsData = async (page) => {
    try {
      updateProductState({ isLoading: true, error_message: null });
      const response = await axios.get(show_products, {
        params: {
          search: products.search,
          status: products.status,
          categories_id: categories.options_value?.value,
          page: page
        }
      })

      if (response && response.data) {
        const data = response.data.payload || [];
        updateProductState({
          data: data, pagination: response.data.pagination || null,
          options: data.map(item => ({ value: item._id, label: item.item_name })),
        });
      }

    } catch (error) {
      console.log(error);
    } finally {
      updateProductState({ isLoading: false });
    }
  }

  // ===== for react select dropdown ==========
  const products_options_select = (select) => { updateProductState({ options_value: select }) };
  const products_options_search = (search) => { updateProductState({ search: search }) };





  return (
    <Product_Context_Provider.Provider value={{ products, updateProductState, fetchProductsData, products_options_select, products_options_search }}>
      {children}
    </Product_Context_Provider.Provider>
  );
};

export default Product_Context;

// coustom hooks
export const useProduct_Context = () => {
  return useContext(Product_Context_Provider);
};
