import { ReactNode } from "react";
import { AuthResponse } from "../ApiProvider/types";

export interface UserProviderProps {
    children: ReactNode;
};

export type UserProviderType = [
    AuthResponse | null,
    (value: AuthResponse | null) => void,
    boolean
];