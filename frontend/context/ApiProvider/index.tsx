import useSecureStore from "@/app/hooks/useSecureStore";
import { createContext, ReactNode, useContext } from "react";
import { AuthResponse, SuccessResponse } from "./types";

const API_URL = "http://127.0.0.1:8080/api/v1";
// const API_URL = "http://10.0.2.2:8080/api/v1"; // enable when running on emulator

interface ApiProviderProps {
    children: ReactNode;
};

type ApiProviderType = {
    get: <T>(endpoint: string) => Promise<T>;
    getAll: <T>(endpoint: string) => Promise<T[]>;
    getOneById: <T>(endpoint: string, id: number) => Promise<T | null>;
    post: <T, R>(endpoint: string, body: T) => Promise<R>;
    deleteOneById: (endpoint: string, id: number) => Promise<SuccessResponse>;
};

const ApiContext = createContext(
    {} as ApiProviderType
);

const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useSecureStore<AuthResponse | null>("currentUser", null);

    function get<T>(endpoint: string): Promise<T> {
        return new Promise(async (resolve, reject) => {
            const url = API_URL + endpoint;

            try {
                const res = await fetch(url, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${currentUser?.accessToken}`
                    }
                });

                if (!res)
                    throw new Error("Empty response");

                if (!res.ok)
                    throw new Error(await res.text());

                resolve(await res.json() as any as T);
            } catch (err) {
                reject(err);
            }
        });
    }

    function getAll<T>(endpoint: string): Promise<T[]> {
        return new Promise(async (resolve, reject) => {
            const url = API_URL + endpoint;

            try {
                const res = await fetch(url, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${currentUser?.accessToken}`
                    }
                });

                if (!res)
                    throw new Error("Empty response");

                if (!res.ok)
                    throw new Error(await res.text());

                resolve(await res.json() as any as T[]);
            } catch (err) {
                reject(err);
            }
        });
    }

    function getOneById<T>(endpoint: string, id: number): Promise<T | null> {
        return new Promise(async (resolve, reject) => {
            const url = API_URL + endpoint;

            try {
                const res = await fetch(url, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${currentUser?.accessToken}`
                    }
                });

                if (!res.ok)
                    throw new Error(await res.text());

                resolve(await res.json() as any as T);
            } catch (err) {
                reject(err);
            }
        });
    }

    function post<T, R>(endpoint: string, body: T): Promise<R> {
        return new Promise(async (resolve, reject) => {
            const url = API_URL + endpoint;

            console.log(url);

            try {
                const res = await fetch(url, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${currentUser?.accessToken}`
                    },
                    body: JSON.stringify(body)
                });

                if (!res)
                    throw new Error("Empty response.");

                if (!res.ok)
                    throw new Error(await res.text());

                resolve(await res.json() as any as R);
            } catch (err) {
                reject(err);
            }
        });
    }

    function deleteOneById(endpoint: string, id: number): Promise<SuccessResponse> {
        return new Promise(async (resolve, reject) => {
            const url = API_URL + endpoint + `?id=${id}`;

            try {
                const res = await fetch(url, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${currentUser?.accessToken}`
                    }
                });

                if (!res)
                    throw new Error("Empty response");

                if (!res.ok)
                    throw new Error(await res.text());

                resolve(await res.json() as any as SuccessResponse);
            } catch (err) {
                reject(err);
            }
        });
    }

    return (
        <ApiContext.Provider value={{ get, getAll, getOneById, post, deleteOneById, }}>
            {children}
        </ApiContext.Provider>
    );
};

export function useApi(): ApiProviderType {
    const apiContext = useContext(ApiContext);

    if (!apiContext)
        throw new Error("useApi hook must be used within a <ApiProvider>");

    return apiContext;
}

export default ApiProvider;