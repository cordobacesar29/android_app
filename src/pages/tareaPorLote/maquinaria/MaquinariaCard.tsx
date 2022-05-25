import React, { useEffect, useState } from "react";
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
import {
  add,
  ellipsisVertical,
  pencil,
  trash,
} from "ionicons/icons";
import { getMaquinaria } from "../../../utils/selectors/getMaquinaria";
import { getEmpresa } from "../../../utils/selectors/getEmpresas";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "../../../utils/routes/paths";
import { IMaquinariaModel } from "../../../utils/models/maquinariaModel";
import { IInsumoModel } from "../../../utils/models/insumoModel";
import { IPopOver } from "../../../interfaces/IPopOver";
import { MaquinariaInsumoCard } from "./MaquinariaInsumoCard";
import YesNoAlert from "../../../components/shared/alerts/YesNoAlert";
import { ISelect } from "../../../interfaces/ISelect";

const style = {
  textDecoration: "none",
};
interface ICard extends IMaquinariaModel {
  maquinarias: ISelect[];
  empresas: ISelect[];
}
export const MaquinariaCard: React.FC<ICard> = (props: ICard) => {
  const tarea = useTareaPorLote();
  const [popoverState, setShowPopover] = useState<IPopOver>({
    showPopover: false,
    event: undefined,
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { maquinarias, empresas } = props;
  const [canDelete, setCanDelete] = useState<boolean>(false);

  const handlePopDelete = (): void => {
    setShowAlert(true);
    setShowPopover({ showPopover: false, event: undefined });
  };

  const confirm = (): void => {
    tarea.removeMaquinaria(props.id);
    setShowAlert(false)
  }

  const cancel = (): void => {
    setShowAlert(false)
  }

  useEffect(() => {
    const index = tarea.tareaPorLote.maquinaria.findIndex(m => m.id == `${props.id}`);
    const canDelete = (tarea.tareaPorLote.maquinaria.length == 1 && index == 0) || index > 0;
    setCanDelete(canDelete);
  }, [tarea.tareaPorLote.maquinaria]);

  return (
    <>
      <IonCard className="cardMachinery">
        <IonCardContent>
          <IonRow>
            <IonCol size="6">
              <b>Máquina:</b>{" "}
              {getMaquinaria(props.maquinariaCod, maquinarias)}
            </IonCol>
            <IonCol className="ion-text-end" size="5">
              <b>Hs/KM:</b> {props.hsKm === 0 ? "" : props.hsKm}
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
                    to={`${PATH_PAGE.tareaPorLote.addInsumoInMaquinaria}/${props.id}`}
                    style={style}
                  >
                    <IonItem>
                      <IonLabel>
                        <IonIcon slot="start" icon={add} /> Agregar Insumo
                      </IonLabel>
                    </IonItem>
                  </Link>
                  <Link
                    to={`${PATH_PAGE.tareaPorLote.maquinaria}/${props.id}`}
                    style={style}
                  >
                    <IonItem>
                      <IonLabel>
                        <IonIcon slot="start" icon={pencil} /> Editar
                      </IonLabel>
                    </IonItem>
                  </Link>
                  { canDelete ?
                    (<IonItem onClick={handlePopDelete}>
                      <IonLabel>
                        <IonIcon slot="start" icon={trash} /> Borrar
                      </IonLabel>
                    </IonItem>)
                    : null
                  }
                </IonList>
              </IonPopover>
              <span
                onClick={(e: any): void => {
                  e.persist();
                  setShowPopover({ showPopover: true, event: e });
                }}
              >
                <IonIcon slot="start" icon={ellipsisVertical} />
              </span>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <b>Empresa:</b> {getEmpresa(props.empresaCod, empresas)}
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>

      {props.insumos &&
        props.insumos.length > 0 &&
        props.insumos.map((i: IInsumoModel, index) => {
          return (
            <IonCol offset="1" align-self-start size="12" key={index} className="colMachineSuplie">
              <MaquinariaInsumoCard
                key={i.id}
                idInsumo={i.id}
                idMaquinaria={props.id}
                codArticulo={i.codArticulo}
                cantidad={i.cantidad}
                codDeposito={i.codDeposito}
              />
            </IonCol>
          );
        })}

      <YesNoAlert
        isOpen={showAlert}
        header={'Eliminar'}
        message={'¿Esta seguro que desea eliminar la Maquinaria?'}
        onConfirm={confirm}
        onCancel={cancel}
      />
    </>
  );
};
