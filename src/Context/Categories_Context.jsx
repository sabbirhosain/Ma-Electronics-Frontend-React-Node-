import { createContext, useContext, useState } from "react"
import { show_categories } from "../api_base_routes";
import axios from "axios";

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





    return (
        <Categories_Context_Provider.Provider value={{ categories, updateCategoriesState, fetchCategoriesData, categories_options_select, categories_options_search }}>
            {children}
        </Categories_Context_Provider.Provider>
    )
}

export default Categories_Context

// coustom hooks
export const useCategories_Context = () => {
    return useContext(Categories_Context_Provider)
};