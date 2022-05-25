import { DatetimeChangeEventDetail } from "@ionic/core";

export interface ICalendarModel {
    label: string;
    placeholder: string;
    isRequired: boolean;
    value: string;
    error?: string;
    onChange(event: CustomEvent<DatetimeChangeEventDetail>): void;
    handleBlur(event: CustomEvent<void>): void;
}
