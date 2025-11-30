import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { delete_customer_payment, show_customer_payment } from "../api_base_routes";

const Customer_Payment_Context_Provider = createContext();

const Customer_Payment_Context = ({ children }) => {

    const [customer_payment, setCustomerPayment] = useState({ isLoading: false, data: [], pagination: null, search: '', error_message: null })
    const updateCustomerPaymentState = (newState) => { setCustomerPayment(prev => ({ ...prev, ...newState })) };

    const fetchCustomerPaymentData = async (page) => {
        try {
            updateCustomerPaymentState({ isLoading: true, error_message: null });
            const response = await axios.get(show_customer_payment, {
                params: { search: customer_payment.search, page: page }
            })

            if (response && response.data) {
                const data = response.data.payload || [];
                updateCustomerPaymentState({
                    data: data, pagination: response.data.pagination || null,
                });
            }

        } catch (error) {
            console.log(error);
        } finally {
            updateCustomerPaymentState({ isLoading: false });
        }
    }

    const deleteCustomerPayment = async (id) => {
        try {
            const confirm_delete = window.confirm('Are You Sure ? You Want to Delete!');
            if (!confirm_delete) return;

            updateCustomerPaymentState({ isLoading: true });
            const response = await axios.delete(`${delete_customer_payment}${id}`);
            if (response && response.data && response.data.success) {
                fetchCustomerPaymentData(1)
                toast.success(response.data.message || 'Delete Success.')
            } else {
                alert(response.data.message || 'Field Error')
            }

        } catch (error) {
            console.log('Internal Server Error', error);

        } finally {
            updateCustomerPaymentState({ isLoading: false });
        }
    }


    return (
        <Customer_Payment_Context_Provider.Provider value={{ customer_payment, updateCustomerPaymentState, fetchCustomerPaymentData, deleteCustomerPayment }}>
            {children}
        </Customer_Payment_Context_Provider.Provider>
    )
}

export default Customer_Payment_Context
// coustom hooks
export const useCustomer_Payment_Context = () => {
    return useContext(Customer_Payment_Context_Provider);
};