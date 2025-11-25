import axios from "axios";
import { createContext, useContext, useState } from "react";
import { delete_products, show_products } from "../api_base_routes";
import { useCategories_Context } from "./Categories_Context";
import { toast } from "react-toastify";

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


  const [products_filter, setProducts_Filter] = useState({ isLoading: false, data: [], pagination: null, search: '', error_message: null, options: [], options_value: null })
  const updateProductsFilterState = (newState) => { setProducts(prev => ({ ...prev, ...newState })) };


  const deleteProduct = async (id) => {
    try {
      const confirm_delete = window.confirm('Are You Sure ? You Want to Delete!');
      if (!confirm_delete) return;

      updateProductState({ isLoading: true });
      const response = await axios.delete(`${delete_products}${id}`);
      if (response && response.data && response.data.success) {
        fetchProductsData(1)
        toast.success(response.data.message || 'Delete Success.')
      } else {
        alert(response.data.message || 'Field Error')
      }

    } catch (error) {
      console.log('Internal Server Error', error);

    } finally {
      updateProductState({ isLoading: false });
    }
  }



  return (
    <Product_Context_Provider.Provider value={{ products, updateProductState, fetchProductsData, products_options_select, products_options_search, deleteProduct }}>
      {children}
    </Product_Context_Provider.Provider>
  );
};

export default Product_Context;

// coustom hooks
export const useProduct_Context = () => {
  return useContext(Product_Context_Provider);
};
