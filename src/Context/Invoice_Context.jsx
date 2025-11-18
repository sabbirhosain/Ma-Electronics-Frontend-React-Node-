import axios from "axios";
import { createContext, useContext, useState } from "react";
import { delete_invoice, show_invoice, show_invoice_filter } from "../api_base_routes";
import { toast } from "react-toastify";

const Invoice_Context_Provider = createContext();
const Invoice_Context = ({ children }) => {

    const [invoice, setInvoice] = useState({ isLoading: false, data: [], pagination: null, search: '', from_date: '', to_date: '', status: '', error_message: null })
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
                updateInvoiceState({ data: data, pagination: response.data.pagination || null });
            }

        } catch (error) {
            console.log(error);
        } finally {
            updateInvoiceState({ isLoading: false });
        }
    }

    // === invoice filter ===

    const [invoice_filter, setInvoice_Filter] = useState({ isLoading: false, data: [], pagination: null, search: '', error_message: null, options: [], options_value: null })
    const updateInvoiceFilterState = (newState) => { setInvoice_Filter(prev => ({ ...prev, ...newState })) };

    const fetchInvoiceFilterData = async (page) => {
        try {
            updateInvoiceFilterState({ isLoading: true, error_message: null });
            const response = await axios.get(show_invoice_filter, {
                params: { search: invoice.search, page: page }
            })

            if (response && response.data) {
                const data = response.data.payload || [];

                updateInvoiceFilterState({
                    data: data, pagination: response.data.pagination || null,
                    options: data.map(invoice => ({ value: invoice._id, label: invoice.invoice_details })),
                });
            }

        } catch (error) {
            console.log(error);
        } finally {
            updateInvoiceFilterState({ isLoading: false });
        }
    }

    // ===== for react select dropdown ==========
    const invoice_options_select = (select) => { updateInvoiceFilterState({ options_value: select }) };
    const invoice_options_search = (search) => { updateInvoiceFilterState({ search: search }) };


    const deleteInvoice = async (id) => {
        try {
            const confirm_delete = window.confirm('Are You Sure ? You Want to Delete!');
            if (!confirm_delete) return;

            updateInvoiceState({ isLoading: true });
            const response = await axios.delete(`${delete_invoice}${id}`);
            if (response && response.data && response.data.success) {
                fetchInvoiceData(1)
                toast.success(response.data.message || 'Delete Success.')
            } else {
                alert(response.data.message || 'Field Error')
            }

        } catch (error) {
            console.log('Internal Server Error', error);

        } finally {
            updateInvoiceState({ isLoading: false });
        }
    }



    return (
        <Invoice_Context_Provider.Provider value={{ invoice, updateInvoiceState, fetchInvoiceData, invoice_filter, updateInvoiceFilterState, fetchInvoiceFilterData, invoice_options_select, invoice_options_search, deleteInvoice }}>
            {children}
        </Invoice_Context_Provider.Provider>
    )
}

export default Invoice_Context

// coustom hooks
export const useInvoice_Context = () => {
    return useContext(Invoice_Context_Provider);
};