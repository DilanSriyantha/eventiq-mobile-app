import { Page } from "@/common/types";
import { createContext, memo, useContext } from "react";
import { useApi } from "../ApiProvider";
import { ServiceProvider, ServiceProviderCreateRequest, ServiceProvidersProviderProps, ServiceProvidersType, ServiceProviderUpdateRequest } from "./types";

const ServiceProvidersContext = createContext(
    {} as ServiceProvidersType
);

function ServiceProvidersProvider({ children }: ServiceProvidersProviderProps) {

    const api = useApi();

    async function getAll() {
        const endpoint = "/service-providers/getAll";

        return api.get<ServiceProvider[]>(endpoint);
    }

    async function getPage(page: number, pageSize: number) {
        const endpoint = `/service-providers/getPage?page=${page}&pageSize=${pageSize}`;

        return api.get<Page<ServiceProvider>>(endpoint);
    }

    async function getOneByProviderId(providerId: number) {
        const endpoint = `/service-providers/getByProviderId?providerId=${providerId}`;

        return api.get<ServiceProvider>(endpoint);
    }

    async function getOneByInfoId(infoId: number) {
        const endpoint = `/service-providers/getByInfoId?infoId=${infoId}`;

        return api.get<ServiceProvider>(endpoint);
    }

    async function create(request: ServiceProviderCreateRequest) {
        const endpoint = "/service-providers/create";

        return api.post<ServiceProviderCreateRequest, any>(endpoint, request);
    }

    async function update(request: ServiceProviderUpdateRequest) {
        const endpoint = "/service-providers/update";

        return api.post<ServiceProviderUpdateRequest, any>(endpoint, request);
    }

    async function deleteOne(infoId: number) {
        const endpoint = `/service-providers/delete?infoId=${infoId}`;

        return api.deleteOne(endpoint);
    }

    return (
        <ServiceProvidersContext.Provider value={{ getAll, getPage, getOneByProviderId, getOneByInfoId, create, update, deleteOne }}>
            {children}
        </ServiceProvidersContext.Provider>
    );
}

export function useServiceProviders(): ServiceProvidersType {
    const serviceProvidersCtx = useContext(ServiceProvidersContext);

    if (!serviceProvidersCtx)
        throw new Error("useServiceProvider hook must be used within a <ServiceProvidersProvider>");

    return serviceProvidersCtx;
}

export default memo(ServiceProvidersProvider);