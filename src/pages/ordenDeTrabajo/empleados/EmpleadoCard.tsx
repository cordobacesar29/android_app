import React, { useState } from "react";
import {
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonPopover,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { ellipsisVertical, pencil, trash } from "ionicons/icons";
import { getEmpleadoName } from "../../../utils/selectors/getEmpleado";
import { getConceptoName } from "../../../utils/selectors/getConcepto";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "../../../utils/routes/paths";
import { IEmpleadoModel } from "../../../utils/models/empleadoModel";
import { IPopOver } from "../../../interfaces/IPopOver";
import YesNoAlert from "../../../components/shared/alerts/YesNoAlert";
import { ISelect } from "../../../interfaces/ISelect";
import { useOrdenDeTrabajo } from "../../../utils/hooks/useOrdenDeTrabajo";

const style = {
  textDecoration: "none",
};
interface ICard extends IEmpleadoModel {
  empleados: ISelect[];
  conceptos: ISelect[];
}
export const EmpleadoCard: React.FC<ICard> = (props: ICard) => {
  const ordenContext = useOrdenDeTrabajo();
  const [popoverState, setShowPopover] = useState<IPopOver>({
    showPopover: false,
    event: undefined,
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { empleados, conceptos } = props;

  const confirm = (): void => {
    ordenContext.removeEmpleado(props.id);
    setShowAlert(false);
  };

  const cancel = (): void => {
    setShowAlert(false);
  };

  const handlePopDelete = (): void => {
    setShowAlert(true);
    setShowPopover({ showPopover: false, event: undefined });
  };

  return (
    <>
      <IonCard className="cardEmployee">
        <IonCardContent>
          <IonRow>
            <IonCol size="8">
              <b>Empleado:</b> {getEmpleadoName(props.codEmpleado, empleados)}
            </IonCol>
            <IonCol size="3">
              <b>Legajo:</b>{" "}
              {props?.legajo || ""}
            </IonCol>
            <IonCol className="ion-text-end" size="1">
              <IonPopover
                cssClass="my-custom-class"
                event={popoverState.event}
                isOpen={popoverState.showPopover}
                onDidDismiss={() =>
                  setShowPopover({ showPopover: false, event: undefined })
                }
              >
                <IonList slot="content">
                  <Link
                    to={`${PATH_PAGE.ordenDeTrabajo.empleado}/${props.id}`}
                    style={style}
                  >
                    <IonItem>
                      <IonLabel>
                        <IonIcon slot="start" icon={pencil} /> Editar
                      </IonLabel>
                    </IonItem>
                  </Link>
                  <IonItem onClick={handlePopDelete}>
                    <IonLabel>
                      <IonIcon slot="start" icon={trash} /> Borrar
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonPopover>

              <span
                onClick={(e: any) => {
                  e.persist();
                  setShowPopover({ showPopover: true, event: e });
                }}
              >
                <IonIcon slot="start" icon={ellipsisVertical} />
              </span>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="8">
              <b>Concepto:</b> {getConceptoName(props.codConcepto, conceptos)}
            </IonCol>
            <IonCol size="4">
              <b>Cant.:</b> {props.cantidad}
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>

      <YesNoAlert
        isOpen={showAlert}
        header={"Eliminar"}
        message={"¿Esta seguro que desea eliminar el Empleado?"}
        onConfirm={confirm}
        onCancel={cancel}
      />
    </>
  );
};
