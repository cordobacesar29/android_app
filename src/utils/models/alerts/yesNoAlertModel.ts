export interface IYesNoAlertModel {
    isOpen: boolean;
    header: string;
    message: string;
    onConfirm(): void;
    onCancel(): void;
}