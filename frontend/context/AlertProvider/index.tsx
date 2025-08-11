import { createContext, ReactNode, useContext } from "react";

interface AlertProviderProps {
    children: ReactNode;
};

type AlertProviderType = {

};

const AlertContext = createContext(
    {} as AlertProviderType
);

function AlertProvider({ children }: AlertProviderProps) {

    return (
        <AlertContext.Provider value={{}}>
            {children}
        </AlertContext.Provider>
    );
}

export function useAlert(): AlertProviderType {
    const alertContext = useContext(AlertContext);

    if (!alertContext)
        throw new Error("useAlert hook must be used within a <AlertProvider>");

    return alertContext;
}

export default AlertProvider;