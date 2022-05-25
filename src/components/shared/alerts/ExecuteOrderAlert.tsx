import { IonModal, IonIcon, IonContent, IonCardContent, IonRow, IonCol, IonButton } from "@ionic/react";
import {alertCircleOutline} from "ionicons/icons";

interface IProps {
  isOpen: boolean;
  onCancel(): void;
  onConfirm(): void;
}

export const ExecuteAlert:React.FC<IProps> = (props: IProps) => {
  return (
    <div className={props.isOpen ? "modalBox" : ""}>
      <IonModal isOpen={props.isOpen} cssClass="executeModal">
        <IonContent className="executeContent">
          <IonRow className="boxIcon">
            <IonIcon icon={alertCircleOutline} className="executeIcon"/>
            <h1 className="executeTitle">¿Quieres ejecutar la orden?</h1>
            <p className="executeSubtitle">Se trasladará la información a la</p>
            <p className="executeSubtitle">Tarea por Lote.</p>
          </IonRow>
          <IonRow className="boxButtons">
            <IonCol>
              <IonButton buttonType="outline" className="executeCancelButtom" expand="block" onClick={props.onCancel}>
                Cancelar
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={props.onConfirm}>
                Ejecutar Orden
              </IonButton>
            </IonCol>
          </IonRow>
        </IonContent>    
      </IonModal>
    </div>
  )
}