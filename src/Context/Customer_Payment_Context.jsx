import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { show_customer_payment } from "../api_base_routes";

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



    return (
        <Customer_Payment_Context_Provider.Provider value={{ customer_payment, updateCustomerPaymentState, fetchCustomerPaymentData }}>
            {children}
        </Customer_Payment_Context_Provider.Provider>
    )
}

export default Customer_Payment_Context
// coustom hooks
export const useCustomer_Payment_Context = () => {
    return useContext(Customer_Payment_Context_Provider);
};