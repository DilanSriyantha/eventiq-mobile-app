import { Page } from "@/common/types";
import { createContext, memo, useContext } from "react";
import { useApi } from "../ApiProvider";
import { SuccessResponse } from "../ApiProvider/types";
import { Post, PostCreateRequest, PostsProviderProps, PostsProviderType, PostUpdateRequest } from "./types";

const PostsContext = createContext(
    {} as PostsProviderType
);

function PostsProvider({ children }: PostsProviderProps) {
    const api = useApi();

    async function getPage(pageSize: number, page: number) {
        const endpoint = `/provider-posts/getPage?pageSize=${pageSize}&page=${page}`;
        
        return api.get<Page<Post>>(endpoint);
    }

    async function get(postId: number) {
        const endpoint = `/provider-posts/get?id=${postId}`;

        return api.get<Post>(endpoint);
    }

    async function search(searchKey: string, pageSize: number, page: number) {
        const endpoint = `/provider-posts/search?searchKey=${searchKey}&pageSize=${pageSize}&page=${page}`;

        return api.get<Page<Post>>(endpoint);
    }

    async function create(createRequest: PostCreateRequest) {
        const endpoint = "/provider-posts/create";

        return api.post<PostCreateRequest, SuccessResponse>(endpoint, createRequest);
    }

    async function update(updateRequest: PostUpdateRequest) {
        const endpoint = "/provider-posts/update";

        return api.post<PostUpdateRequest, SuccessResponse>(endpoint, updateRequest);
    }

    async function deleteOne(id: number) {
        const endpoint = "/provider-posts/delete";

        return api.deleteOneById(endpoint, id);
    }

    return (
        <PostsContext.Provider value={{ getPage, get, search, create, update, deleteOne }}>
            { children }
        </PostsContext.Provider>
    );
}

export function usePosts(): PostsProviderType {
    const postsCtx = useContext(PostsContext);

    if(!postsCtx)
        throw new Error("usePosts hook must be used within a <PostsProvider>");

    return postsCtx;
}

export default memo(PostsProvider);