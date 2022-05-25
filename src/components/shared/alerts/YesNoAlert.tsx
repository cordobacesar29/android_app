import { IonAlert } from "@ionic/react";
import { IYesNoAlertModel } from "../../../utils/models/alerts/yesNoAlertModel";

const YesNoAlert: React.FC<IYesNoAlertModel> = (props: IYesNoAlertModel) => {
  return (
    <>
      <IonAlert
        onDidDismiss={props.onCancel}
        isOpen={props.isOpen}
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

export default YesNoAlert;
