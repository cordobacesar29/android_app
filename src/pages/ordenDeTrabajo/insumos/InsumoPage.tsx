import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonFooter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { IInsumoModel } from "../../../utils/models/insumoModel";
import { ACTIONS } from "../../../utils/helpers/actions";
import { PATH_PAGE } from "../../../utils/routes";
import { Link, useHistory } from "react-router-dom";
import { ISelect } from "../../../interfaces/ISelect";
import { getInsumos, getDepositos } from "../../../services/store/queryStore";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { InsumoCard } from "./InsumoCard";
import { InsumoAddModal } from "./InsumoAddModal";
import { useOrdenDeTrabajo } from "../../../utils/hooks/useOrdenDeTrabajo";

import { IComponentsRoute } from "../../../utils/models/ComponentRoutes";

export const InsumoPage: React.FC<IComponentsRoute> = (
  props: IComponentsRoute
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [insumos, setInsumos] = useState<ISelect[]>([]);
  const [depositos, setDepositos] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const ordenContext = useOrdenDeTrabajo();
  const { ordenDeTrabajo } = ordenContext;

  useEffect(() => {
    const getData = async () => {
      const { selects: insumos } = await getInsumos();
      setInsumos(insumos);
      const { selects: depositos } = await getDepositos();
      setDepositos(depositos);
      setLoading(false);
    };
    getData();
  }, []);

  const handleModalOpen = (value: boolean): void => {
    setIsOpen(value);
  };

  return (
    <>
      {loading ? (
        <ComponentsLoader loading={loading} />
      ) : (
        <>
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    className="btnAddTasks"
                    expand="block"
                    color="secondary"
                    onClick={(): void => handleModalOpen(true)}
                  >
                    <IonIcon slot="start" icon={add} />
                    Agregar Insumo
                  </IonButton>
                </IonCol>
              </IonRow>
              {ordenDeTrabajo.insumos &&
                ordenDeTrabajo.insumos.length > 0 &&
                ordenDeTrabajo.insumos.map((i: IInsumoModel) => {
                  return (
                    <InsumoCard
                      key={i.id}
                      id={i.id}
                      codArticulo={i.codArticulo}
                      cantidad={i.cantidad}
                      dosis={i.dosis}
                      codDeposito={i.codDeposito}
                      insumos={insumos}
                      depositos={depositos}
                    />
                  );
                })}
            </IonGrid>
          </IonContent>
          <IonFooter>
            <IonRow>
              <IonCol>
                <Link to={PATH_PAGE.ordenDeTrabajo.empleado}>
                  <IonButton expand="block" className="btnTasksNext">
                    Continuar
                  </IonButton>
                </Link>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  className="btnTasksCancel"
                  expand="block"
                  color="light"
                  onClick={() => props.setShowAlert(true)}
                >
                  Cancelar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonFooter>
          <InsumoAddModal
            action={ACTIONS.insumo.add}
            isOpen={isOpen}
            handleModalOpen={handleModalOpen}
            insumos={insumos}
            depositos={depositos}
          />
        </>
      )}
    </>
  );
};
