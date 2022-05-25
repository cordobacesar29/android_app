import {
  IonButtons,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import ConfirmYesNoAlert from "../../components/shared/alerts/ConfirmYesNoAlert";
import { AsignacionPage } from "../../pages/ordenDeTrabajo/asignacion/AsignacionPage";
import { EmpleadoEditPage } from "../../pages/ordenDeTrabajo/empleados/EmpleadoEditPage";
import { EmpleadoPage } from "../../pages/ordenDeTrabajo/empleados/EmpleadoPage";
import { InicioPage } from "../../pages/ordenDeTrabajo/inicio/InicioPage";
import { InsumoEditPage } from "../../pages/ordenDeTrabajo/insumos/InsumoEditPage";
import { InsumoPage } from "../../pages/ordenDeTrabajo/insumos/InsumoPage";
import { LotePage } from "../../pages/ordenDeTrabajo/lote/LotePage";
import { ResumenPage } from "../../pages/ordenDeTrabajo/resumen/ResumenPage";
import { TabPage } from "../../pages/ordenDeTrabajo/TabPage";
import { PATH_PAGE } from "./paths";

export const OrdenDeTrabajoRoutes: React.FC = () => {
  const location = useLocation();
  let history: any = useHistory();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleCancel = () => {
    setShowAlert(!showAlert);
  };
  const confirm = (): void => {
    setShowAlert(false);
    history.replace(PATH_PAGE.ordenDeTrabajo.home);
  };
  return (
    <IonPage>
      {location.pathname !== PATH_PAGE.ordenDeTrabajo.home && (
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start" className="iconBackTask" onClick={handleCancel}>
              <IonIcon slot="start" md={arrowBack} />
            </IonButtons>
            <IonTitle className="titleTask">Orden de trabajo</IonTitle>
          </IonToolbar>
          <TabPage />
        </IonHeader>
      )}

      <Switch>
        <Route path={PATH_PAGE.ordenDeTrabajo.lote} exact={true}>
          <LotePage showAlert={showAlert} setShowAlert={setShowAlert} />
        </Route>

        <Route path={PATH_PAGE.ordenDeTrabajo.insumo} exact={true}>
          <InsumoPage showAlert={showAlert} setShowAlert={setShowAlert} />
        </Route>

        <Route path={PATH_PAGE.ordenDeTrabajo.empleado} exact>
          <EmpleadoPage showAlert={showAlert} setShowAlert={setShowAlert} />
        </Route>

        <Route path={`${PATH_PAGE.ordenDeTrabajo.empleado}/:id`} exact>
          <EmpleadoEditPage />
        </Route>

        <Route path={`${PATH_PAGE.ordenDeTrabajo.insumo}/:id`} exact>
          <InsumoEditPage />
        </Route>

        <Route path={PATH_PAGE.ordenDeTrabajo.asignacion} exact>
          <AsignacionPage showAlert={showAlert} setShowAlert={setShowAlert} />
        </Route>

        <Route path={PATH_PAGE.ordenDeTrabajo.resumen} exact>
          <ResumenPage showAlert={showAlert} setShowAlert={setShowAlert} />
        </Route>

        <Route path={""} component={InicioPage} exact />

        <Redirect to={PATH_PAGE.home.default} />
      </Switch>
      {showAlert && (
        <ConfirmYesNoAlert
          header={"Cancelar"}
          message={"¿Esta seguro que desea cancelar la orden de trabajo?"}
          onConfirm={confirm}
          onCancel={handleCancel}
        />
      )}
    </IonPage>
  );
};
