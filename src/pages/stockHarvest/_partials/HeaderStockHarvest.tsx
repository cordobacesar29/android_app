import {
  IonToolbar,
  IonButtons,
  IonIcon,
  IonTitle,
  IonHeader,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

interface IProps {
  handleCancel: () => void;
}
export const HeaderStockHarvest = (props: IProps) => {
  const { handleCancel } = props;
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start" className="iconBackTask">
          <IonIcon slot="start" md={arrowBack} onClick={handleCancel} />
        </IonButtons>
        <IonTitle className="titleTask">Stock de Cosecha</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
