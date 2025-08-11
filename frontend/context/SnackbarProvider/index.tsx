import { createContext, ReactNode, useContext, useRef } from "react";
import SnackbarView, { AlertOptions, SnackbarViewHandle } from "./SnackbarView";

interface SnackbarProviderProps {
    children: ReactNode;
}

type SnackbarProviderType = {
    showInfo: (message: string) => void;
    showSuccess: (message: string) => void;
    showWarning: (message: string) => void;
    showError: (message: string) => void;
};

const SnackbarContext = createContext(
    {} as SnackbarProviderType
);

function SnackbarProvider({ children }: SnackbarProviderProps) {
    const snackbarRef = useRef<SnackbarViewHandle>(null);

    function showInfo(message: string) {
        if (!snackbarRef.current) return;

        const options: AlertOptions = {
            message: message,
            type: "info"
        };

        snackbarRef.current.show(options);
    }

    function showSuccess(message: string) {
        if (!snackbarRef.current) return;

        const options: AlertOptions = {
            message: message,
            type: "success"
        };

        snackbarRef.current.show(options);
    }

    function showWarning(message: string) {
        if (!snackbarRef.current) return;

        const options: AlertOptions = {
            message: message,
            type: "warning"
        };

        snackbarRef.current.show(options);
    }

    function showError(message: string) {
        if (!snackbarRef.current) return;

        const options: AlertOptions = {
            message: message,
            type: "error"
        };

        snackbarRef.current.show(options);
    }

    return (
        <SnackbarContext.Provider value={{ showInfo, showSuccess, showWarning, showError }}>
            {children}
            <SnackbarView ref={snackbarRef} />
        </SnackbarContext.Provider>
    );
}

export function useSnackbar(): SnackbarProviderType {
    const snackbarContext = useContext(SnackbarContext);

    if (!snackbarContext)
        throw new Error("useSnackbar hook must be used within a <SnackbarProvider>");

    return snackbarContext;
}

export default SnackbarProvider;