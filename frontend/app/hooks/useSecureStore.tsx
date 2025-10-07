import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

type UseSecureStoreType <T> = [
    T,
    (value: T) => void,
    boolean
];

async function getSavedValue<T>(key: string, initialValue: T) {
    try {
        let savedValue;
        if (Platform.OS === "web")
            savedValue = localStorage.getItem(key);
        else
            savedValue = await SecureStore.getItemAsync(key);

        if (savedValue !== null) {
            return JSON.parse(savedValue) as T;
        } else if (initialValue instanceof Function) {
            return initialValue() as T;
        } else {
            return initialValue;
        }
    } catch (err) {
        return initialValue;
    }
}

export default function useSecureStore<T>(key: string, initialValue: T, onLoadEnd?: (value: T) => void | Promise<void>): UseSecureStoreType<T> {
    const [value, setValue] = useState<T>(initialValue);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        getSavedValue<T>(key, initialValue).then((v) => {
            setValue(v);
            setLoaded(true);
            onLoadEnd?.apply(null, [v]);
        });
    }, [key]);

    useEffect(() => {
        if(!loaded) return;

        if (Platform.OS === "web")
            localStorage.setItem(key, JSON.stringify(value));
        else
            SecureStore.setItemAsync(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue, loaded];
}