import { Page, Timestamp } from "@/common/types";
import { ReactNode } from "react";
import { SuccessResponse } from "../ApiProvider/types";

export interface ProviderService {
    id: number;
    providerId: number;
    providerName: string;
    title: string;
    description: string;
    imageUrl: string;
    rate: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

export interface ProviderServiceCreateRequest {
    providerEmail: string;
    title: string;
    description: string;
    imageUrl: string;
};

export interface ProviderServiceUpdateRequest extends ProviderServiceCreateRequest {
    serviceId: number;
};

export type ProviderServicesType = {
    getAll: () => Promise<ProviderService[]>;
    getPage: (page: number, pageSize: number) => Promise<Page<ProviderService>>;
    getPageByProviderId: (providerId: number, page: number, pageSize: number) => Promise<Page<ProviderService>>;
    getPageByProviderEmail: (providerEmail: string, page: number, pageSize: number) => Promise<Page<ProviderService>>;
    getCountByProvider: (providerEmail: string) => Promise<number>;
    getOne: (id: number) => Promise<ProviderService>;
    create: (request: ProviderServiceCreateRequest) => Promise<SuccessResponse>;
    update: (request: ProviderServiceUpdateRequest) => Promise<SuccessResponse>;
    deleteOne: (id: number) => Promise<SuccessResponse>;
};

export interface ProviderServicesProps {
    children: ReactNode;
};