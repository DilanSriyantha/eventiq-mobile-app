import { Timestamp } from "@/common/types";
import { ReactNode } from "react";

export type WebSocketProviderType = {
    getCount: () => number;
    getReadCount: () => number;
    getUnreadCount: () => number;
    getAll: () => Notification[];
    getOne: (id: number) => Notification | undefined;
    setSeen: (id: number) => void;
};

export interface WebSocketProviderProps {
    children: ReactNode;
};

export interface Notification {
    id: number;
    title: string;
    message: string;
    createdAt: Timestamp;
    seen: boolean;
};