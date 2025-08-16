
export interface PostProps {
    title: string;
    imageUrl: string;
    rate: number;
    tags: string;
    onRatePress: () => void;
    onCheckPress: () => void;
};