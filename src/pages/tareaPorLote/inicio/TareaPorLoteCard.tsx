import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCheckbox,
  IonIcon,
  IonLabel,
  IonGrid,
  IonCol,
} from "@ionic/react";
import { alertCircleOutline, checkmarkCircle } from "ionicons/icons";
import { ISelect } from "../../../interfaces/ISelect";
import { ITareaPorLoteCard } from "../../../interfaces/ITareaPorLoteCard";
import { getDateFormated } from "../../../utils/selectors/getDateFormated";
import { getPeriodoName } from "../../../utils/selectors/getPeriodo";

interface IProps {
  tarea: ITareaPorLoteCard;
  onChange(id: number, isChecked: boolean): void;
  periodos: ISelect[];
}

export const TareaPorLoteCard: React.FC<IProps> = (props: IProps) => {
  
  return (
    <IonCard
      className={`cardSyncTask ${props.tarea.isChecked && "tareaIsChecked"}`}
    >
      <IonCardHeader className="headerTask">
        <div className="calendarTask">
          <IonCheckbox
            className={
              props.tarea.isChecked
                ? "tareaCardCheckBoxChecked"
                : "tareaCardCheckBoxUnchecked"
            }
            checked={props.tarea.isChecked}
            onIonChange={(e) =>
              props.onChange(props.tarea.id!, e.detail.checked)
            }
          />
          <IonLabel
            className={`tarealabelTask ${
              props.tarea.isChecked
                ? "tareaLabelTaskChecked"
                : "tareaLabelTaskUnchecked"
            }`}
          >
            {getDateFormated(props.tarea.fecha)}
          </IonLabel>
        </div>
        <div className="syncTask">
          {props.tarea.isSync ? (
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
      <IonCardContent className="contentCardTask">
        <IonCol>
          <IonLabel className="textCampania">            
            {getPeriodoName(props.tarea.codPeriodo, props.periodos)}
          </IonLabel>
        </IonCol>
        <IonGrid className="gridCardTasks">
          <div className="iconCardRigthTask">
            <div className="textTask">
              <b>Actividad: </b>
              <small>{props.tarea.imputaA}</small>
            </div>
            <div className="textTask">
              <b>Estab: </b>
              <small>{props.tarea.establecimiento}</small>
            </div>
            <div className="textTask">
              <b>Tarea: </b>
              <small>{props.tarea.tarea}</small>
            </div>
          </div>
          <div className="iconCardLeftTask">
            <div className="textTask">
              <b>Número: </b>
              <small>{props.tarea.parteNum}</small>
            </div>
            <div className="textTask">
              <b>Lote: </b>
              <small>{props.tarea.lote}</small>
            </div>
            <div className="textTask">
              <b>Cant: </b>
              <small>{props.tarea.cantidad}</small>
            </div>
          </div>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
