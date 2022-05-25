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
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";
import { IMaquinariaModel } from "../../../utils/models/maquinariaModel";
import { makeRandomId } from "../../../utils/helpers/createUniqueId";
import { useParams } from "react-router";
import { ISelect } from "../../../interfaces/ISelect";
import { MaquinariaModel } from "../../../services/modules/maquinarias/MaquinariaModel";
import Select from "../../../components/shared/inputs/Select";

interface IPropsModal {
  isOpen: boolean;
  handleModalOpen(value: boolean): any;
  isNew: boolean;
  empresas: ISelect[];
  maquinarias: MaquinariaModel[];
}

const initialValue: IMaquinariaModel = {
  id: "",
  maquinariaCod: 0,
  empresaCod: 0,
  hsKm: 0,
  insumos: [],
};

export const MaquinariaAddModal: React.FC<IPropsModal> = (
  props: IPropsModal
) => {
  const tarea = useTareaPorLote();
  let { id }: any = useParams();
  const [maquinaria, setMaquinaria] = useState<IMaquinariaModel>(initialValue);
  const [maquinas, setMaquinas] = useState<ISelect[]>([]);

  const { empresas, maquinarias } = props;

  useEffect((): void => {
    if (!props.isNew) {
      const maq: IMaquinariaModel = tarea.getMaquinaria(id);
      setMaquinaria(maq);
    }
  }, [props.isNew]);

  useEffect(() => {
    const numero = !props.isNew
      ? tarea.tareaPorLote.maquinaria.findIndex((m) => m.id == `${id}`)
      : tarea.tareaPorLote.maquinaria.length;

    switch (numero) {
      case 0: {
        const maqFiltered = maquinarias.filter(
          (m) => m.tipo == "TR" || m.tipo == "CO" || m.tipo == "VE"
        );
        const maq =
          maqFiltered?.map(
            (m): ISelect => ({ key: m.codigo, value: m.descripcion })
          ) ?? [];
        setMaquinas(maq);
        break;
      }
      case 1: {
        const maqFiltered = maquinarias.filter(
          (m) => m.tipo !== "TR" && m.tipo !== "CO" && m.tipo !== "VE"
        );
        const maq =
          maqFiltered?.map(
            (m): ISelect => ({ key: m.codigo, value: m.descripcion })
          ) ?? [];
        setMaquinas(maq);
        break;
      }
      default: {
        setMaquinas([]);
        break;
      }
    }
  }, [props.isOpen]);

  const formik = useFormik<IMaquinariaModel>({
    initialValues: maquinaria,
    validationSchema: Yup.object({
      maquinariaCod: Yup.number()
        .required("Debe seleccionar una opción")
        .min(1, "Debe seleccionar una opción"),
      empresaCod: Yup.number()
        .required("Debe seleccionar una opción")
        .min(1, "Debe seleccionar una opción"),
    }),
    enableReinitialize: true,
    onSubmit: async (values: IMaquinariaModel) => {
      if (props.isNew) {
        values.id = makeRandomId();
        tarea.addMaquinaria(values);
        formik.resetForm();
      } else {
        values.id = id;
        tarea.editMaquinaria(values);
      }
      props.handleModalOpen(false);
    },
  });

  return (
    <>
      <IonModal isOpen={props.isOpen}>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle color="primary">
              {props.isNew ? "Cargar Maquinaria" : "Editar Maquinaria"}
            </IonTitle>
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
                <Select
                  label="Máquina"
                  isRequired={true}
                  value={formik.values.maquinariaCod}
                  placeholder="Selecione máquina"
                  items={maquinas}
                  error={
                    formik.touched.maquinariaCod && formik.errors.maquinariaCod
                      ? formik.errors.maquinariaCod
                      : undefined
                  }
                  handleBlur={formik.handleBlur("maquinariaCod")}
                  onChange={(e: any) =>
                    formik.setFieldValue("maquinariaCod", e.detail.value)
                  }
                ></Select>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <Select
                  label="Empresa"
                  isRequired={true}
                  value={formik.values.empresaCod}
                  placeholder="Seleccione empresa"
                  items={empresas}
                  error={
                    formik.touched.empresaCod && formik.errors.empresaCod
                      ? formik.errors.empresaCod
                      : undefined
                  }
                  handleBlur={formik.handleBlur("empresaCod")}
                  onChange={(e: any) =>
                    formik.setFieldValue("empresaCod", e.detail.value)
                  }
                ></Select>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <Input
                  label="Hs/KM"
                  isRequired={false}
                  value={formik.values.hsKm === 0 ? "" : formik.values.hsKm}
                  type="text"
                  placeholder="Hs/Km"
                  error={
                    formik.touched.hsKm && formik.errors.hsKm
                      ? formik.errors.hsKm
                      : undefined
                  }
                  onKeyPress={(e: any) => {}}
                  handleBlur={formik.handleBlur("hsKm")}
                  onChange={(e: any) =>
                    formik.setFieldValue("hsKm", e.detail.value)
                  }
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
                    !(formik.isValid && (formik.dirty || id != undefined))
                  }
                >
                  {props.isNew ? "Agregar Maquinaria" : "Guardar Maquinaria"}
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonContent>
      </IonModal>
    </>
  );
};
