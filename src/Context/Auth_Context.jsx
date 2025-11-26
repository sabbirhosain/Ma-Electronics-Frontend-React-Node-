import React, { createContext, useContext, useState } from 'react'
import CryptoJS from 'crypto-js'

const Auth_Context_Provider = createContext()
const Auth_Context = ({ children }) => {

    // encrypt cookie data
    const SECRET_KEY = import.meta.env.VITE_CRYPTOJS_SECRET_KEY || 'YourFallbackSecretKey';
    const encryptData = (data) => {
        try {
            if (!data) { console.log("No data found to encrypt."); return null }
            return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
        } catch (error) {
            console.error("Encryption error:", error);
            return null;
        }
    }

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
    }

















    return (
        <Auth_Context_Provider.Provider value={{ encryptData, decryptData }}>
            {children}
        </Auth_Context_Provider.Provider>
    )
}

export default Auth_Context;

// coustom hooks
export const useAuth_Context = () => {
    return useContext(Auth_Context_Provider)
};