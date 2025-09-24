import { createContext, memo, useContext } from "react";
import { AddServiceRequest, EventService, EventServiceProviderProps, EventServiceProviderType, RemoveServiceRequest } from "./types";
import { useApi } from "../ApiProvider";
import { Page } from "@/common/types";
import { SuccessResponse } from "../ApiProvider/types";

const EventServicesContext = createContext(
    {} as EventServiceProviderType
);

function EventServiceProvider({ children }: EventServiceProviderProps) {
    const api = useApi();

    function getAll(eventId: number) {
        const endpoint = `/event-services/getAll?eventId=${eventId}`;

        return api.getAll<EventService>(endpoint);
    }

    function getPage(eventId: number, page: number, pageSize: number) {
        const endpoint = `/event-services/getPage?eventId=${eventId}&page=${page}&pageSize=${pageSize}`;

        return api.get<Page<EventService>>(endpoint);
    }

    function addServiceToEvent(eventId: number, serviceId: number) {
        const endpoint = `/event-services/addServiceToEvent`;

        const req: AddServiceRequest = {
            eventId: eventId,
            serviceId: serviceId
        };

        return api.post<AddServiceRequest, SuccessResponse>(endpoint, req);
    }

    function removeServiceFromEvent(eventId: number, serviceId: number) {
        const endpoint = `/event-services/removeServiceFromEvent`;

        const req: RemoveServiceRequest = {
            eventId: eventId,
            serviceId: serviceId
        };

        return api.post<RemoveServiceRequest, SuccessResponse>(endpoint, req);
    }

    return (
        <EventServicesContext.Provider value={{ getAll, getPage, addServiceToEvent, removeServiceFromEvent }}>
            {children}
        </EventServicesContext.Provider>
    );
}

export function useEventServices(): EventServiceProviderType {
    const eventServicesCtx = useContext(EventServicesContext);

    if (!eventServicesCtx)
        throw new Error("useEventServices() hook must be used within an <EventServiceProvider>");

    return eventServicesCtx;
}

export default memo(EventServiceProvider);