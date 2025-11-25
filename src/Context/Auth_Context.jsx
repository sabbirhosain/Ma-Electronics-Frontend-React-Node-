import React, { createContext, useContext, useState } from 'react'

const Auth_Context_Provider = createContext()
const Auth_Context = ({ children }) => {

    const [login_user, setLogin_User] = useState({ email: "", password: "" })



















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