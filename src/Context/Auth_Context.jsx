import React, { createContext, useContext } from 'react'

const Auth_Context_Provider = createContext()
const Auth_Context = ({ children }) => {



















    return (
        <Auth_Context_Provider.Provider value={{}}>
            {children}
        </Auth_Context_Provider.Provider>
    )
}

export default Auth_Context;

// coustom hooks
export const useAuth_Context = () => {
    return useContext(Auth_Context_Provider)
};