import { createContext, ReactNode, useContext, useState } from "react";
import { useApi } from "../ApiProvider";
import { AuthResponse } from "../ApiProvider/types";
import Role from "@/app/enums/Role";
import useSecureStore from "@/app/hooks/useSecureStore";

interface AuthProviderProps {
    children: ReactNode;
};

type AuthProviderType = {
    currentUser: AuthResponse | null;
    register: (name: string, email: string, password: string, role: Role) => Promise<AuthResponse>;
    login: (email: string, passowrd: string) => Promise<AuthResponse>;
    isSessionValid: () => Promise<boolean>;
    isUserAvailable: () => boolean;
};

const AuthContext = createContext(
    {} as AuthProviderType
);

function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useSecureStore<AuthResponse | null>("currentUser", null);

    const api = useApi();

    function register(name: string, email: string, password: string, role: Role): Promise<AuthResponse> {
        return new Promise(async (resolve, reject) => {
            const endpoint = "/auth/register";
            const body = {
                name: name,
                email: email,
                password: password,
                role: role,
            };

            try {
                const user = await api.post<typeof body, AuthResponse>(endpoint, body);

                setCurrentUser(user);

                resolve(user);
            } catch (err) {
                reject(err);
            }
        });
    }

    function login(email: string, password: string): Promise<AuthResponse> {
        return new Promise(async (resolve, reject) => {
            const endpoint = "/auth/login";
            const body = {
                email: email,
                password: password,
            };

            try {
                const user = await api.post<typeof body, AuthResponse>(endpoint, body);

                setCurrentUser(user);

                resolve(user);
            } catch (err) {
                reject(err);
            }
        });
    }

    function isSessionValid(): Promise<boolean> {
        return new Promise(async (resolve) => {
            if (currentUser === null || currentUser === undefined) resolve(false);

            const endpoint = "/session-status/";

            try {
                const valid = await api.get<any>(endpoint);

                if (!valid) resolve(false);

                console.log(valid);

                resolve(true);
            } catch (err) {
                resolve(false);
            }
        });
    }

    function isUserAvailable(): boolean {
        return currentUser !== null && currentUser !== undefined;
    }

    return (
        <AuthContext.Provider value={{ currentUser, register, login, isSessionValid, isUserAvailable }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthProviderType {
    const authContext = useContext(AuthContext);

    if (!authContext)
        throw new Error("useAuth hook must be used within a <AuthProvider>");

    return authContext;
}

export default AuthProvider;