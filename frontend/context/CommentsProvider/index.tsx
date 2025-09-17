import { Page } from "@/common/types";
import { createContext, memo, useContext } from "react";
import { useApi } from "../ApiProvider";
import { SuccessResponse } from "../ApiProvider/types";
import { Comment, CommentsProviderProps, CommentsProviderType, CreateCommentRequest, UpdateCommentRequest } from "./types";

const CommentsContext = createContext(
    {} as CommentsProviderType
);

function CommentsProvider({ children }: CommentsProviderProps) {
    const api = useApi();

    async function getAll(serviceId: number) {
        const endpoint = `/service-comments/getAll?serviceId=${serviceId}`;

        return api.getAll<Comment>(endpoint);
    }

    async function getPage(serviceId: number, page: number, pageSize: number) {
        const endpoint = `/service-comments/getPage?serviceId=${serviceId}&page=${page}&pageSize=${pageSize}`;

        return api.get<Page<Comment>>(endpoint);
    }

    async function create(request: CreateCommentRequest) {
        const endpoint = `/service-comments/create`;

        return api.post<CreateCommentRequest, SuccessResponse>(endpoint, request);
    }

    async function update(request: UpdateCommentRequest) {
        const endpoint = `/service-comments/update`;

        return api.post<UpdateCommentRequest, SuccessResponse>(endpoint, request);
    }

    async function deleteOne(commentId: number) {
        const endpoint = `/service-comments/delete?commentId=${commentId}`;

        return api.deleteOne(endpoint);
    }

    return (
        <CommentsContext.Provider value={{ getAll, getPage, create, update, deleteOne }}>
            {children}
        </CommentsContext.Provider>
    );
}

export function useComments() {
    const commentsCtx = useContext(CommentsContext);

    if (!commentsCtx)
        throw new Error("useComments() hook must be used within a <CommentsProvider>");

    return commentsCtx;
}

export default memo(CommentsProvider);