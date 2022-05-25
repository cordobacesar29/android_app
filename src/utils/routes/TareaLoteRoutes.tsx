import {
  IonButtons,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { EmpleadoEditPage } from "../../pages/tareaPorLote/empleados/EmpleadoEditPage";
import { EmpleadoLotePage } from "../../pages/tareaPorLote/empleados/EmpleadoLotePage";
import { InicioPage } from "../../pages/tareaPorLote/inicio/InicioPage";
import { InsumoEditPage } from "../../pages/tareaPorLote/insumos/InsumoEditPage";
import { InsumoLotePage } from "../../pages/tareaPorLote/insumos/InsumoLotePage";
import { InsumoMaquinariaAddPage } from "../../pages/tareaPorLote/insumos/InsumoMaquinariaAdd";
import { InsumoMaquinariaEditPage } from "../../pages/tareaPorLote/insumos/InsumoMaquinariaEditPage";
import { LotePage } from "../../pages/tareaPorLote/lote/LotePage";
import { MaquinariaEditPage } from "../../pages/tareaPorLote/maquinaria/MaquinariaEditPage";
import { MaquinariaLotePage } from "../../pages/tareaPorLote/maquinaria/MaquinariaLotePage";
import { ResumenPage } from "../../pages/tareaPorLote/resumen/ResumenPage";
import { TabPage } from "../../pages/tareaPorLote/TabPage";
import { PATH_PAGE } from "./paths";
import ConfirmYesNoAlert from "../../components/shared/alerts/ConfirmYesNoAlert";

export const TareaLoteRoutes: React.FC = () => {
  const location = useLocation();
  let history: any = useHistory();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [pathFrom, setPathFrom] = useState<string>("");
  const handleCancel = () => {
    setShowAlert(!showAlert);
  };
  const confirm = (): void => {
    setShowAlert(false);
    if (!!pathFrom) {
      history.push(PATH_PAGE.ordenDeTrabajo.home);
    } else {
      history.push(PATH_PAGE.tareaPorLote.home);
    }
  };

  useEffect(() => {
    if (history.location?.state?.from === PATH_PAGE.ordenDeTrabajo.home) {
      setPathFrom(PATH_PAGE.ordenDeTrabajo.home);
    }
  }, [history.location?.state?.from])
  
  return (
    <IonPage>
      {location.pathname !== PATH_PAGE.tareaPorLote.home && (
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start" className="iconBackTask" onClick={handleCancel}>
              <IonIcon slot="start" md={arrowBack} />
            </IonButtons>
            <IonTitle className="titleTask">Tareas por lote</IonTitle>
          </IonToolbar>
          <TabPage />
        </IonHeader>
      )}

      <Switch>
        <Route path={PATH_PAGE.tareaPorLote.lote} exact={true}>
          <LotePage showAlert={showAlert} setShowAlert={setShowAlert} />
        </Route>

        <Route path={PATH_PAGE.tareaPorLote.insumo} exact={true}>
          <InsumoLotePage showAlert={showAlert} setShowAlert={setShowAlert} />
        </Route>

        <Route path={PATH_PAGE.tareaPorLote.empleado} exact={true}>
          <EmpleadoLotePage showAlert={showAlert} setShowAlert={setShowAlert} />
        </Route>

        <Route path={`${PATH_PAGE.tareaPorLote.empleado}/:id`} exact={true}>
          <EmpleadoEditPage />
        </Route>

        <Route path={PATH_PAGE.tareaPorLote.maquinaria} exact={true}>
          <MaquinariaLotePage
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        </Route>

        <Route path={`${PATH_PAGE.tareaPorLote.maquinaria}/:id`} exact={true}>
          <MaquinariaEditPage />
        </Route>

        <Route path={`${PATH_PAGE.tareaPorLote.insumo}/:id`} exact={true}>
          <InsumoEditPage />
        </Route>

        <Route
          path={`${PATH_PAGE.tareaPorLote.addInsumoInMaquinaria}/:maquinaria`}
          exact={true}
        >
          <InsumoMaquinariaAddPage />
        </Route>
        <Route
          path={`${PATH_PAGE.tareaPorLote.editInsumoInMaquinaria}/:id/:maquinaria`}
          exact={true}
        >
          <InsumoMaquinariaEditPage />
        </Route>
        <Route path={PATH_PAGE.tareaPorLote.resumen} exact={true}>
          <ResumenPage showAlert={showAlert} setShowAlert={setShowAlert} />
        </Route>
        <Route path={""} component={InicioPage} exact={true} />
        <Redirect to={PATH_PAGE.home.default} />
      </Switch>

      {showAlert && (
        <ConfirmYesNoAlert
          header={"Cancelar"}
          message={"¿Esta seguro que desea cancelar la tarea por lote?"}
          onConfirm={confirm}
          onCancel={handleCancel}
        />
      )}
    </IonPage>
  );
};
