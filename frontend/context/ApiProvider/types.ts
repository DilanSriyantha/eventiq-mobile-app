export interface SuccessResponse {
    status: number;
    message: string;
};

export interface ErrorResponse {
    status: number;
    message: string;
};

export interface AuthResponse {
    name: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken: string;
};