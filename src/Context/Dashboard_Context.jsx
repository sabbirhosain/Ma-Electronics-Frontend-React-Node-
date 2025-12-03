import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { show_dashboard } from '../api_base_routes';

const Dashboard_Context_Provider = createContext()
const Dashboard_Context = ({ children }) => {

    const [dashboard, setDashboard] = useState({ isLoading: false, data: [], error_message: null })
    const updateDashboardState = (newState) => { setDashboard(prev => ({ ...prev, ...newState })) };

    const fetchDashboardData = async (page) => {
        try {
            updateDashboardState({ isLoading: true, error_message: null });
            const response = await axios.get(show_dashboard, {
                params: { search: dashboard.search, page: page }
            })

            if (response && response.data) {                
                const data = response.data.payload || [];
                updateDashboardState({ data: data });
            }

        } catch (error) {
            console.log(error);
        } finally {
            updateDashboardState({ isLoading: false });
        }
    }

















    return (
        <Dashboard_Context_Provider.Provider value={{ dashboard, updateDashboardState, fetchDashboardData }}>
            {children}
        </Dashboard_Context_Provider.Provider>
    )
}

export default Dashboard_Context;

// coustom hooks
export const useDashboard_Context = () => {
    return useContext(Dashboard_Context_Provider)
};