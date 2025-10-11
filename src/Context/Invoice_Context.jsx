import axios from "axios";
import { createContext, useContext, useState } from "react";
import { show_invoice } from "../api_base_routes";

const Invoice_Context_Provider = createContext();
const Invoice_Context = ({ children }) => {

    const [invoice, setInvoice] = useState({ isLoading: false, data: [], pagination: null, search: '', from_date: '', to_date: '', status: '', payment_type: '', error_message: null, options: [], options_value: null })
    const updateInvoiceState = (newState) => { setInvoice(prev => ({ ...prev, ...newState })) };

    const fetchInvoiceData = async (page) => {
        try {
            updateInvoiceState({ isLoading: true, error_message: null });
            const response = await axios.get(show_invoice, {
                params: {
                    search: invoice.search,
                    from_date: invoice.from_date,
                    to_date: invoice.to_date,
                    payment_type: invoice.payment_type,
                    status: invoice.status,
                    page: page
                }
            })

            if (response && response.data) {
                const data = response.data.payload || [];
                updateInvoiceState({
                    data: data, pagination: response.data.pagination || null,
                    options: data.map(item => ({ value: item._id, label: item.item_name })),
                });
            }

        } catch (error) {
            console.log(error);
        } finally {
            updateInvoiceState({ isLoading: false });
        }
    }

    // ===== for react select dropdown ==========
    const invoice_options_select = (select) => { updateInvoiceState({ options_value: select }) };
    const invoice_options_search = (search) => { updateInvoiceState({ search: search }) };




    return (
        <Invoice_Context_Provider.Provider value={{ invoice, updateInvoiceState, fetchInvoiceData }}>
            {children}
        </Invoice_Context_Provider.Provider>
    )
}

export default Invoice_Context

// coustom hooks
export const useInvoice_Context = () => {
    return useContext(Invoice_Context_Provider);
};