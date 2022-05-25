import { RadioGroupChangeEventDetail } from "@ionic/core";

interface IRadio {
    key: string;
    value: any;
}
export interface IRadioGroupModel {
    label: string;
    value: any;
    error?: string;
    items: IRadio[];
    readOnly?: boolean;
    onChange(event: CustomEvent<RadioGroupChangeEventDetail<any>>): void;
    handleBlur(event: CustomEvent<void>): void;
}
