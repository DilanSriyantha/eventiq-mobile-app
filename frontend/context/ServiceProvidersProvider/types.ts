import { Page, Timestamp } from "@/common/types";
import { ReactNode } from "react";
import { SuccessResponse } from "../ApiProvider/types";

export interface ServiceProvider {
    id: number;
    infoId: number;
    name: string;
    title: string;
    businessEmail: string;
    contactNumber: string;
    address: string;
    welcomeNote: string;
    tags: string;
    rating: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface ServiceProviderCreateRequest {
    id: number;
    title: string;
    welcomeNote: string;
    tags: string;
};

export interface ServiceProviderUpdateRequest extends Omit<ServiceProviderCreateRequest, "id"> {
    contactNumber: string;
    address: string;
    businessEmail: string;
};

export interface ServiceProvidersProviderProps {
    children: ReactNode;
}

export type ServiceProvidersType = {
    getAll: () => Promise<ServiceProvider[]>;
    getPage: (page: number, pageSize: number) => Promise<Page<ServiceProvider>>;
    getOneByProviderId: (providerId: number) => Promise<ServiceProvider>;
    getOneByInfoId: (infoId: number) => Promise<ServiceProvider>;
    getOneByProviderEmail: (email: string) => Promise<ServiceProvider>;
    create: (request: ServiceProviderCreateRequest) => Promise<SuccessResponse>;
    update: (request: ServiceProviderUpdateRequest) => Promise<SuccessResponse>;
    deleteOne: (infoId: number) => Promise<SuccessResponse>;
}