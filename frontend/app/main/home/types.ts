import { Post } from "@/context/PostsProvider/types";

export interface PostProps {
    post: Post;
    onRatePressed?: (post: Post) => void;
    onCheckPressed?: (post: Post) => void;
};