export interface SearchBoxProps {
    onSubmit?: (text: string) => void | Promise<void>;
};

export type SearchBoxHandle = {
    setText: (text: string) => void;
    getText: () => string;
    reset: () => void;
};