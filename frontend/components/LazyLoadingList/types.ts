
export interface LazyLoadingListHandle {
    loadMore: () => void;
};

export interface LazyLoadingListProps {
    onItemClick?: (item: any) => void;
};

