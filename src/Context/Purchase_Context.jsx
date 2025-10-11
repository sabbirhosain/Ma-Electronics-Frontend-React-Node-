import { createContext, useContext, useState } from "react";
import { useProduct_Context } from "./Product_Context";
import { show_purchase } from "../api_base_routes";
import axios from "axios";

const Purchase_Context_Provider = createContext();
const Purchase_Context = ({ children }) => {

    const { products } = useProduct_Context()
    const [purchase, setPurchase] = useState({ isLoading: false, data: [], pagination: null, search: '', from_date: '', to_date: '', product_id: '', error_message: null })
    const updatePurchaseState = (newState) => { setPurchase(prev => ({ ...prev, ...newState })) };

    const fetchPurchaseData = async (page) => {
        try {
            updatePurchaseState({ isLoading: true, error_message: null });
            const response = await axios.get(show_purchase, {
                params: {
                    search: purchase.search,
                    from_date: purchase.from_date,
                    to_date: purchase.to_date,
                    product_id: products.options_value?.value,
                    page: page
                }
            })

            if (response && response.data) {
                const data = response.data.payload || [];
                updatePurchaseState({ data: data, pagination: response.data.pagination || null });
            }

        } catch (error) {
            console.log(error);
        } finally {
            updatePurchaseState({ isLoading: false });
        }
    }



    return (
        <Purchase_Context_Provider.Provider value={{ purchase, updatePurchaseState, fetchPurchaseData }}>
            {children}
        </Purchase_Context_Provider.Provider>
    )
}

export default Purchase_Context


// coustom hooks
export const usePurchase_Context = () => {
    return useContext(Purchase_Context_Provider);
};