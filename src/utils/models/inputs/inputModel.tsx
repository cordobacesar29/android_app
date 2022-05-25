import { InputChangeEventDetail, TextFieldTypes } from "@ionic/core";

export interface IInputModel {
    label: string;
    placeholder: string;
    isRequired: boolean;
    value: any;
    type: TextFieldTypes;
    error?: string;
    disabled?: boolean;
    step?: string;
    onChange(event: CustomEvent<InputChangeEventDetail>): void;
    handleBlur(event: CustomEvent<FocusEvent>): void;
    onKeyPress(event: any): void;
}
