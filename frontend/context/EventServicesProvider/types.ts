import { Page } from "@/common/types";
import { ReactNode } from "react";
import { SuccessResponse } from "../ApiProvider/types";

export interface EventService {
    eventId: number;
    serviceId: number;
    eventTitle: string;
    eventDescription: string;
    eventDate: string;
    title: string;
    description: string;
    imageUrl: string;
    rate: number;
};

export interface AddServiceRequest {
    eventId: number;
    serviceId: number;
};

export type RemoveServiceRequest = AddServiceRequest;

export interface EventServiceProviderProps {
    children: ReactNode;
};

export type EventServiceProviderType = {
    getAll: (eventId: number) => Promise<EventService[]>;
    getPage: (eventId: number, page: number, pageSize: number) => Promise<Page<EventService>>;
    addServiceToEvent: (eventId: number, serviceId: number) => Promise<SuccessResponse>;
    removeServiceFromEvent: (eventId: number, serviceId: number) => Promise<SuccessResponse>;
};