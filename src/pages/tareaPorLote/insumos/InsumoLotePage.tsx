import { useEffect, useState } from "react";
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
import { InsumoAddModal } from "./InsumoAddModal";
import { InsumoCard } from "./InsumoCard";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";
import { IInsumoModel } from "../../../utils/models/insumoModel";
import { ACTIONS } from "../../../utils/helpers/actions";
import { PATH_PAGE } from "../../../utils/routes";
import { Link } from "react-router-dom";

import { ISelect } from "../../../interfaces/ISelect";
import { getInsumos, getDepositos } from "../../../services/store/queryStore";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { IComponentsRoute } from "../../../utils/models/ComponentRoutes";

export const InsumoLotePage = (props: IComponentsRoute) => {
  const tarea = useTareaPorLote();
  const { tareaPorLote } = tarea;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [insumos, setInsumos] = useState<ISelect[]>([]);
  const [insumosFiltered, setInsumosFiltered] = useState<ISelect[]>([]);
  const [depositos, setDepositos] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const { selects: insumos } = await getInsumos();
      const codes = tareaPorLote.insumos.map(i => i.codArticulo);
      const result = insumos.filter(({key}) => !codes.includes(key));

      setInsumosFiltered(result);
      setInsumos(insumos);
      const { selects: depositos } = await getDepositos();
      setDepositos(depositos);
      setLoading(false);
    };
    getData();
  }, [isOpen]);

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
              {tareaPorLote.insumos &&
                tareaPorLote.insumos.length > 0 &&
                tareaPorLote.insumos.map((i: IInsumoModel) => {
                  return (
                    <InsumoCard
                      key={i.id}
                      id={i.id}
                      codArticulo={i.codArticulo}
                      cantidad={i.cantidad}
                      codDeposito={i.codDeposito}
                      dosis={i.dosis}
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
                <Link to={PATH_PAGE.tareaPorLote.empleado}>
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
            insumos={insumosFiltered}
            depositos={depositos}
          />
        </>
      )}
    </>
  );
};
