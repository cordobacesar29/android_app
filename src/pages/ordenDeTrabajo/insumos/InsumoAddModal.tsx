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
  IonGrid,
} from "@ionic/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IInsumoModel } from "../../../utils/models/insumoModel";
import { makeRandomId } from "../../../utils/helpers/createUniqueId";
import { ACTIONS } from "../../../utils/helpers/actions";
import { useParams } from "react-router";
import { ISelect } from "../../../interfaces/ISelect";
import Input from "../../../components/shared/inputs/input";
import SearchableSelect from "../../../components/shared/inputs/SearchableSelect";
import { useOrdenDeTrabajo } from "../../../utils/hooks/useOrdenDeTrabajo";

interface IPropsModal {
  isOpen: boolean;
  handleModalOpen(value: boolean): any;
  action: string;
  insumos: ISelect[];
  depositos: ISelect[];
}

const initialValue: IInsumoModel = {
  id: "",
  codArticulo: 0,
  dosis: 0,
  cantidad: 0,
  codDeposito: 0,
};

export const InsumoAddModal: React.FC<IPropsModal> = (props: IPropsModal) => {
  const ordenContext = useOrdenDeTrabajo();
  const [insumo, setInsumo] = useState<IInsumoModel>(initialValue);
  const [hectareas, setHectareas] = useState<number>(0);
  const { id, maquinaria }: any = useParams();
  const { insumos, depositos } = props;
  let hasChangeCantidad = false;
  let hasChangeDosis = false;

  useEffect(() => {
    if (props.action === ACTIONS.insumo.edit) {
      const ins: IInsumoModel = ordenContext.getInsumo(id);
      setInsumo(ins);
    }

    setHectareas(ordenContext.ordenDeTrabajo.lote.cantidad ?? 0);
  }, [props.action]);

  const formik = useFormik<IInsumoModel>({
    initialValues: insumo,
    validationSchema: Yup.object({
      codArticulo: Yup.number()
        .required("Debe seleccionar una opción")
        .min(1, "Debe seleccionar una opción"),
      dosis: Yup.number()
        .required("Debe ingresar un valor")
        .moreThan(0, "Debe ingresar un valor"),
      cantidad: Yup.number()
        .required("Debe ingresar un valor")
        .moreThan(0, "Debe ingresar un valor"),
      codDeposito: Yup.number()
        .required("Debe ingresar un valor")
        .min(1, "Debe ingresar un valor"),
    }),
    enableReinitialize: true,
    onSubmit: async (values: IInsumoModel) => {
      switch (props.action) {
        case ACTIONS.insumo.add: {
          values.id = makeRandomId();          
          ordenContext.addInsumo(values);
          formik.resetForm();
          break;
        }
        case ACTIONS.insumo.edit: {
          ordenContext.editInsumo(values);
          formik.resetForm();
          break;
        }
      }
      props.handleModalOpen(false);
    },
  });

  const onChangeDosis = (e: any) => {
    if (hasChangeDosis) {
      const value = e.detail.value ?? 0;
      formik.setFieldValue("dosis", value);
      const cantidad = value * hectareas;
      formik.setFieldValue("cantidad", Math.round(cantidad));
      hasChangeDosis = false;
    }
  };

  const onChangeCantidad = (e: any) => {
    if (hasChangeCantidad) {
      const value = e.detail.value ?? 0;
      formik.setFieldValue("cantidad", value);

      if (hectareas > 0 && maquinaria === undefined) {
        const dosis = value / hectareas;
        formik.setFieldValue("dosis", dosis.toFixed(4));
      }
      hasChangeCantidad = false;
    }
  };

  const getButtonLabel = (action: string): string => {
    if (action === ACTIONS.insumo.edit) {
      return "Editar Insumo";
    } else {
      return "Agregar Insumo";
    }
  };

  return (
    <>
      <IonModal isOpen={props.isOpen}>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle color="primary">Cargar insumo</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => props.handleModalOpen(false)}>
                Cancelar
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <SearchableSelect
                    label="Insumo"
                    isRequired={true}
                    value={formik.values.codArticulo}
                    placeholder="Selecione un insumo"
                    items={insumos}
                    error={
                      formik.touched.codArticulo && formik.errors.codArticulo
                        ? formik.errors.codArticulo
                        : undefined
                    }
                    handleBlur={() => formik.setFieldTouched("codArticulo")}
                    onChange={(e: any) =>
                      formik.setFieldValue("codArticulo", e)
                    }
                  ></SearchableSelect>
                </IonCol>
              </IonRow>
              <IonRow>
                {maquinaria === undefined ? (
                  <IonCol>
                    <Input
                      label="Dosis"
                      isRequired={true}
                      value={formik.values.dosis !== 0 && formik.values.dosis}
                      type="number"
                      placeholder="Dosis"
                      error={
                        formik.touched.dosis && formik.errors.dosis
                          ? formik.errors.dosis
                          : undefined
                      }
                      onKeyPress={(e) => (hasChangeDosis = true)}
                      handleBlur={formik.handleBlur("dosis")}
                      onChange={onChangeDosis}
                      step="0.0001"
                    ></Input>
                  </IonCol>
                ) : undefined}
                <IonCol>
                  <Input
                    label="Cantidad"
                    isRequired={true}
                    value={
                      formik.values.cantidad !== 0 && formik.values.cantidad
                    }
                    type="number"
                    placeholder="Cantidad"
                    error={
                      formik.touched.cantidad && formik.errors.cantidad
                        ? formik.errors.cantidad
                        : undefined
                    }
                    onKeyPress={(e) => (hasChangeCantidad = true)}
                    handleBlur={formik.handleBlur("cantidad")}
                    onChange={onChangeCantidad}
                  ></Input>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <SearchableSelect
                    label="Depósito"
                    isRequired={true}
                    value={formik.values.codDeposito}
                    placeholder="Seleccione un depósito"
                    items={depositos}
                    error={
                      formik.touched.codDeposito && formik.errors.codDeposito
                        ? formik.errors.codDeposito
                        : undefined
                    }
                    handleBlur={() => formik.setFieldTouched("codDeposito")}
                    onChange={(e: any) =>
                      formik.setFieldValue("codDeposito", e)
                    }
                  ></SearchableSelect>
                </IonCol>
              </IonRow>

              <IonRow className="button-modal">
                <IonCol>
                  <IonButton
                    color="secondary"
                    className="btnTasksNext"
                    expand="block"
                    type="submit"
                    disabled={
                      !(formik.isValid && (formik.dirty || id !== undefined))
                    }
                  >
                    {getButtonLabel(props.action)}
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
        </IonContent>
      </IonModal>
    </>
  );
};
