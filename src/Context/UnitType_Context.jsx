import axios from "axios";
import { createContext, useContext, useState } from "react"
import { show_unittype } from "../api_base_routes";

const UnitType_Context_Provider = createContext()
const UnitType_Context = ({ children }) => {

    const [unit_types, setUnit_Types] = useState({ isLoading: false, data: [], pagination: null, search: '', error_message: null, options: [], options_value: null })
    const updateUnitTypesState = (newState) => { setUnit_Types(prev => ({ ...prev, ...newState })) };

    const fetchUnitTypesData = async (page) => {
        try {
            updateUnitTypesState({ isLoading: true, error_message: null });
            const response = await axios.get(show_unittype, {
                params: { search: unit_types.search, page: page }
            })

            if (response && response.data) {
                const data = response.data.payload || [];
                updateUnitTypesState({
                    data: data, pagination: response.data.pagination || null,
                    options: data.map(item => ({ value: item._id, label: item.unit_name })),
                });
            }

        } catch (error) {
            console.log(error);
        } finally {
            updateUnitTypesState({ isLoading: false });
        }
    }

    // ===== for react select dropdown ==========
    const units_options_select = (select) => { updateUnitTypesState({ options_value: select }) };
    const units_options_search = (search) => { updateUnitTypesState({ search: search }) };






    return (
        <UnitType_Context_Provider.Provider value={{ unit_types, updateUnitTypesState, fetchUnitTypesData, units_options_select, units_options_search }}>
            {children}
        </UnitType_Context_Provider.Provider>
    )
}

export default UnitType_Context
// coustom hooks
export const useUnitType_Context = () => {
    return useContext(UnitType_Context_Provider)
};