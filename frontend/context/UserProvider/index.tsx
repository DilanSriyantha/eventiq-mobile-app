import useSecureStore from "@/app/hooks/useSecureStore";
import { createContext, useCallback, useContext } from "react";
import { AuthResponse } from "../ApiProvider/types";
import { UserProviderProps, UserProviderType } from "./types";

const UserContext = createContext(
    {} as UserProviderType
);

export default function UserProvider({ children }: UserProviderProps) {
    const [cachedState, setCachedState, isLoaded] = useSecureStore<AuthResponse | null>("currentUser", null);

    const setCurrentUser = useCallback((value: AuthResponse | null) => {
        setCachedState(value);
    }, []);

    return (
        <UserContext.Provider value={[cachedState, setCurrentUser, isLoaded]}>
            { children }
        </UserContext.Provider>
    );
}

export function useCurrentUser(): UserProviderType {
    const userCtx = useContext(UserContext);

    if(!userCtx)
        throw new Error("useCurrentUser hook must be used within a <UserProvider>");

    return userCtx;
}