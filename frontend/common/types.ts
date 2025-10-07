import moment from "moment";

export interface User {
    name: string;
    type: string;
};

export enum UserType {
    ADMIN = "admin",
    PROVIDER = "provider",
    CONSUMER = "consumer"
};

export type Timestamp = number;

export namespace Timestamp {
    export function toDate(timestamp: Timestamp): Date {
        return new Date(timestamp);
    }

    export function format(timestamp: Timestamp, format: string) {
        return moment(toDate(timestamp)).format(format);
    }
};

export interface WelcomeAnimationProps {
    onGetStartedPress?: () => void;
};

export interface SearchBoxProps {
    onTextChange: (text: string) => void;
};

export interface ServiceProvider {
    id: number;
    name: string;
};

export interface EventComponent {

};

export interface ManagableEvent {
    id: number;
    title: string;
    date: string;
    description: string;
    components: EventComponent[];
};

export interface Page<T> {
    content: T[],
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        offset: number,
        paged: boolean,
        unpaged: boolean
    },
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    numberOfElements: number,
    first: boolean,
    empty: boolean
};