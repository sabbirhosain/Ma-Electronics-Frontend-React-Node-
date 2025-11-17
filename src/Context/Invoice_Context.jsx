import axios from "axios";
import { createContext, useContext, useState } from "react";
import { show_invoice } from "../api_base_routes";

const Invoice_Context_Provider = createContext();
const Invoice_Context = ({ children }) => {

    const [invoice, setInvoice] = useState({ isLoading: false, data: [], pagination: null, search: '', from_date: '', to_date: '', status: '', error_message: null, options: [], options_value: null })
    const updateInvoiceState = (newState) => { setInvoice(prev => ({ ...prev, ...newState })) };

    const fetchInvoiceData = async (page) => {
        try {
            updateInvoiceState({ isLoading: true, error_message: null });
            const response = await axios.get(show_invoice, {
                params: {
                    search: invoice.search,
                    from_date: invoice.from_date,
                    to_date: invoice.to_date,
                    status: invoice.status,
                    page: page
                }
            })

            if (response && response.data) {
                const data = response.data.payload || [];
                console.log(data);
                
                updateInvoiceState({
                    data: data, pagination: response.data.pagination || null,
                    options: data.map(invoice => ({ value: invoice._id, label: invoice.invoice_no + ' - ' + invoice.customer_name + ' - ' + invoice.customer_phone + ' - ' + invoice.current_due + ' ' + invoice.currency_type })),
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
        <Invoice_Context_Provider.Provider value={{ invoice, updateInvoiceState, fetchInvoiceData, invoice_options_select, invoice_options_search }}>
            {children}
        </Invoice_Context_Provider.Provider>
    )
}

export default Invoice_Context

// coustom hooks
export const useInvoice_Context = () => {
    return useContext(Invoice_Context_Provider);
};