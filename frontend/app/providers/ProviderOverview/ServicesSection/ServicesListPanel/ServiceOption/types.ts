import { ProviderService } from "@/context/ProviderServicesProvider/types";

export interface ServiceOptionProps extends ProviderService {
    onClick?: () => void;
}