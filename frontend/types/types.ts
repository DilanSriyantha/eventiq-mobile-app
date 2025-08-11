export interface User {
    name: string;
    type: string;
};

export enum UserType {
    ADMIN = "admin",
    PROVIDER = "provider",
    CONSUMER = "consumer"
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