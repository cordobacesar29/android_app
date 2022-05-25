import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonCol,
  IonPage,
} from "@ionic/react";
import { useEffect, useState } from "react";
import {
  IFilterFront,
  IHarvestFilterData,
} from "../../../utils/models/harvestModel";
import { Filter } from "./Filter";

interface IProps {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  formik: any;
  filterData: IHarvestFilterData | undefined;
}
const initialDataFilter: IFilterFront = {
  Desde: "",
  Hasta: "",
  ModoDestino: "",
  GrupoDestinoId: [],
  EstablecimientoId: [],
  CaracterisitcaId: [],
  ContratoId: [],
};

export const FilterModal = (props: IProps) => {
  const { showModal, setShowModal, formik, filterData } = props;
  const [filterFormData, setFilterFormData] =
    useState<IFilterFront>(initialDataFilter); // FILTER DATA, ALMACENA EL ULTIMO ESTADO DE LA PETICION Y PODEMOS EVITAR PETICIN CON EL CANCELAR.

  useEffect(() => {
    // cuando renderiza el componente, almacena el estado de formik para hacer uso de los comandos de cancelar y limpiar form.
    setFilterFormData({
      ...filterFormData,
      Desde: formik.values.Desde,
      Hasta: formik.values.Hasta,
      ModoDestino: formik.values.ModoDestino,
      GrupoDestinoId: formik.values.GrupoDestinoId,
      EstablecimientoId: formik.values.EstablecimientoId,
      CaracterisitcaId: formik.values.CaracterisitcaId,
      ContratoId: formik.values.ContratoId,
    });
  }, []);

  const changeFieldValues = (data: IFilterFront) => {
    formik.setFieldValue("Desde", data.Desde);
    formik.setFieldValue("Hasta", data.Hasta);
    formik.setFieldValue("ModoDestino", data.ModoDestino);
    formik.setFieldValue("GrupoDestinoId", data.GrupoDestinoId);
    formik.setFieldValue("EstablecimientoId", data.EstablecimientoId);
    formik.setFieldValue("CaracterisitcaId", data.CaracterisitcaId);
    formik.setFieldValue("ContratoId", data.ContratoId);
  };

  const cancelFilter = () => {
    changeFieldValues(filterFormData);
    setShowModal(false);
  };
  const cleanFilter = () => {
    changeFieldValues(initialDataFilter);
    setFilterFormData(initialDataFilter);
  };
  const applyFilter = () => {
    formik.submitForm();
    setShowModal(false);
  };

  return (
    <IonModal isOpen={showModal}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="titleTask">Filtros</IonTitle>
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              className="btn-cancelar"
              onClick={cancelFilter}
            >
              CANCELAR
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonPage>
          <IonContent>
            <Filter formik={formik} filterData={filterData} />
            <IonRow className="button-modal">
              <IonCol>
                <IonButton
                  color="secondary"
                  className="btnTasksNext"
                  expand="block"
                  type="submit"
                  disabled={
                    !formik.values.GrupoDestinoId &&
                    !formik.values.ModoDestino &&
                    !formik.values.ContratoId &&
                    !formik.values.EstablecimientoId &&
                    !formik.values.CaracterisitcaId &&
                    !formik.values.Hasta &&
                    !formik.values.Desde
                  }
                  onClick={applyFilter}
                >
                  Aplicar filtros
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow className="button-modal">
              <IonCol>
                <IonButton
                  color="light"
                  className="btnTasksNext"
                  expand="block"
                  disabled={
                    !formik.values.GrupoDestinoId &&
                    !formik.values.ModoDestino &&
                    !formik.values.ContratoId &&
                    !formik.values.EstablecimientoId &&
                    !formik.values.CaracterisitcaId &&
                    !formik.values.Hasta &&
                    !formik.values.Desde
                  }
                  onClick={(e: any) => {
                    e.preventDefault();
                    cleanFilter();
                  }}
                >
                  Limpiar filtros
                </IonButton>
              </IonCol>
            </IonRow>
          </IonContent>
        </IonPage>
      </IonContent>
    </IonModal>
  );
};
