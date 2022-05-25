import { useEffect, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonFooter,
} from "@ionic/react";
import Calendar from "../../../components/shared/inputs/calendar";
import Input from "../../../components/shared/inputs/input";
import RadioGroup from "../../../components/shared/inputs/radioGroup";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { useFormikLote } from "./useFormikLote";
import { ISelect } from "../../../interfaces/ISelect";
import {
  getTareas,
  getContratistas,
  getImputasA,
  getEstablecimientosByPeriodo,
  getLotesByEstablecimiento,
  getLoteActividad,
  getLastPeriodo,
} from "../../../services/store/queryStore";
import SearchableSelect from "../../../components/shared/inputs/SearchableSelect";
import { PeriodoModel } from "../../../services/modules/periodos/PeriodoModel";
import Select from "../../../components/shared/inputs/Select";
import { IComponentsRoute } from "../../../utils/models/ComponentRoutes";

export const LotePage = (props: IComponentsRoute) => {
  const [establecimientos, setEstablecimientos] = useState<ISelect[]>([]);
  const [lotes, setLotes] = useState<ISelect[]>([]);
  const [tareas, setTareas] = useState<ISelect[]>([]);
  const [contratistas, setContratistas] = useState<ISelect[]>([]);
  const [imputas, setImputas] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [periodo, setPeriodo] = useState<PeriodoModel>();
  const { formik } = useFormikLote();

  useEffect(() => {
    const getData = async () => {
      const periodo = await getLastPeriodo();
      setPeriodo(periodo);
      if (periodo) {
        formik.setFieldValue("codPeriodo", periodo.codigo);
      }
      const establecimientos = await getEstablecimientosByPeriodo(); // select con codigo
      setEstablecimientos(establecimientos);
      const { selects: tareas } = await getTareas(); //tareas con codigos
      setTareas(tareas);
      const { selects: contratistas } = await getContratistas(); // contratistas con codigo
      setContratistas(contratistas);
      const { selects: imputas } = await getImputasA(); // usa id??
      setImputas(imputas);
      await handleGetLotes();
      setLoading(false);
    };
    getData();
  }, []);

  const handleGetLotes = async () => {
    const lotes = await getLotesByEstablecimiento(
      formik.values.codEstablecimiento!
    );
    setLotes(lotes);

    const lote = lotes.find((l) => l.key == formik.values.codLote);
    if (!lote) {
      formik.setFieldValue("codLote", undefined);
    }
  };

  useEffect(() => {
    if (!loading) {
      handleGetLotes();
    }
  }, [formik.values.codEstablecimiento]);

  useEffect(() => {
    const handleGetCantidad = async () => {
      const loteActividad = await getLoteActividad(
        formik.values.codEstablecimiento!,
        formik.values.codLote!
      );

      formik.setFieldValue("codArea", loteActividad?.codActividad ?? "");
      formik.setFieldValue("cantidad", loteActividad?.superficie ?? "");
      formik.setFieldValue("codLoteActividad", loteActividad?.codigo);
    };

    if (!loading) {
      handleGetCantidad();
    }
  }, [formik.values.codLote]);

  return (
    <>
      {loading ? (
        <ComponentsLoader loading={loading} />
      ) : (
        <>
          <IonContent>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <Input
                      disabled={true}
                      label="Campaña"
                      isRequired={false}
                      value={periodo?.descripcion}
                      type="text"
                      placeholder={""}
                      error={""}
                      handleBlur={() => {}}
                      onKeyPress={() => {}}
                      onChange={() => {}}
                    ></Input>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Calendar
                      label="Fecha"
                      isRequired={true}
                      value={formik.values.fecha}
                      placeholder="dd/mm/aaaa"
                      error={
                        formik.touched.fecha ? formik.errors.fecha : undefined
                      }
                      handleBlur={formik.handleBlur("fecha")}
                      onChange={(e: any) =>
                        formik.setFieldValue("fecha", e.detail.value)
                      }
                    ></Calendar>
                  </IonCol>
                  <IonCol>
                    <Input
                      label="Parte Nro."
                      isRequired={false}
                      value={formik.values.parte}
                      type="number"
                      placeholder="Parte Nro"
                      error={
                        formik.touched.parte && formik.errors.parte
                          ? formik.errors.parte
                          : undefined
                      }
                      handleBlur={formik.handleBlur("parte")}
                      onChange={(e: any) =>
                        formik.setFieldValue("parte", e.detail.value)
                      }
                      onKeyPress={(e: any) => {}}
                    ></Input>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Select
                      label="Imputa a"
                      isRequired={true}
                      value={formik.values.imputaA}
                      placeholder="Selecione actividad"
                      items={imputas}
                      error={
                        formik.touched.imputaA && formik.errors.imputaA
                          ? formik.errors.imputaA
                          : undefined
                      }
                      handleBlur={formik.handleBlur("imputaA")}
                      onChange={(e: any) => {
                        formik.setFieldValue("imputaA", e.detail.value);
                        formik.setFieldValue("lote", undefined);
                        formik.setFieldValue("codEstablecimiento", undefined);
                      }}
                    ></Select>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Select
                      label="Establecimiento"
                      isRequired={true}
                      value={formik.values.codEstablecimiento}
                      placeholder="Selecione establecimiento"
                      items={establecimientos}
                      multiple={false}
                      error={
                        formik.touched.codEstablecimiento &&
                        formik.errors.codEstablecimiento
                          ? formik.errors.codEstablecimiento
                          : undefined
                      }
                      handleBlur={formik.handleBlur("codEstablecimiento")}
                      onChange={(e: any) =>
                        formik.setFieldValue(
                          "codEstablecimiento",
                          e.detail.value
                        )
                      }
                    ></Select>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <SearchableSelect
                      value={formik.values.codLote}
                      label="Lote"
                      disabled={formik.values.imputaA === "E"}
                      isRequired={formik.values.imputaA === "A"}
                      placeholder="Selecione lote"
                      items={lotes}
                      error={
                        formik.touched.codLote && formik.errors.codLote
                          ? formik.errors.codLote.toString()
                          : undefined
                      }
                      handleBlur={() => formik.setFieldTouched("codLote")}
                      onChange={(e: any) => formik.setFieldValue("codLote", e)}
                    ></SearchableSelect>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <SearchableSelect
                      label="Tarea"
                      isRequired={true}
                      value={formik.values.codTarea}
                      placeholder="Selecione tarea"
                      items={tareas}
                      error={
                        formik.touched.codTarea && formik.errors.codTarea
                          ? formik.errors.codTarea
                          : undefined
                      }
                      handleBlur={() => formik.setFieldTouched("codTarea")}
                      onChange={(e: any) => formik.setFieldValue("codTarea", e)}
                    ></SearchableSelect>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Input
                      label="Cantidad"
                      isRequired={true}
                      value={formik.values.cantidad}
                      type="number"
                      step="0.1"
                      placeholder="Cantidad"
                      error={
                        formik.touched.cantidad && formik.errors.cantidad
                          ? formik.errors.cantidad
                          : undefined
                      }
                      handleBlur={formik.handleBlur("cantidad")}
                      onKeyPress={(e: any) => {}}
                      onChange={(e: any) =>
                        formik.setFieldValue("cantidad", e.detail.value)
                      }
                    ></Input>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="rowRadioGroup">
                    <RadioGroup
                      label="Propia/contratista"
                      value={
                        typeof formik.values.propia === "string"
                          ? formik.values.propia === "P"
                            ? true
                            : false
                          : formik.values.propia
                      }
                      error={
                        formik.touched.propia && formik.errors.propia
                          ? formik.errors.propia
                          : undefined
                      }
                      items={[
                        { key: "Propia", value: true },
                        { key: "Contratista", value: false },
                      ]}
                      handleBlur={formik.handleBlur}
                      onChange={(e: any) =>
                        formik.setFieldValue("propia", e.detail.value)
                      }
                    ></RadioGroup>
                  </IonCol>
                </IonRow>
                {formik.values.propia === false ||
                (typeof formik.values.propia === "string" &&
                  formik.values.propia === "C") ? (
                  <IonRow>
                    <IonCol>
                      <Select
                        label="Contratista"
                        isRequired={true}
                        value={formik.values.codContratista}
                        placeholder="Selecione contratista"
                        items={contratistas}
                        error={
                          formik.touched.codContratista &&
                          formik.errors.codContratista
                            ? formik.errors.codContratista
                            : undefined
                        }
                        handleBlur={formik.handleBlur("codContratista")}
                        onChange={(e: any) =>
                          formik.setFieldValue("codContratista", e.detail.value)
                        }
                      ></Select>
                    </IonCol>
                  </IonRow>
                ) : undefined}
              </IonGrid>
            </form>
          </IonContent>
          <IonFooter>
            <IonRow>
              <IonCol>
                <IonButton
                  className="btnTasksNext"
                  expand="block"
                  disabled={!formik.isValid}
                  onClick={formik.submitForm}
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
        </>
      )}
    </>
  );
};
