import { createContext, useContext, useState } from "react"
import { delete_categories, show_categories } from "../api_base_routes";
import axios from "axios";
import { toast } from "react-toastify";

const Categories_Context_Provider = createContext()
const Categories_Context = ({ children }) => {

    const [categories, setCategories] = useState({ isLoading: false, data: [], pagination: null, search: '', error_message: null, options: [], options_value: null })
    const updateCategoriesState = (newState) => { setCategories(prev => ({ ...prev, ...newState })) };

    const fetchCategoriesData = async (page) => {
        try {
            updateCategoriesState({ isLoading: true, error_message: null });
            const response = await axios.get(show_categories, {
                params: { search: categories.search, page: page }
            })

            if (response && response.data) {
                const data = response.data.payload || [];
                updateCategoriesState({
                    data: data, pagination: response.data.pagination || null,
                    options: data.map(item => ({ value: item._id, label: item.categories_name })),
                });
            }

        } catch (error) {
            console.log(error);
        } finally {
            updateCategoriesState({ isLoading: false });
        }
    }

    // ===== for react select dropdown ==========
    const categories_options_select = (select) => { updateCategoriesState({ options_value: select }) };
    const categories_options_search = (search) => { updateCategoriesState({ search: search }) };

    const deleteCategory = async (id) => {
        try {
            const confirm_delete = window.confirm('Are You Sure ? You Want to Delete!');
            if (!confirm_delete) return;

            updateCategoriesState({ isLoading: true });
            const response = await axios.delete(`${delete_categories}${id}`);
            if (response && response.data && response.data.success) {
                fetchCategoriesData(1)
                toast.success(response.data.message || 'Delete Success.')
            } else {
                alert(response.data.message || 'Field Error')
            }

        } catch (error) {
            console.log('Internal Server Error', error);

        } finally {
            updateCategoriesState({ isLoading: false });
        }
    }




    return (
        <Categories_Context_Provider.Provider value={{ categories, updateCategoriesState, fetchCategoriesData, categories_options_select, categories_options_search, deleteCategory }}>
            {children}
        </Categories_Context_Provider.Provider>
    )
}

export default Categories_Context

// coustom hooks
export const useCategories_Context = () => {
    return useContext(Categories_Context_Provider)
};