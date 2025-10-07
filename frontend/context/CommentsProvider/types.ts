import { Page, Timestamp } from "@/common/types";
import { ReactNode } from "react";
import { SuccessResponse } from "../ApiProvider/types";

export interface Comment {
    id: number;
    userId: number;
    serviceId: number;
    username: string;
    serviceTitle: string;
    body: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

export interface CreateCommentRequest {
    userEmail: string;
    serviceId: number;
    commentBody: string;
};

export interface UpdateCommentRequest {
    commentId: number;
    commentBody: number;
};

export type CommentsProviderType = {
    getAll: (serviceId: number) => Promise<Comment[]>;
    getPage: (serviceId: number, page: number, pageSize: number) => Promise<Page<Comment>>;
    create: (request: CreateCommentRequest) => Promise<Comment>;
    update: (request: UpdateCommentRequest) => Promise<SuccessResponse>;
    deleteOne: (commentId: number) => Promise<SuccessResponse>;
};

export interface CommentsProviderProps {
    children: ReactNode;
};