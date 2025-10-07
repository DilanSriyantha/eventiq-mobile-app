import { Page, Timestamp } from "@/common/types";
import { ReactNode } from "react";
import { SuccessResponse } from "../ApiProvider/types";

export interface ConsumerEvent {
    id: number;
    userId: number;
    userName: string;
    title: string;
    description: string;
    date: Date;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

export interface CreateEventRequest {
    userEmail: string;
    title: string;
    description: string;
    date: Date;
};

export interface UpdateEventRequest extends Omit<CreateEventRequest, "userId"> {
    id: number;
};

export type EventProviderType = {
    getAllByUser: (userEmail: string) => Promise<ConsumerEvent[]>;
    getPageByUser: (userEmail: string, page: number, pageSize: number) => Promise<Page<ConsumerEvent>>;
    get: (eventId: number) => Promise<ConsumerEvent>;
    create: (request: CreateEventRequest) => Promise<ConsumerEvent>;
    update: (Request: UpdateEventRequest) => Promise<ConsumerEvent>;
    deleteOne: (id: number) => Promise<SuccessResponse>;
};

export interface EventProviderProps {
    children: ReactNode;
};