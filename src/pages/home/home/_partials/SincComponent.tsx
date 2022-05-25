import { Dispatch, SetStateAction, useState } from "react";
import {
  IonCardContent,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonCard,
} from "@ionic/react";
import {
  helpOutline,
  syncOutline,
  closeOutline,
} from "ionicons/icons";
import { alertOutline } from "ionicons/icons";
import { ComponentsLoader } from "../../../../components/shared/loaders/ComponentsLoader";
import Swal from "sweetalert2";
import YesNoAlert from "../../../../components/shared/alerts/YesNoAlert";
import { getAllGenericServices } from "../../../../config/synchronizeService";
import moment from "moment";
import { GenericSyncsService } from "../../../../services/modules/genericSyncs/GenericSyncsService";

interface IProps {
  internetConnection: boolean;
  lastDate: string;
  setLastDate: Dispatch<SetStateAction<string>>;
}

export const SincComponent = (props: IProps) => {
  const { internetConnection } = props;
  const [showHelp, setShowHelp] = useState(false);
  const [isSyncCorrectly, setIsSyncCorrectly] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlertSync, setShowAlertSync] = useState<boolean>(false);

  const handleHelp = (e: any) => {
    e.preventDefault();
    setShowHelp(true);
  };
  const handleCancelHelp = (e: any) => {
    e.preventDefault();
    setShowHelp(false);
  };

  const handleOpenSync = () => {
    setShowAlertSync(true);
  };

  const handleGenericSync = async () => {
    const newFecha = moment(new Date()).format('DD/MM/YYYY hh:mm');
    GenericSyncsService.save(newFecha);
    props.setLastDate(newFecha);
  }

  const confirmSync = (): void => {
    const sync = async () => {
      try {
        setLoading(true);
        await getAllGenericServices();
        await handleGenericSync();
        setLoading(false);
        setIsSyncCorrectly(true);
        Swal.fire({
          position: "center",
          icon: "success",
          width: "70%",
          heightAuto: true,
          title: "Sincronización exitosa",
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (err) {
        setIsSyncCorrectly(false);
        Swal.fire({
          position: "center",
          icon: "error",
          width: "70%",
          heightAuto: true,
          title: "Error al sincronizar",
          showConfirmButton: false,
          timer: 3000,
        });
        setLoading(false);
        throw err;
      }
    };
    sync();
  };

  const cancelSync = () => {
    setShowAlertSync(false);
  };  

  return (
    <IonCard className="cardComp2">
      {loading && <ComponentsLoader loading={loading} />}
      <IonCardContent className="cardCont0">
        {showHelp && (
          <IonRow className="cardCont1">
            <div className="contentHelp">
              <IonRow>
                <IonCol size="10" className="textHelpSync">
                  Sincroniza para que los datos de la aplicación móvil coincidan
                  con los de SYNAgro 7 en la computadora.
                </IonCol>
                <IonCol
                  size="2"
                  className="ion-text-end"
                  onClick={handleCancelHelp}
                >
                  <IonIcon
                    className="iconCloseHelp"
                    icon={closeOutline}
                  ></IonIcon>
                </IonCol>
              </IonRow>
            </div>
          </IonRow>
        )}
        <IonRow className="rowCard1">
          <IonCol size="9" className="cardCont1">
            <p className="pCard2">
              <b>Ultima sincronizacion</b>: {props.lastDate}
            </p>
          </IonCol>
          {!showHelp && (
            <IonCol size="3" className="cardCont2" onClick={handleHelp}>
              <IonIcon className="icon-question" icon={helpOutline}></IonIcon>
            </IonCol>
          )}
        </IonRow>
        <IonRow>
          <IonCol className="rowCard1">
            <IonButton
              disabled={!internetConnection}
              expand="block"
              className="btn-sync"
              color={isSyncCorrectly ? "secondary" : "danger"}
              onClick={handleOpenSync}
            >
              <IonIcon icon={isSyncCorrectly ? syncOutline : alertOutline}></IonIcon>
              <p className="ion-padding-start text-btn-sync">
                {isSyncCorrectly ? "Sincronizar Ahora" : " ERROR DE SINCRONIZACIÓN"}
              </p>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonCardContent>
      <YesNoAlert
        isOpen={showAlertSync}
        header={"Sincronizar"}
        message={"¿Desea sincronizar?"}
        onConfirm={confirmSync}
        onCancel={cancelSync}
      />
    </IonCard>
  );
};
