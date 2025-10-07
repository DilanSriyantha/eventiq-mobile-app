import { Post } from "@/context/PostsProvider/types";

export interface PostProps {
    post: Post;
    editable?: boolean;
    onEditPress?: (post: Post) => void;
    onRatePressed?: (post: Post) => void;
    onCheckPressed?: (post: Post) => void;
};