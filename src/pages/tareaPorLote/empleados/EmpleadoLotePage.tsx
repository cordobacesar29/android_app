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
import { useHistory } from "react-router-dom";
import { add } from "ionicons/icons";
import { EmpleadoAddModal } from "./EmpleadoAddModal";
import { EmpleadoCard } from "./EmpleadoCard";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";
import { IEmpleadoModel } from "../../../utils/models/empleadoModel";
import { PATH_PAGE } from "../../../utils/routes";
import { enableMaquinariaTab } from "../../../utils/helpers/tabs/enableMaquinariaTab";
import { ISelect } from "../../../interfaces/ISelect";
import {
  getConceptos,
  getEmpleados,
  getTareaByCode,
} from "../../../services/store/queryStore";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { IComponentsRoute } from "../../../utils/models/ComponentRoutes";

export const EmpleadoLotePage = (props: IComponentsRoute) => {
  let history = useHistory();
  const { tareaPorLote } = useTareaPorLote();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [empleados, setEmpleados] = useState<ISelect[]>([]);
  const [empleadosFiltered, setEmpleadosFiltered] = useState<ISelect[]>([]);
  const [dataEmployee, setDataEmployee] = useState<any[]>([]);
  const [conceptos, setConceptos] = useState<ISelect[]>([]);
  const [dataConcepts, setDataConcepts] = useState<any[]>([]);

  const handleModalOpen = (value: boolean): void => {
    setIsOpen(value);
  };

  useEffect(() => {
    const getData = async () => {
      const { data: dataEmpleadosDB, selects: empleados } = await getEmpleados();
      const codes = tareaPorLote.empleados.map(e => e.codEmpleado);
      const result = empleados.filter(({key}) => !codes.includes(key));

      setEmpleadosFiltered(result);
      setEmpleados(empleados);
      setDataEmployee(dataEmpleadosDB);
      const { data: dataConcepts, selects: conceptos } = await getConceptos();
      setConceptos(conceptos);
      setDataConcepts(dataConcepts);
      setLoading(false);
    };
    getData();
  }, [isOpen]);

  const nextTab = async () => {
    const tarea = await getTareaByCode(tareaPorLote.lote.codTarea);
    if (enableMaquinariaTab(tareaPorLote.lote, tarea)) {
      history.push(PATH_PAGE.tareaPorLote.maquinaria);
    } else {
      history.push(PATH_PAGE.tareaPorLote.resumen);
    }
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
              {tareaPorLote.empleados &&
                tareaPorLote.empleados.length > 0 &&
                tareaPorLote.empleados.map(
                  (e: IEmpleadoModel) => {
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
            empleados={empleadosFiltered}
            conceptos={conceptos}
            dataEmployee={dataEmployee}
            dataConcepts={dataConcepts}
          />
        </>
      )}
    </>
  );
};
