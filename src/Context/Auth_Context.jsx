import React, { createContext, useContext, useEffect, useState } from 'react'
import { logout_users, show_store_name } from '../api_base_routes';
import { jwtDecode } from 'jwt-decode';
import CryptoJS from 'crypto-js'
import Cookies from "js-cookie";
import axios from 'axios';

const Auth_Context_Provider = createContext()
const Auth_Context = ({ children }) => {

    const [auth, setAuth] = useState({ user_id: null, access: null });
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
            setAuth({ user_id: null, access: null });
            setAuthLoading(false);
            return;
        }

        const data = decryptData(token);
        if (data && data.access && !isTokenExpired(data.access)) {
            setAuth({ user_id: data.user, access: data.access });
        } else {
            Cookies.remove('root');
            setAuth({ user_id: null, access: null });
        }
        setAuthLoading(false);
    }, []);

    const logout_function = async () => {
        const confirm_logout = window.confirm('Are You Sure ? You Want to Logout!');
        if (!confirm_logout) return;
        try {
            const response = await axios.post(logout_users, {
                access: auth.access
            });

            if (response && response.data && response.data.success) {
                Cookies.remove("root");
                setAuth({ user_id: null, access: null });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [store_setting, setStore_Setting] = useState({ isLoading: false, data: [], error_message: null })
    const updateStoreSettingState = (newState) => { setStore_Setting(prev => ({ ...prev, ...newState })) };

    const fetchStoreSettingData = async () => {
        try {
            updateStoreSettingState({ isLoading: true, error_message: null });
            const response = await axios.get(show_store_name);

            if (response && response.data) {
                const data = response.data.payload || [];
                updateStoreSettingState({ data: data });
            }

        } catch (error) {
            console.log(error);
        } finally {
            updateStoreSettingState({ isLoading: false });
        }
    }


    return (
        <Auth_Context_Provider.Provider value={{ encryptData, decryptData, auth, isTokenExpired, setAuth, authLoading, logout_function, store_setting, fetchStoreSettingData }}>
            {children}
        </Auth_Context_Provider.Provider>
    )
}

export default Auth_Context;

// coustom hooks
export const useAuth_Context = () => {
    return useContext(Auth_Context_Provider)
};