import React, { useEffect, useState } from "react";
import {
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItemDivider,
} from "@ionic/react";
import { pencil } from "ionicons/icons";
import RadioGroup from "../../../components/shared/inputs/radioGroup";
import { IInsumoModel } from "../../../utils/models/insumoModel";
import { IEmpleadoModel } from "../../../utils/models/empleadoModel";
import { getContratistaName } from "../../../utils/selectors/getContratistas";
import { getEstablecimiento } from "../../../utils/selectors/getEstablecimiento";
import { getEmpleadoName } from "../../../utils/selectors/getEmpleado";
import { getTarea } from "../../../utils/selectors/getTareas";
import { getLote } from "../../../utils/selectors/getLotes";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "../../../utils/routes";
import { enableInsumoTab } from "../../../utils/helpers/tabs/enableInsumoTab";
import { getDateFormated } from "../../../utils/selectors/getDateFormated";
import { ISelect } from "../../../interfaces/ISelect";
import {
  getInsumos,
  getDepositos,
  getEmpleados,
  getConceptos,
  getContratistas,
  getTareas,
  getEstablecimientos,
  getLotes,
  getTareaByCode,
  getCuentas,
} from "../../../services/store/queryStore";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { TareasModel } from "../../../services/modules/tareas/TareasModel";
import Input from "../../../components/shared/inputs/input";
import { InsumoCard } from "../insumos/InsumoCard";
import { EmpleadoCard } from "../empleados/EmpleadoCard";
import { useOrdenDeTrabajo } from "../../../utils/hooks/useOrdenDeTrabajo";
import { getCuenta } from "../../../utils/selectors/getCuenta";
import { getAllPeriodos } from "../../../services/store/queryStoreOrdenes";
import { getPeriodoName } from "../../../utils/selectors/getPeriodo";

const style = {
  textDecoration: "none",
};
interface IPropsModal {
  observaciones: string;
  setObservaciones(value: string): void;
}

export const ResumenCard: React.FC<IPropsModal> = (props: IPropsModal) => {
  const [establecimientos, setEstablecimientos] = useState<ISelect[]>([]);
  const [lotes, setLotes] = useState<ISelect[]>([]);
  const [tareas, setTareas] = useState<ISelect[]>([]);
  const [contratistas, setContratistas] = useState<ISelect[]>([]);
  const [insumos, setInsumos] = useState<ISelect[]>([]);
  const [periodos, setPeriodos] = useState<ISelect[]>([]);
  const [depositos, setDepositos] = useState<ISelect[]>([]);
  const [empleados, setEmpleados] = useState<ISelect[]>([]);
  const [conceptos, setConceptos] = useState<ISelect[]>([]);
  const [cuentas, setCuentas] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tarea, setTarea] = useState<TareasModel>();

  const { ordenDeTrabajo } = useOrdenDeTrabajo();

  useEffect(() => {
    const getData = async () => {
      const { selects: insumos } = await getInsumos();
      setInsumos(insumos);
      const { selects: periodos } = await getAllPeriodos();
      setPeriodos(periodos);
      const { selects: depositos } = await getDepositos();
      setDepositos(depositos);
      const { selects: empleados } = await getEmpleados();
      setEmpleados(empleados);
      const { selects: conceptos } = await getConceptos();
      setConceptos(conceptos);
      const { selects: cuentas } = await getCuentas();
      setCuentas(cuentas);
      const { selects: contratistas } = await getContratistas();
      setContratistas(contratistas);
      const { selects: tareas } = await getTareas();
      setTareas(tareas);
      const { selects: establecimientos } = await getEstablecimientos();
      setEstablecimientos(establecimientos);
      const { selects: lotes } = await getLotes();
      setLotes(lotes);
      const tarea = await getTareaByCode(ordenDeTrabajo.lote.codTarea);
      setTarea(tarea);

      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <ComponentsLoader loading={loading} />
      ) : (
        <>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardContent>
                  <IonRow>
                    <IonCol>
                      <h2 className="h2Tasks">
                        <b>Lote</b>
                      </h2>
                    </IonCol>
                    <IonCol className="ion-text-end">
                      <Link
                        to={`${PATH_PAGE.ordenDeTrabajo.lote}`}
                        style={style}
                      >
                        <IonIcon
                          size="large"
                          slot="start"
                          md={pencil}
                          color="primary"
                        />
                      </Link>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Campaña*</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>{getPeriodoName(ordenDeTrabajo.codPeriodo, periodos)}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Fecha*</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {getDateFormated(ordenDeTrabajo.lote.fecha)}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Actividad*</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {getCuenta(ordenDeTrabajo.lote.codLoteActividad, cuentas)}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Establecimiento*</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {getEstablecimiento(
                        ordenDeTrabajo.lote.codEstablecimiento,
                        establecimientos
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Lote*</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {getLote(ordenDeTrabajo.lote.codLote!, lotes)}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Tarea*</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {getTarea(ordenDeTrabajo.lote.codTarea, tareas)}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Cantidad*</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>{ordenDeTrabajo.lote.cantidad}</IonCol>
                  </IonRow>
                  <RadioGroup
                    label="Propia/Contratista"
                    readOnly={true}
                    value={
                      typeof ordenDeTrabajo.lote.propia === "string"
                        ? ordenDeTrabajo.lote.propia === "P"
                          ? true
                          : false
                        : ordenDeTrabajo.lote.propia
                    }
                    items={[
                      { key: "Propia", value: true },
                      { key: "Contratista", value: false },
                    ]}
                    handleBlur={(e: any) => {}}
                    onChange={(e: any) => {}}
                  ></RadioGroup>
                  {!ordenDeTrabajo.lote.propia && (
                    <>
                      <IonRow>
                        <IonCol>
                          <b>Contratista</b>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          {getContratistaName(
                            ordenDeTrabajo?.lote?.codContratista,
                            contratistas
                          )}
                        </IonCol>
                      </IonRow>
                    </>
                  )}
                  <IonRow>
                    <IonCol>
                      <Input
                        label="Observaciones"
                        isRequired={false}
                        value={props.observaciones}
                        type="text"
                        placeholder="Escribe tus observaciones"
                        handleBlur={(e: any) => {}}
                        onKeyPress={(e: any) => {}}
                        onChange={(e: any) =>
                          props.setObservaciones(e.detail.value)
                        }
                      ></Input>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
              <IonItemDivider></IonItemDivider>
              {ordenDeTrabajo.insumos && enableInsumoTab(tarea) && (
                <>
                  <IonCardContent className="ContentResume">
                    <IonRow>
                      <IonCol>
                        <h2 className="h2Tasks">Insumos</h2>
                      </IonCol>
                      <IonCol className="ion-text-end">
                        <Link
                          to={`${PATH_PAGE.ordenDeTrabajo.insumo}`}
                          style={style}
                        >
                          <IonIcon
                            size="large"
                            slot="start"
                            md={pencil}
                            color="primary"
                          />
                        </Link>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                  {ordenDeTrabajo.insumos.length > 0 &&
                    ordenDeTrabajo.insumos.map((i: IInsumoModel, index) => {
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
                </>
              )}
              {ordenDeTrabajo.empleados && (
                <>
                  <IonCardContent className="ContentResume">
                    <IonRow>
                      <IonCol>
                        <h2 className="h2Tasks">Empleados</h2>
                      </IonCol>
                      <IonCol className="ion-text-end">
                        <Link
                          to={`${PATH_PAGE.ordenDeTrabajo.empleado}`}
                          style={style}
                        >
                          <IonIcon
                            size="large"
                            slot="start"
                            md={pencil}
                            color="primary"
                          />
                        </Link>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                  {ordenDeTrabajo.empleados.length > 0 &&
                    ordenDeTrabajo.empleados.map((e: IEmpleadoModel, index) => {
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
                    })}
                </>
              )}
              <IonItemDivider></IonItemDivider>
              <IonCard>
                <IonCardContent>
                  <IonRow>
                    <IonCol>
                      <h2 className="h2Tasks">
                        <b>Asignaciones</b>
                      </h2>
                    </IonCol>
                    <IonCol className="ion-text-end">
                      <Link
                        to={`${PATH_PAGE.ordenDeTrabajo.asignacion}`}
                        style={style}
                      >
                        <IonIcon
                          size="large"
                          slot="start"
                          md={pencil}
                          color="primary"
                        />
                      </Link>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Técnico*</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {getEmpleadoName(
                        ordenDeTrabajo.asignacion.tecnicoCod,
                        empleados
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Supervisor*</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {getEmpleadoName(
                        ordenDeTrabajo.asignacion.supervisorCod,
                        empleados
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Justificación*</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>{ordenDeTrabajo.asignacion.justificacion}</IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </>
      )}
    </>
  );
};
