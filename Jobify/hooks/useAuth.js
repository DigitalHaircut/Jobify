import { useEffect, useLayoutEffect, useState } from "react";
import { login as loginService } from "../services/auth";
import { handleUpdate } from "../services/utils";
import { useLocalStorage } from "./useLocalStorage";

const initialAuth = {
    user: null,
}
export function useAuth() {
    const [{ user, token }, setUser] = useLocalStorage("itschool-library-user", initialAuth);

    useLayoutEffect(() => {
        handleUpdate(token);
    }, [token]);

    async function login(credentials) {
        try {
            const userInfo = await loginService(credentials);
            setUser(userInfo);
        } catch (error) {
            throw error.data.message || "Error"
        }
    }

    function logout() {
        setUser(initialAuth);
    }

    return {
        user,
        login,
        logout
    }
}
