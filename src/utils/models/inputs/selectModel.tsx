import { SelectChangeEventDetail } from "@ionic/core";

export interface ISelectModel {
    label: string;
    placeholder: string;
    isRequired: boolean;
    value: any;
    items: any[];
    multiple?: boolean;
    error?: string;
    onChange(event: CustomEvent<SelectChangeEventDetail>): void;
    handleBlur(event: CustomEvent<void>): void;
    disabled?: boolean;
}
