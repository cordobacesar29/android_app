import { useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonFooter,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";
import { ResumenCard } from "./ResumenCard";
import { PATH_PAGE } from "../../../utils/routes";
import { makeRandomId } from "../../../utils/helpers/createUniqueId";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import moment from "moment";
import { getLastPeriodo } from "../../../services/store/queryStore";
import { setOrdenExecuted } from "../../../services/store/queryStoreOrdenes";
import { IComponentsRoute } from "../../../utils/models/ComponentRoutes";

export const ResumenPage = (props: IComponentsRoute) => {
  const tarea = useTareaPorLote();
  let history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [observaciones, setObservaciones] = useState<string>(
    tarea.tareaPorLote.observacionesTarea
  );

  const save = async () => {
    setLoading(true);
    var periodo = await getLastPeriodo();
    tarea.tareaPorLote.codPeriodo = periodo.codigo;
    tarea.tareaPorLote.observacionesTarea = observaciones;
    tarea.tareaPorLote.fechaCarga = moment(new Date()).format();
    tarea.tareaPorLote.id = makeRandomId();
    await tarea.addTareaPorLote(tarea.tareaPorLote, true);
    
    if (tarea.tareaPorLote.ordenId) {
      setOrdenExecuted(tarea.tareaPorLote.ordenId);
    }

    setLoading(false);
    history.replace(PATH_PAGE.tareaPorLote.home);
  };
  return (
    <>
      {loading ? (
        <ComponentsLoader loading={loading} />
      ) : (
        <>
          <IonContent>
            <IonGrid>
              {tarea.tareaPorLote && (
                <ResumenCard
                  observaciones={observaciones}
                  setObservaciones={setObservaciones}
                />
              )}
            </IonGrid>
          </IonContent>
          <IonFooter>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  onClick={save}
                  className="btnTasksNext"
                >
                  Guardar
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  color="light"
                  onClick={() => props.setShowAlert(true)}
                  className="btnTasksCancel"
                >
                  Cancelar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonFooter>
        </>
      )}
    </>
  );
};
