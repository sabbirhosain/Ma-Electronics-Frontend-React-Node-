import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";
import CryptoJS from 'crypto-js'

const Auth_Context_Provider = createContext()
const Auth_Context = ({ children }) => {

    const [auth, setAuth] = useState({ user: null, access: null, refresh: null, store_name: null });
    const SECRET_KEY = import.meta.env.VITE_CRYPTOJS_SECRET_KEY || 'YourFallbackSecretKey';
    const [authLoading, setAuthLoading] = useState(true);

    const encryptData = (data) => {
        try {
            if (!data) { console.log("No data found to encrypt."); return null }
            return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
        } catch (error) {
            console.error("Encryption error:", error);
            return null;
        }
    };

    // decrypt cookie data
    const decryptData = (encryptedData) => {
        try {
            if (!encryptedData) { console.log("No data found to decrypt."); return null }
            const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error('Decryption failed:', error);
            return null;
        }
    };

    const isTokenExpired = (token) => {
        try {
            if (!token) return true;
            const decoded = jwtDecode(token);
            if (!decoded || !decoded.exp) return true;
            const now = Date.now() / 1000;
            return decoded.exp < now;

        } catch (error) {
            console.log(error);
            return true;
        }
    };

    useEffect(() => {
        const token = Cookies.get('root');
        if (!token) {
            setAuth({ user: null, access: null, refresh: null, store_name: null });
            setAuthLoading(false);
            return;
        }

        const data = decryptData(token);
        if (data && data.access && !isTokenExpired(data.access)) {
            setAuth({ user: data.user, access: data.access, refresh: data.refresh, store_name: data.store_name });
        } else {
            Cookies.remove('root');
            setAuth({ user: null, access: null, refresh: null, store_name: null });
        }
        setAuthLoading(false);
    }, []);

    
    return (
        <Auth_Context_Provider.Provider value={{ encryptData, decryptData, auth, isTokenExpired, setAuth, authLoading }}>
            {children}
        </Auth_Context_Provider.Provider>
    )
}

export default Auth_Context;

// coustom hooks
export const useAuth_Context = () => {
    return useContext(Auth_Context_Provider)
};