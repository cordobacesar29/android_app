import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCheckbox,
  IonIcon,
  IonLabel,
  IonGrid,
  IonRow,
  IonButton,
  IonCol,
} from "@ionic/react";
import { alertCircleOutline, checkmarkCircle } from "ionicons/icons";
import { IOrdenDeTrabajoCard } from "../../../interfaces/IOrdenDeTrabajoCard";
import { getDateFormated } from "../../../utils/selectors/getDateFormated";

interface IProps {
  ordenDeTrabajo: IOrdenDeTrabajoCard;
  setIdOrden(id: number): void;
  cancelExecute(): void;
  handleOpenExecute(): void;
  onChange(id: number, isChecked: boolean): void;
}

export const OrdenDeTrabajoCard: React.FC<IProps> = (props: IProps) => {
  return (
    <IonCard
      className={`ordenTrabajoCardSyncTask ${
        props.ordenDeTrabajo.isChecked && "orderIsChecked"
      }`}
    >
      <IonCardHeader className="headerTask">
        <div className="calendarTask">
          <IonCheckbox
            className={
              props.ordenDeTrabajo.isChecked
                ? "ordenTrabajoCardCheckBoxChecked"
                : "ordenTrabajoCardCheckBoxUnchecked"
            }
            checked={props.ordenDeTrabajo.isChecked}
            onIonChange={(e) =>
              props.onChange(props.ordenDeTrabajo.id!, e.detail.checked)
            }
          />
          <IonLabel
            className={`ordenTrabajoLabelTask ${
              props.ordenDeTrabajo.isChecked
                ? "ordenTrabajoLabelTaskChecked"
                : "ordenTrabajoLabelTaskUnchecked"
            }`}
          >
            {getDateFormated(props.ordenDeTrabajo.fecha)}
          </IonLabel>
        </div>
        <div className="syncTask">
          {props.ordenDeTrabajo.isSync ? (
            <div className="syncronized">
              <IonIcon
                size="small"
                slot="start"
                md={checkmarkCircle}
                className="syncronizedIcon"
              />
              <IonLabel className="syncronizedText">SINCRONIZADO</IonLabel>
            </div>
          ) : (
            <div className="notSyncronized">
              <IonIcon
                size="small"
                slot="start"
                md={alertCircleOutline}
                className="syncronizedIcon"
              />
              <IonLabel className="syncronizedText">SIN SINCRONIZAR</IonLabel>
            </div>
          )}
        </div>
      </IonCardHeader>
      <IonCardContent className="contentCardOrder">
        <IonCol>
          <IonLabel className="textCampania">
            {props.ordenDeTrabajo.campania}
          </IonLabel>
        </IonCol>
        <IonGrid className="gridCardTasks">
          <div className="ordenTrabajoIconCardRigthTask">
            <div className="textCardOT">
              <b>Actividad: </b>
              <small>{props.ordenDeTrabajo.actividad}</small>
            </div>
            <div className="textCardOT">
              <b>Estab: </b>
              <small>{props.ordenDeTrabajo.establecimiento}</small>
            </div>
            <div className="textCardOT">
              <b>Tarea: </b>
              <small>{props.ordenDeTrabajo.tarea}</small>
            </div>
          </div>
          <div className="ordenTrabajoIconCardLeftTask">
            <div className="textCardOT">
              <b>Número: </b>
              <small>
                {props.ordenDeTrabajo.numero === 0
                  ? "-"
                  : props.ordenDeTrabajo.numero}
              </small>
            </div>
            <div className="textCardOT">
              <b>Lote: </b>
              <small>{props.ordenDeTrabajo.lote}</small>
            </div>
            <div className="textCardOT">
              <b>Cant: </b>
              <small>{props.ordenDeTrabajo.cantidad}</small>
            </div>
          </div>
        </IonGrid>
        <IonButton
          className="btnSyncCardOT"
          expand="block"
          color={"secondary"}
          disabled={props.ordenDeTrabajo.ejecutada === "S"}
          onClick={() => {
            props.handleOpenExecute();
            props.setIdOrden(props.ordenDeTrabajo.id);
          }}
        >
          {props.ordenDeTrabajo.ejecutada === "S"
            ? "Orden ejecutada"
            : "Ejecutar orden"}
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};
