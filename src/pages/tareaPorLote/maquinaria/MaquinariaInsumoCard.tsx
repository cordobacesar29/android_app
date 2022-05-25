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
  pencil,
  trash,
  ellipsisVertical,
} from "ionicons/icons";
import { getInsumoName } from "../../../utils/selectors/getInsumo";
import { getDepositoName } from "../../../utils/selectors/getDeposito";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";
import {IPopOver} from '../../../interfaces/IPopOver';
import { PATH_PAGE } from "../../../utils/routes";
import { Link } from "react-router-dom";
import { IMaquinariaInsumo } from "../../../interfaces/IMaquinariaInsumo";
import YesNoAlert from "../../../components/shared/alerts/YesNoAlert";
import { InsumosService } from "../../../services/modules/insumos/InsumosService";
import { ISelect } from "../../../interfaces/ISelect";
import { InsumoModel } from "../../../services/modules/insumos/InsumoModel";
import { DepositoService } from "../../../services/modules/depositos/DepositoService";
import { DepositoModel } from "../../../services/modules/depositos/DepositoModel";

const style = {
  textDecoration: "none",
};

export const MaquinariaInsumoCard: React.FC<IMaquinariaInsumo> = (props: IMaquinariaInsumo) => {
  const tarea = useTareaPorLote();
  const [popoverState, setShowPopover] = useState<IPopOver>({
    showPopover: false,
    event: undefined,
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [insumos, setInsumos] = useState<ISelect[]>([]);
  const [depositos, setDepositos] = useState<ISelect[]>([]);

  useEffect(() => {
    const getInsumos = async () => {
      const response = await InsumosService.getFromDb();
      const data = response.map(
        (insumo: InsumoModel): ISelect => ({
          key: insumo.codArticulo,
          value: insumo.descripcion,
        })
      );
      setInsumos(data);
    };
    const getDepositos = async () => {
      const response = await DepositoService.getFromDb();
      const data = response.map(
        (deposito: DepositoModel): ISelect => ({
          key: deposito.codDeposito,
          value: deposito.descripcion,
        })
      );
      setDepositos(data);
    };
    getInsumos();
    getDepositos();
  }, []);

  const handlePopDelete = ():void => {
    setShowAlert(true)
    setShowPopover({ showPopover: false, event: undefined })
  };
  
  const confirm = (): void => {
    tarea.removeInsumoFromMaquinaria(props.idInsumo, props.idMaquinaria);
    setShowAlert(false)
  }

  const cancel = (): void => {
    setShowAlert(false)
  }

  return (
    <>
          <IonCard className="cardMachinerySupplie">
            <IonCardContent>
              <IonRow>
                <IonCol size="8">
                  <b>Insumo:</b> {getInsumoName(props.codArticulo, insumos)}
                </IonCol>
                <IonCol className="ion-text-end" size="3">
                  <b>Cant.:</b> {props.cantidad}
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
                      <Link to={`${PATH_PAGE.tareaPorLote.editInsumoInMaquinaria}/${props.idInsumo}/${props.idMaquinaria}`}
                        style={style}>
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
                <IonCol size="12">
                  <b>Depósito:</b> {getDepositoName(props.codDeposito, depositos)}
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
      <YesNoAlert
        isOpen={showAlert}
        header={'Eliminar'}
        message={'¿Esta seguro que desea eliminar el Insumo de la Maquinaria?'}
        onConfirm={confirm}
        onCancel={cancel}
      />
    </>
  );
};
