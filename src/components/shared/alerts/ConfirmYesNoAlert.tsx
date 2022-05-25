import { IonAlert } from "@ionic/react";
import { IConfirmAlertModel } from "../../../utils/models/alerts/confirmAlertModel";

const ConfirmYesNoAlert = (props: IConfirmAlertModel) => {
  return (
    <>
      <IonAlert
        onDidDismiss={props.onCancel}
        isOpen={true}
        header={props.header}
        message={props.message}
        buttons={[
          {
            text: "No",
            cssClass: "secondary",
            handler: props.onCancel,
          },
          {
            text: "Si",
            cssClass: "primary",
            handler: props.onConfirm,
          },
        ]}
      />
    </>
  );
};

export default ConfirmYesNoAlert;
