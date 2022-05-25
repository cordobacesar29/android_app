export interface IConfirmAlertModel {
  header: string;
  message: string;
  onConfirm(): void;
  onCancel(): void;
}
