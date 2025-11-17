import { createContext, useContext, useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";

const Expense_Context_Provider = createContext()

const Expense_Context = ({ children }) => {
    return (
        <Expense_Context_Provider.Provider value={{}}>
            {children}
        </Expense_Context_Provider.Provider>
    )
}

export default Expense_Context

// coustom hooks
export const useExpense_Context = () => {
    return useContext(Expense_Context_Provider)
};