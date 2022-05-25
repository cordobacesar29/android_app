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
import { useHistory } from "react-router-dom";
import { add } from "ionicons/icons";
import { IEmpleadoModel } from "../../../utils/models/empleadoModel";
import { PATH_PAGE } from "../../../utils/routes";
import { ISelect } from "../../../interfaces/ISelect";
import { getConceptos, getEmpleados } from "../../../services/store/queryStore";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { EmpleadoCard } from "./EmpleadoCard";
import { EmpleadoAddModal } from "./EmpleadoAddModal";
import { useOrdenDeTrabajo } from "../../../utils/hooks/useOrdenDeTrabajo";
import { IComponentsRoute } from "../../../utils/models/ComponentRoutes";

export const EmpleadoPage: React.FC<IComponentsRoute> = (
  props: IComponentsRoute
) => {
  let history = useHistory();
  const { ordenDeTrabajo } = useOrdenDeTrabajo();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [empleados, setEmpleados] = useState<ISelect[]>([]);
  const [dataEmployee, setDataEmployee] = useState<any[]>([]);
  const [conceptos, setConceptos] = useState<ISelect[]>([]);
  const [dataConcepts, setDataConcepts] = useState<any[]>([]);

  const handleModalOpen = (value: boolean): void => {
    setIsOpen(value);
  };

  useEffect(() => {
    const getData = async () => {
      const { data: dataEmpleadosDB, selects: empleados } =
        await getEmpleados();
      setEmpleados(empleados);
      setDataEmployee(dataEmpleadosDB);
      const { data: dataConcepts, selects: conceptos } = await getConceptos();
      setConceptos(conceptos);
      setDataConcepts(dataConcepts);
      setLoading(false);
    };
    getData();
  }, []);

  const nextTab = (): void => {
    history.push(PATH_PAGE.ordenDeTrabajo.asignacion);
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
                    onClick={() => handleModalOpen(true)}
                  >
                    <IonIcon slot="start" icon={add} />
                    Agregar Empleado
                  </IonButton>
                </IonCol>
              </IonRow>
              {ordenDeTrabajo.empleados &&
                ordenDeTrabajo.empleados.length > 0 &&
                ordenDeTrabajo.empleados.map(
                  (e: IEmpleadoModel, index: number) => {
                    return (
                      <EmpleadoCard
                        key={e.id}
                        id={e.id}
                        codEmpleado={e.codEmpleado}
                        legajo={e.legajo}
                        codConcepto={e.codConcepto}
                        cantidad={e.cantidad}
                        empleados={empleados}
                        conceptos={conceptos}
                      />
                    );
                  }
                )}
            </IonGrid>
          </IonContent>
          <IonFooter>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  onClick={nextTab}
                  className="btnTasksNext"
                >
                  Continuar
                </IonButton>
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
          <EmpleadoAddModal
            isOpen={isOpen}
            handleModalOpen={handleModalOpen}
            isNew={true}
            empleados={empleados}
            conceptos={conceptos}
            dataEmployee={dataEmployee}
            dataConcepts={dataConcepts}
          />
        </>
      )}
    </>
  );
};
