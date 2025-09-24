import useSecureStore from "@/app/hooks/useSecureStore";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Surface } from "react-native-paper";
import { AuthResponse } from "../ApiProvider/types";
import { UserProviderProps, UserProviderType } from "./types";

const UserContext = createContext(
    {} as UserProviderType
);

export default function UserProvider({ children }: UserProviderProps) {
    const [cachedState, setCachedState, isLoaded] = useSecureStore<AuthResponse | null>("currentUser", null);
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        if (!isLoaded) return;

        setTimeout(() => setIsReady(true), 1000);
    }, [isLoaded]);

    const setCurrentUser = useCallback((value: AuthResponse | null) => {
        setCachedState(value);
    }, []);

    if (!isReady) {
        return (
            <View style={{ flex: 1, }}>
                <Surface mode="flat" style={styles.container}>
                    <ActivityIndicator animating size={"large"} />
                </Surface>
            </View>
        );
    }

    return (
        <UserContext.Provider value={[cachedState, setCurrentUser, isLoaded]}>
            {children}
        </UserContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export function useCurrentUser(): UserProviderType {
    const userCtx = useContext(UserContext);

    if (!userCtx)
        throw new Error("useCurrentUser hook must be used within a <UserProvider>");

    return userCtx;
}