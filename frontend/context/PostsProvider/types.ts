import { Page, Timestamp } from "@/common/types";
import { ReactNode } from "react";
import { SuccessResponse } from "../ApiProvider/types";

export interface PostsProviderProps {
    children: ReactNode;
};

export type PostsProviderType = {
    getPage: (pageSize: number, page: number) => Promise<Page<Post>>;
    get: (postId: number) => Promise<Post | null>;
    search: (searchKey: string, pageSize: number, page: number) => Promise<Page<Post>>;
    create: (createRequest: PostCreateRequest) => Promise<SuccessResponse>;
    update: (updateRequest: PostUpdateRequest) => Promise<SuccessResponse>;
    deleteOne: (id: number) => Promise<SuccessResponse>;
};

export interface Post {
    id: number;
    providerId: number;
    title: string;
    description: string;
    tags: string;
    imageUrl: string;
    rate: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

export interface PostCreateRequest {
    providerId: number;
    title: string;
    description: string;
    tags: string;
    imageUrl: string;
};

export interface PostUpdateRequest {
    id: number;
    providerId: number;
    title: string;
    description: string;
    tags: string;
    imageUrl: string;
};