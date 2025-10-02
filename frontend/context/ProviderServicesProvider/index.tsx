import { Page } from "@/common/types";
import { createContext, memo, useContext } from "react";
import { useApi } from "../ApiProvider";
import { SuccessResponse } from "../ApiProvider/types";
import { ProviderService, ProviderServiceCreateRequest, ProviderServicesProps, ProviderServicesType, ProviderServiceUpdateRequest } from "./types";

const ProviderServicesContext = createContext(
    {} as ProviderServicesType
);

function ProviderServicesProvider({ children }: ProviderServicesProps) {
    const api = useApi();

    async function getAll() {
        const endpoint = "/provider-services/getAll";

        return api.getAll<ProviderService>(endpoint);
    }

    async function getPage(page: number, pageSize: number) {
        const endpoint = `/provider-services/getPage?pageSize=${pageSize}&page=${page}`;

        return api.get<Page<ProviderService>>(endpoint);
    }

    async function getPageByProviderId(providerId: number, page: number, pageSize: number) {
        const endpoint = `/provider-services/getPageByProvider?providerId=${providerId}&pageSize=${pageSize}&page=${page}`;

        return api.get<Page<ProviderService>>(endpoint);
    }

    async function getPageByProviderEmail(providerEmail: string, page: number, pageSize: number) {
        const endpoint = `/provider-services/getPageByProviderEmail?providerEmail=${providerEmail}&pageSize=${pageSize}&page=${page}`;

        return api.get<Page<ProviderService>>(endpoint);
    }

    async function getCountByProvider(providerEmail: string) {
        const endpoint = `/provider-services/getCountByProvider?providerEmail=${providerEmail}`;

        return api.get<number>(endpoint);
    }

    async function getOne(id: number) {
        const endpoint = `/provider-services/get?id=${id}`;

        return api.get<ProviderService>(endpoint);
    }

    async function create(request: ProviderServiceCreateRequest) {
        const endpoint = `/provider-services/create`;

        return api.post<ProviderServiceCreateRequest, SuccessResponse>(endpoint, request);
    }

    async function update(request: ProviderServiceUpdateRequest) {
        const endpoint = `/provider-services/update`;

        return api.post<ProviderServiceUpdateRequest, SuccessResponse>(endpoint, request);
    }

    async function deleteOne(id: number) {
        const endpoint = `/provider-services/delete?id=${id}`;

        return api.deleteOne(endpoint);
    }

    return (
        <ProviderServicesContext.Provider value={{ getAll, getPage, getPageByProviderId, getPageByProviderEmail, getCountByProvider, getOne, create, update, deleteOne }}>
            {children}
        </ProviderServicesContext.Provider>
    )
}

export function useProviderServices() {
    const providerServicesCtx = useContext(ProviderServicesContext);

    if (!providerServicesCtx)
        throw new Error("useProviderServices hook must be used within a <ProviderServicesProvider>");

    return providerServicesCtx;
}

export default memo(ProviderServicesProvider);