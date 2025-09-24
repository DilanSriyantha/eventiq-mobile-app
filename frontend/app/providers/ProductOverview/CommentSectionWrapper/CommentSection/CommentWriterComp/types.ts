export interface CommentWriterCompProps {
    onSend: (comment: string) => void | Promise<void>;
};