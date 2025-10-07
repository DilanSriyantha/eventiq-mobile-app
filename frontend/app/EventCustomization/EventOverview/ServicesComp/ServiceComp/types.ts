import { EventService } from "@/context/EventServicesProvider/types";

export interface ServiceCompProps extends EventService {
    onRemoveClick?: (eventId: number, serviceId: number) => void | Promise<void>;
};