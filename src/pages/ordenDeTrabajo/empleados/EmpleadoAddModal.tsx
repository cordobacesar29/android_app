import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonRow,
  IonCol,
} from "@ionic/react";
import * as Yup from "yup";
import Input from "../../../components/shared/inputs/input";
import { useFormik } from "formik";
import { IEmpleadoModel } from "../../../utils/models/empleadoModel";
import { makeRandomId } from "../../../utils/helpers/createUniqueId";
import { useParams } from "react-router";
import { ISelect } from "../../../interfaces/ISelect";
import { ConceptoModel } from "../../../services/modules/conceptos/ConceptoModel";
import { EmpleadoModel } from "../../../services/modules/empleados/EmpleadoModel";
import SearchableSelect from "../../../components/shared/inputs/SearchableSelect";
import { useOrdenDeTrabajo } from "../../../utils/hooks/useOrdenDeTrabajo";

interface IPropsModal {
  isOpen: boolean;
  handleModalOpen(value: boolean): any;
  isNew: boolean;
  empleados: ISelect[];
  conceptos: ISelect[];
  dataEmployee: EmpleadoModel[];
  dataConcepts: ConceptoModel[];
}
const initialValue: IEmpleadoModel = {
  id: "",
  codEmpleado: 0,
  legajo: "",
  codConcepto: 0,
  cantidad: 0,
  tarifa: 0,
  importe: 0,
};
export const EmpleadoAddModal: React.FC<IPropsModal> = (props: IPropsModal) => {
  const ordenContext = useOrdenDeTrabajo();
  let { id }: any = useParams();
  const [empleado, setEmpleado] = useState<IEmpleadoModel>(initialValue);
  const { empleados, conceptos, dataEmployee, dataConcepts } = props;

  useEffect(() => {
    if (!props.isNew) {
      const emp: IEmpleadoModel = ordenContext.getEmpleado(id);
      setEmpleado(emp);
    }
  }, [props.isNew]);

  const formik = useFormik<IEmpleadoModel>({
    initialValues: empleado,
    validationSchema: Yup.object({
      codEmpleado: Yup.number()
        .required("Debe seleccionar una opción")
        .min(1, "Debe seleccionar una opción"),
      codConcepto: Yup.number()
        .required("Debe seleccionar un valor")
        .min(1, "Debe seleccionar una opción"),
      cantidad: Yup.number()
        .required("Debe ingresar un valor")
        .min(1, "Debe ingresar un valor"),
    }),
    enableReinitialize: true,
    onSubmit: async (values: IEmpleadoModel) => {
      if (props.isNew) {
        values.id = makeRandomId();
        ordenContext.addEmpleado(values);
        formik.resetForm();
      } else {
        // EDICION
        values.id = id;
        ordenContext.editEmpleado(values);
      }
    },
  });

  const getLegajo = (codEmpleado: number | undefined): number | string => {
    const emp = dataEmployee.find((emp) => emp.codigo === codEmpleado);
    return emp?.legajo && emp?.legajo !== null ? emp.legajo : "";
  };

  useEffect(() => {
    if (formik.touched.codEmpleado) {
      const emp = dataEmployee.find(
        (emp) => emp.codigo === formik.values.codEmpleado
      );
      const con = dataConcepts.find((con) => con.codigo === emp?.codConcepto);
      formik.setFieldValue("codConcepto", con?.codigo ?? 0);
    }
  }, [formik.values.codEmpleado]);

  const getTarifa = (codConcepto: number | undefined): number => {
    const con = dataConcepts.find((con) => con.codigo === codConcepto);
    return con?.valorUnitario!;
  };

  return (
    <>
      {props.isOpen ? (
        <IonModal isOpen={props.isOpen}>
          <IonHeader translucent>
            <IonToolbar>
              <IonTitle color="primary">Cargar Empleado</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={(): void => props.handleModalOpen(false)}>
                  Cancelar
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <IonRow>
                <IonCol>
                  <SearchableSelect
                    label="Empleado"
                    isRequired={true}
                    value={
                      formik.values.codEmpleado !== 0 &&
                      formik.values.codEmpleado
                    }
                    placeholder="Selecione un empleado"
                    items={empleados}
                    error={
                      formik.touched.codEmpleado && formik.errors.codEmpleado
                        ? formik.errors.codEmpleado
                        : undefined
                    }
                    handleBlur={() => formik.setFieldTouched("codEmpleado")}
                    onChange={(e: any) =>
                      formik.setFieldValue("codEmpleado", e)
                    }
                  ></SearchableSelect>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <Input
                    label="Legajo"
                    disabled={true}
                    isRequired={false}
                    value={getLegajo(formik.values.codEmpleado)}
                    type="text"
                    placeholder="Legajo"
                    error={
                      formik.touched.legajo && formik.errors.legajo
                        ? formik.errors.legajo
                        : undefined
                    }
                    onKeyPress={(e: any) => {}}
                    handleBlur={() => {}}
                    onChange={(e: any) =>
                      formik.setFieldValue("legajo", e.detail.value)
                    }
                  ></Input>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <SearchableSelect
                    isRequired={true}
                    label="Concepto"
                    value={
                      formik.values.codConcepto !== 0 &&
                      formik.values.codConcepto
                    }
                    placeholder="Seleccione concepto"
                    items={conceptos}
                    error={
                      formik.touched.codConcepto && formik.errors.codConcepto
                        ? formik.errors.codConcepto
                        : undefined
                    }
                    handleBlur={() => formik.setFieldTouched("codConcepto")}
                    onChange={(e: any) =>
                      formik.setFieldValue("codConcepto", e)
                    }
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
                    placeholder="Cantidad"
                    error={
                      formik.touched.cantidad && formik.errors.cantidad
                        ? formik.errors.cantidad
                        : undefined
                    }
                    onKeyPress={(e: any) => {}}
                    handleBlur={formik.handleBlur("cantidad")}
                    onChange={(e: any) => {
                      formik.setFieldValue("cantidad", e.detail.value);
                      formik.setFieldValue(
                        "importe",
                        e.detail.value * getTarifa(formik.values.codConcepto)
                      );
                    }}
                  ></Input>
                </IonCol>
                <IonCol>
                  <Input
                    label="Tarifa"
                    disabled={true}
                    isRequired={false}
                    value={getTarifa(formik.values.codConcepto)}
                    type="number"
                    placeholder="Tarifa"
                    error={
                      formik.touched.tarifa && formik.errors.tarifa
                        ? formik.errors.tarifa
                        : undefined
                    }
                    onKeyPress={(e: any) => {}}
                    handleBlur={formik.handleBlur("tarifa")}
                    onChange={(e: any) =>
                      formik.setFieldValue("tarifa", e.detail.value)
                    }
                  ></Input>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <Input
                    label="Importe"
                    disabled={true}
                    isRequired={false}
                    value={
                      formik.values.cantidad *
                      getTarifa(formik.values.codConcepto)
                    }
                    type="number"
                    placeholder="Importe"
                    error={
                      formik.touched.importe && formik.errors.importe
                        ? formik.errors.importe
                        : undefined
                    }
                    onKeyPress={(e: any) => {}}
                    handleBlur={formik.handleBlur("importe")}
                    onChange={() => {}}
                  ></Input>
                </IonCol>
              </IonRow>
              <IonRow className="button-modal">
                <IonCol>
                  <IonButton
                    expand="block"
                    type="submit"
                    className="btnTasksNext"
                    color="secondary"
                    disabled={
                      !(formik.isValid && (formik.dirty || id !== undefined))
                    }
                    onClick={() => props.handleModalOpen(false)}
                  >
                    {props.isNew ? "Agregar Empleado" : "Editar Empleado"}
                  </IonButton>
                </IonCol>
              </IonRow>
            </form>
          </IonContent>
        </IonModal>
      ) : null}
    </>
  );
};
