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
import { pencil, ellipsisVertical, trashOutline } from "ionicons/icons";
import { getInsumoName } from "../../../utils/selectors/getInsumo";
import { getDepositoName } from "../../../utils/selectors/getDeposito";
import { IInsumoModel } from "../../../utils/models/insumoModel";
import { IPopOver } from "../../../interfaces/IPopOver";
import { PATH_PAGE } from "../../../utils/routes";
import { Link } from "react-router-dom";
import YesNoAlert from "../../../components/shared/alerts/YesNoAlert";
import { ISelect } from "../../../interfaces/ISelect";
import { useOrdenDeTrabajo } from "../../../utils/hooks/useOrdenDeTrabajo";

const style = {
  textDecoration: "none",
};
interface ICard extends IInsumoModel {
  insumos: ISelect[];
  depositos: ISelect[];
}
export const InsumoCard: React.FC<ICard> = (props: ICard) => {
  const { insumos, depositos } = props;
  const ordenContext = useOrdenDeTrabajo();
  const [popoverState, setShowPopover] = useState<IPopOver>({
    showPopover: false,
    event: undefined,
  });

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const handlePopDelete = (): void => {
    setShowAlert(true);
    setShowPopover({ showPopover: false, event: undefined });
  };

  const confirm = (): void => {
    ordenContext.removeInsumo(props.id);
    setShowAlert(false);
  };

  const cancel = (): void => {
    setShowAlert(false);
  };

  return (
    <>
      <IonCard className="cardSupplie">
        <IonCardContent>
          <IonRow>
            <IonCol size="7">
              <b>Insumo:</b> {getInsumoName(props.codArticulo, insumos)}
            </IonCol>
            <IonCol className="ion-text-start" size="4">
              <b>Cant.:</b> {props.cantidad}
            </IonCol>
            <IonCol className="ion-text-start" size="1">
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
                    to={`${PATH_PAGE.ordenDeTrabajo.insumo}/${props.id}`}
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
                      <IonIcon slot="start" icon={trashOutline} /> Borrar
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
            <IonCol size="7">
              <b>Depósito:</b> {getDepositoName(props.codDeposito, depositos)}
            </IonCol>
            <IonCol className="ion-text-start" size="4">
              <b>Dosis:</b> {props.dosis}
            </IonCol>
            <IonCol size="1">
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>

      <YesNoAlert
        isOpen={showAlert}
        header={"Eliminar"}
        message={"¿Esta seguro que desea eliminar el insumo?"}
        onConfirm={confirm}
        onCancel={cancel}
      />
    </>
  );
};
