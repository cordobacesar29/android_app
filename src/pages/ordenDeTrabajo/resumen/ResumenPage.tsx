import React, { useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonPage,
  IonHeader,
  IonFooter,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonTitle,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { PATH_PAGE } from "../../../utils/routes";
import { makeRandomId } from "../../../utils/helpers/createUniqueId";
import YesNoAlert from "../../../components/shared/alerts/YesNoAlert";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import moment from "moment";
import { TabPage } from "../TabPage";
import { ResumenCard } from "./ResumenCard";
import { useOrdenDeTrabajo } from "../../../utils/hooks/useOrdenDeTrabajo";
import { IComponentsRoute } from "../../../utils/models/ComponentRoutes";

export const ResumenPage: React.FC<IComponentsRoute> = (
  props: IComponentsRoute
) => {
  const ordenContext = useOrdenDeTrabajo();
  const [loading, setLoading] = useState<boolean>(false);
  const [observaciones, setObservaciones] = useState<string>(
    ordenContext.ordenDeTrabajo.observacionesTarea
  );

  let history = useHistory();

  const save = async () => {
    setLoading(true);
    ordenContext.ordenDeTrabajo.observacionesTarea = observaciones;
    ordenContext.ordenDeTrabajo.fechaCarga = moment(new Date()).format("YYYY-MM-DD")
    ordenContext.ordenDeTrabajo.horaCarga = moment(new Date()).format("hh:mm:ss")
    ordenContext.ordenDeTrabajo.codArea = 0;
    ordenContext.ordenDeTrabajo.id = makeRandomId();    
    await ordenContext.addOrdenDeTrabajo(ordenContext.ordenDeTrabajo, true);

    setLoading(false);
    history.replace(PATH_PAGE.ordenDeTrabajo.home);
  };
  return (
    <>
      {loading ? (
        <ComponentsLoader loading={loading} />
      ) : (
        <>
          <IonContent>
            <IonGrid>
              {ordenContext.ordenDeTrabajo && (
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
