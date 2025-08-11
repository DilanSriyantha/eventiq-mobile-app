import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

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

export default function useSecureStore<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        getSavedValue<T>(key, initialValue).then(setValue);
    }, [key]);

    useEffect(() => {
        if (Platform.OS === "web")
            localStorage.setItem(key, JSON.stringify(value));
        else
            SecureStore.setItemAsync(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}