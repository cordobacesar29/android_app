import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getTareaByCode } from "../../services/store/queryStore";
import { enableEmpleadoTab } from "../../utils/helpers/tabs/enableEmpleadoTab";
import { enableInsumoTab } from "../../utils/helpers/tabs/enableInsumoTab";
import { enableResumenTab } from "../../utils/helpers/tabs/enableResumenTab";
import { useOrdenDeTrabajo } from "../../utils/hooks/useOrdenDeTrabajo";
import { PATH_PAGE } from "../../utils/routes";

export const TabPage: React.FC = () => {
  const location = useLocation();
  const [segmentSelected, setSegmentSelected] = useState<string>(
    location.pathname
  );
  const { ordenDeTrabajo } = useOrdenDeTrabajo();
  const [insumoTab, setInsumoTab] = useState<boolean>(true);
  const [empleadoTab, setEmpleadoTab] = useState<boolean>(true);
  const [asignacionTab, setAsignacionTab] = useState<boolean>(true);
  const [resumenTab, setResumenTab] = useState<boolean>(true);

  const changeFocus = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "auto",
      block: "end",
    });
  };
  useEffect(() => {
    setSegmentSelected(location.pathname);
    changeFocus(location.pathname);
  });

  useEffect(() => {
    const controlTabs = async () => {
      const tarea = await getTareaByCode(ordenDeTrabajo.lote.codTarea);
      setInsumoTab(!enableInsumoTab(tarea));
      setEmpleadoTab(!enableEmpleadoTab(ordenDeTrabajo.lote));
      setAsignacionTab(!enableEmpleadoTab(ordenDeTrabajo.lote));
      setResumenTab(
        !enableResumenTab(ordenDeTrabajo.lote, ordenDeTrabajo.asignacion)
      );
    };
    controlTabs();
  }, [ordenDeTrabajo.lote, ordenDeTrabajo.asignacion]);

  return (
    <IonSegment value={segmentSelected} scrollable={true}>
      <Link className="link-route-tabs" to={PATH_PAGE.ordenDeTrabajo.lote}>
        <IonSegmentButton
          value={PATH_PAGE.ordenDeTrabajo.lote}
          id={PATH_PAGE.ordenDeTrabajo.lote}
        >
          <IonLabel className="labelSegmentTasks">Lote</IonLabel>
        </IonSegmentButton>
      </Link>

      <Link
        className="link-route-tabs"
        to={insumoTab ? "#" : PATH_PAGE.ordenDeTrabajo.insumo}
      >
        <IonSegmentButton
          value={PATH_PAGE.ordenDeTrabajo.insumo}
          id={PATH_PAGE.ordenDeTrabajo.insumo}
          disabled={insumoTab}
        >
          <IonLabel className="labelSegmentTasks">Insumos</IonLabel>
        </IonSegmentButton>
      </Link>

      <Link
        className="link-route-tabs"
        to={empleadoTab ? "#" : PATH_PAGE.ordenDeTrabajo.empleado}
      >
        <IonSegmentButton
          value={PATH_PAGE.ordenDeTrabajo.empleado}
          id={PATH_PAGE.ordenDeTrabajo.empleado}
          disabled={empleadoTab}
        >
          <IonLabel className="labelSegmentTasks">Empleados</IonLabel>
        </IonSegmentButton>
      </Link>

      <Link
        className="link-route-tabs"
        to={asignacionTab ? "#" : PATH_PAGE.ordenDeTrabajo.asignacion}
      >
        <IonSegmentButton
          value={PATH_PAGE.ordenDeTrabajo.asignacion}
          id={PATH_PAGE.ordenDeTrabajo.asignacion}
          disabled={asignacionTab}
        >
          <IonLabel className="labelSegmentTasks">Asignaciones</IonLabel>
        </IonSegmentButton>
      </Link>

      <Link
        className="link-route-tabs"
        to={resumenTab ? "#" : PATH_PAGE.ordenDeTrabajo.resumen}
      >
        <IonSegmentButton
          value={PATH_PAGE.ordenDeTrabajo.resumen}
          id={PATH_PAGE.ordenDeTrabajo.resumen}
          disabled={resumenTab}
        >
          <IonLabel className="labelSegmentTasks">Resumen</IonLabel>
        </IonSegmentButton>
      </Link>
    </IonSegment>
  );
};
