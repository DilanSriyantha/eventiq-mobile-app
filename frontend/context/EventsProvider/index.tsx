import { Page } from "@/common/types";
import { createContext, useContext } from "react";
import { useApi } from "../ApiProvider";
import { ConsumerEvent, CreateEventRequest, EventProviderProps, EventProviderType, UpdateEventRequest } from "./types";

const EventsContext = createContext(
    {} as EventProviderType
);

export function EventsProvider({ children }: EventProviderProps) {
    const api = useApi();

    function getAllByUser(userEmail: string): Promise<ConsumerEvent[]> {
        const endpoint = `/consumer-events/getAll?userEmail=${userEmail}`;

        return api.getAll<ConsumerEvent>(endpoint);
    }

    function getPageByUser(userEmail: string, page: number, pageSize: number): Promise<Page<ConsumerEvent>> {
        const endpoint = `/consumer-events/getPage?userEmail=${userEmail}&page=${page}&pageSize=${pageSize}`;

        return api.get<Page<ConsumerEvent>>(endpoint);
    }

    function get(eventId: number): Promise<ConsumerEvent> {
        const endpoint = `/consumer-events/get?eventId=${eventId}`;

        return api.get<ConsumerEvent>(endpoint);
    }

    function create(request: CreateEventRequest): Promise<ConsumerEvent> {
        const endpoint = `/consumer-events/create`;

        return api.post<CreateEventRequest, ConsumerEvent>(endpoint, request);
    }

    function update(request: UpdateEventRequest): Promise<ConsumerEvent> {
        const endpoint = `/consumer-events/update`;

        return api.post<UpdateEventRequest, ConsumerEvent>(endpoint, request);
    }

    function deleteOne(eventId: number) {
        const endpoint = `/consumer-events/delete?eventId=${eventId}`;

        return api.deleteOne(endpoint);
    }

    return (
        <EventsContext.Provider value={{ getAllByUser, getPageByUser, get, create, update, deleteOne }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const eventsCtx = useContext(EventsContext);

    if (!eventsCtx)
        throw new Error("useEvents() hook must be used within a <EventsProvider>");

    return eventsCtx;
}