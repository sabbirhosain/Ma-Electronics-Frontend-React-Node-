import { createContext, useContext, useState } from "react"
import { delete_expense, show_expense } from "../api_base_routes";
import { toast } from "react-toastify";
import axios from "axios";

const Expense_Context_Provider = createContext()

const Expense_Context = ({ children }) => {
    const [expense, setExpense] = useState({ isLoading: false, data: [], pagination: null, search: '', from_date: '', to_date: '', error_message: null })
    const updateExpenseState = (newState) => { setExpense(prev => ({ ...prev, ...newState })) };

    const fetchExpenseData = async (page) => {
        try {
            updateExpenseState({ isLoading: true, error_message: null });
            const response = await axios.get(show_expense, {
                params: {
                    search: expense.search,
                    from_date: expense.from_date,
                    to_date: expense.to_date,
                    page: page
                }
            })

            if (response && response.data) {
                const data = response.data.payload || [];
                updateExpenseState({ data: data, pagination: response.data.pagination || null });
            }

        } catch (error) {
            console.log(error);
        } finally {
            updateExpenseState({ isLoading: false });
        }
    }

    const deleteExpense = async (id) => {
        try {
            const confirm_delete = window.confirm('Are You Sure ? You Want to Delete!');
            if (!confirm_delete) return;

            updateExpenseState({ isLoading: true });
            const response = await axios.delete(`${delete_expense}${id}`);
            if (response && response.data && response.data.success) {
                fetchExpenseData(1)
                toast.success(response.data.message || 'Delete Success.')
            } else {
                alert(response.data.message || 'Field Error')
            }

        } catch (error) {
            console.log('Internal Server Error', error);

        } finally {
            updateExpenseState({ isLoading: false });
        }
    }





    return (
        <Expense_Context_Provider.Provider value={{ expense, fetchExpenseData, deleteExpense }}>
            {children}
        </Expense_Context_Provider.Provider>
    )
}

export default Expense_Context

// coustom hooks
export const useExpense_Context = () => {
    return useContext(Expense_Context_Provider)
};