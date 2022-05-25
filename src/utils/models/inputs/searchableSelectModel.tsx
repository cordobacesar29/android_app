import { SelectChangeEventDetail } from "@ionic/core";

export interface ISearchableSelectModel {
    label: string;
    placeholder: string;
    isRequired: boolean;
    value: any;
    items: any[];
    multiple?: boolean;
    error?: string;
    onChange(event: CustomEvent<SelectChangeEventDetail>): void;
    handleBlur(): void;
    disabled?: boolean;
}
