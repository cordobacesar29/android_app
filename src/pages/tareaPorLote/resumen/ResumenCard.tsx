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
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";
import RadioGroup from "../../../components/shared/inputs/radioGroup";
import { IInsumoModel } from "../../../utils/models/insumoModel";
import { InsumoCard } from "../insumos/InsumoCard";
import { IEmpleadoModel } from "../../../utils/models/empleadoModel";
import { EmpleadoCard } from "../empleados/EmpleadoCard";
import { IMaquinariaModel } from "../../../utils/models/maquinariaModel";
import { MaquinariaCard } from "../maquinaria/MaquinariaCard";
import { getContratistaName } from "../../../utils/selectors/getContratistas";
import { getImputas } from "../../../utils/selectors/getInputa";
import { getEstablecimiento } from "../../../utils/selectors/getEstablecimiento";
import { getTarea } from "../../../utils/selectors/getTareas";
import { getLote } from "../../../utils/selectors/getLotes";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "../../../utils/routes";
import { enableInsumoTab } from "../../../utils/helpers/tabs/enableInsumoTab";
import { enableMaquinariaTab } from "../../../utils/helpers/tabs/enableMaquinariaTab";
import { getDateFormated } from "../../../utils/selectors/getDateFormated";
import { ISelect } from "../../../interfaces/ISelect";
import {
  getInsumos,
  getDepositos,
  getEmpleados,
  getConceptos,
  getMaquinarias,
  getContratistas,
  getTareas,
  getEstablecimientos,
  getLotes,
  getImputasA,
  getTareaByCode,
  getEmpresasServicios,
} from "../../../services/store/queryStore";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { TareasModel } from "../../../services/modules/tareas/TareasModel";
import Input from "../../../components/shared/inputs/input";
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
  const { tareaPorLote } = useTareaPorLote();
  const [establecimientos, setEstablecimientos] = useState<ISelect[]>([]);
  const [lotes, setLotes] = useState<ISelect[]>([]);
  const [tareas, setTareas] = useState<ISelect[]>([]);
  const [contratistas, setContratistas] = useState<ISelect[]>([]);
  const [insumos, setInsumos] = useState<ISelect[]>([]);
  const [depositos, setDepositos] = useState<ISelect[]>([]);
  const [empleados, setEmpleados] = useState<ISelect[]>([]);
  const [conceptos, setConceptos] = useState<ISelect[]>([]);
  const [maquinarias, setMaquinarias] = useState<ISelect[]>([]);
  const [empresas, setEmpresas] = useState<ISelect[]>([]);
  const [imputaA, setImputaA] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tarea, setTarea] = useState<TareasModel>();
  const [periodos, setPeriodos] = useState<ISelect[]>([]);

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
      const { selects: empresas } = await getEmpresasServicios();
      setEmpresas(empresas);
      const { selects: maquinarias } = await getMaquinarias();
      setMaquinarias(maquinarias);
      const { selects: contratistas } = await getContratistas();
      setContratistas(contratistas);
      const { selects: tareas } = await getTareas();
      setTareas(tareas);
      const { selects: establecimientos } = await getEstablecimientos();
      setEstablecimientos(establecimientos);
      const { selects: lotes } = await getLotes();
      setLotes(lotes);
      const { selects: imputaA } = await getImputasA();
      setImputaA(imputaA);
      const tarea = await getTareaByCode(tareaPorLote.lote.codTarea);
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
                      <Link to={`${PATH_PAGE.tareaPorLote.lote}`} style={style}>
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
                    <IonCol>{getPeriodoName(tareaPorLote.codPeriodo, periodos)}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Fecha*</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>{getDateFormated(tareaPorLote.lote.fecha)}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Parte Nro.</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>{tareaPorLote.lote.parte}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Inputa a*</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {
                        getImputas(
                          tareaPorLote.lote.imputaA!,
                          imputaA
                        ) /* Imputa A */
                      }
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
                        tareaPorLote.lote.codEstablecimiento,
                        establecimientos
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Lote</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>{getLote(tareaPorLote.lote.codLote!, lotes)}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Tarea</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {getTarea(tareaPorLote.lote.codTarea, tareas)}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <b>Cantidad</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>{tareaPorLote.lote.cantidad}</IonCol>
                  </IonRow>
                  <RadioGroup
                    label="Propia/contratista"
                    readOnly={true}
                    value={
                      typeof tareaPorLote.lote.propia === "string"
                        ? tareaPorLote.lote.propia === "P"
                          ? true
                          : false
                        : tareaPorLote.lote.propia
                    }
                    items={[
                      { key: "Propia", value: true },
                      { key: "Contratista", value: false },
                    ]}
                    handleBlur={(e: any) => {}}
                    onChange={(e: any) => {}}
                  ></RadioGroup>
                  {!!tareaPorLote.lote.codContratista && (
                    <>
                      <IonRow>
                        <IonCol>
                          <b>Contratista</b>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          {getContratistaName(
                            tareaPorLote?.lote?.codContratista,
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
              {tareaPorLote.insumos && enableInsumoTab(tarea) && (
                <>
                  <IonCardContent className="ContentResume">
                    <IonRow>
                      <IonCol>
                        <h2 className="h2Tasks">Insumos</h2>
                      </IonCol>
                      <IonCol className="ion-text-end">
                        <Link
                          to={`${PATH_PAGE.tareaPorLote.insumo}`}
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
                  {tareaPorLote.insumos.length > 0 &&
                    tareaPorLote.insumos.map((i: IInsumoModel, index) => {
                      return (
                        <InsumoCard
                          key={i.id}
                          id={i.id}
                          codArticulo={i.codArticulo}
                          cantidad={i.cantidad}
                          codDeposito={i.codDeposito}
                          insumos={insumos}
                          depositos={depositos}
                        />
                      );
                    })}
                </>
              )}
              {tareaPorLote.empleados && (
                <>
                  <IonCardContent className="ContentResume">
                    <IonRow>
                      <IonCol>
                        <h2 className="h2Tasks">Empleados</h2>
                      </IonCol>
                      <IonCol className="ion-text-end">
                        <Link
                          to={`${PATH_PAGE.tareaPorLote.empleado}`}
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
                  {tareaPorLote.empleados.length > 0 &&
                    tareaPorLote.empleados.map((e: IEmpleadoModel, index) => {
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
              {tareaPorLote.maquinaria &&
                enableMaquinariaTab(tareaPorLote.lote, tarea) && (
                  <>
                    <IonCardContent className="ContentResume">
                      <IonRow>
                        <IonCol>
                          <h2 className="h2Tasks">Máquinas</h2>
                        </IonCol>
                        <IonCol className="ion-text-end">
                          <Link
                            to={
                              tareaPorLote.lote.propia
                                ? `${PATH_PAGE.tareaPorLote.maquinaria}`
                                : "#"
                            }
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
                    {tareaPorLote.maquinaria.length > 0 &&
                      tareaPorLote.maquinaria.map(
                        (m: IMaquinariaModel, index) => {
                          return (
                            <MaquinariaCard
                              key={m.id}
                              id={m.id}
                              maquinariaCod={m.maquinariaCod}
                              empresaCod={m.empresaCod}
                              hsKm={m.hsKm}
                              insumos={m.insumos}
                              maquinarias={maquinarias}
                              empresas={empresas}
                            />
                          );
                        }
                      )}
                  </>
                )}
            </IonCol>
          </IonRow>
        </>
      )}
    </>
  );
};
