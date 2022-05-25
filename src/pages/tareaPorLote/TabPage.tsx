import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getTareaByCode } from "../../services/store/queryStore";
import { enableEmpleadoTab } from "../../utils/helpers/tabs/enableEmpleadoTab";
import { enableInsumoTab } from "../../utils/helpers/tabs/enableInsumoTab";
import { enableMaquinariaTab } from "../../utils/helpers/tabs/enableMaquinariaTab";
import { enableResumenTab } from "../../utils/helpers/tabs/enableResumenTab";
import { useTareaPorLote } from "../../utils/hooks/useTareaPorLote";
import { PATH_PAGE } from "../../utils/routes";

export const TabPage: React.FC = () => {
  const location = useLocation();
  const [segmentSelected, setSegmentSelected] = useState<string>(
    location.pathname
  );
  const { tareaPorLote } = useTareaPorLote();
  const [insumoTab, setInsumoTab] = useState<boolean>(true);
  const [empleadoTab, setEmpleadoTab] = useState<boolean>(true);
  const [maquinariaTab, setMaquinariaTab] = useState<boolean>(true);
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
      const tarea = await getTareaByCode(tareaPorLote.lote.codTarea);
      setMaquinariaTab(!enableMaquinariaTab(tareaPorLote.lote, tarea));
      setInsumoTab(!enableInsumoTab(tarea));
      setEmpleadoTab(!enableEmpleadoTab(tareaPorLote.lote));
      setResumenTab(!enableResumenTab(tareaPorLote.lote));
    };
    controlTabs();
  }, [tareaPorLote.lote]);

  return (
    <IonSegment value={segmentSelected} scrollable>
      <Link className="link-route-tabs" to={PATH_PAGE.tareaPorLote.lote}>
        <IonSegmentButton
          value={PATH_PAGE.tareaPorLote.lote}
          id={PATH_PAGE.tareaPorLote.lote}
        >
          <IonLabel className="labelSegmentTasks">Lote</IonLabel>
        </IonSegmentButton>
      </Link>
      <Link
        className="link-route-tabs"
        to={insumoTab ? "#" : PATH_PAGE.tareaPorLote.insumo}
      >
        <IonSegmentButton
          value={PATH_PAGE.tareaPorLote.insumo}
          disabled={insumoTab}
          id={PATH_PAGE.tareaPorLote.insumo}
        >
          <IonLabel className="labelSegmentTasks">Insumos</IonLabel>
        </IonSegmentButton>
      </Link>
      <Link
        className="link-route-tabs"
        to={empleadoTab ? "#" : PATH_PAGE.tareaPorLote.empleado}
      >
        <IonSegmentButton
          value={PATH_PAGE.tareaPorLote.empleado}
          disabled={empleadoTab}
          id={PATH_PAGE.tareaPorLote.empleado}
        >
          <IonLabel className="labelSegmentTasks">Empleados</IonLabel>
        </IonSegmentButton>
      </Link>
      <Link
        className="link-route-tabs"
        to={maquinariaTab ? "#" : PATH_PAGE.tareaPorLote.maquinaria}
      >
        <IonSegmentButton
          value={PATH_PAGE.tareaPorLote.maquinaria}
          disabled={maquinariaTab}
          id={PATH_PAGE.tareaPorLote.maquinaria}
        >
          <IonLabel className="labelSegmentTasks">Maquinaria</IonLabel>
        </IonSegmentButton>
      </Link>
      <Link
        className="link-route-tabs"
        to={resumenTab ? "#" : PATH_PAGE.tareaPorLote.resumen}
      >
        <IonSegmentButton
          value={PATH_PAGE.tareaPorLote.resumen}
          disabled={resumenTab}
          id={PATH_PAGE.tareaPorLote.resumen}
        >
          <IonLabel className="labelSegmentTasks">Resumen</IonLabel>
        </IonSegmentButton>
      </Link>
    </IonSegment>
  );
};
