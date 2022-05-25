import { IonGrid, IonRow, IonCol, IonIcon } from "@ionic/react";
import "./Filter.css";
import Calendar from "../../../components/shared/inputs/calendar";
import Select from "../../../components/shared/inputs/Select";
import { calendarOutline } from "ionicons/icons";
import { IHarvestFilterData } from "../../../utils/models/harvestModel";

interface IProps {
  formik: any;
  filterData: IHarvestFilterData | undefined;
}
export const Filter = (props: IProps) => {
  const { formik, filterData } = props;
  return (
    <form>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonRow>
              <IonCol>
                <Calendar
                  label="Desde"
                  isRequired={false}
                  value={formik.values.Desde}
                  placeholder="dd/mm/aaaa"
                  error={formik.touched.Desde ? formik.errors.Desde : undefined}
                  handleBlur={formik.handleBlur("Desde")}
                  onChange={(e: any) =>
                    formik.setFieldValue("Desde", e.detail.value)
                  }
                ></Calendar>
              </IonCol>
              <IonCol className="colCalend">
                <IonIcon icon={calendarOutline}></IonIcon>
              </IonCol>
            </IonRow>
          </IonCol>
          <IonCol>
            <IonRow>
              <IonCol>
                <Calendar
                  label="Hasta"
                  isRequired={false}
                  value={formik.values.Hasta}
                  placeholder="dd/mm/aaaa"
                  error={formik.touched.Hasta ? formik.errors.Hasta : undefined}
                  handleBlur={formik.handleBlur("Hasta")}
                  onChange={(e: any) =>
                    formik.setFieldValue("Hasta", e.detail.value)
                  }
                ></Calendar>
              </IonCol>
              <IonCol className="colCalend">
                <IonIcon icon={calendarOutline}></IonIcon>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
        {filterData?.modoDestinos && filterData.modoDestinos.length > 0 && (
          <IonRow>
            <IonCol>
              <Select
                label="Modo Destino"
                isRequired={false}
                disabled={false}
                value={
                  formik.values.ModoDestino !== "" && formik.values.ModoDestino
                }
                placeholder="Seleccione un modo destino"
                items={filterData.modoDestinos}
                handleBlur={formik.handleBlur("ModoDestino")}
                onChange={(e: any) =>
                  formik.setFieldValue("ModoDestino", e.detail.value)
                }
              ></Select>
            </IonCol>
          </IonRow>
        )}
        {filterData?.grupoDestinos && filterData.grupoDestinos.length > 0 && (
          <IonRow>
            <IonCol>
              <Select
                label="Grupo de destino"
                isRequired={false}
                disabled={false}
                multiple
                value={
                  formik.values.GrupoDestinoId !== 0 &&
                  formik.values.GrupoDestinoId
                }
                placeholder="Selecione un grupo destino"
                items={filterData.grupoDestinos}
                handleBlur={formik.handleBlur("GrupoDestinoId")}
                onChange={(e: any) =>
                  formik.setFieldValue("GrupoDestinoId", e.detail.value)
                }
              ></Select>
            </IonCol>
          </IonRow>
        )}
        {filterData?.establecimientos &&
          filterData.establecimientos.length > 0 && (
            <IonRow>
              <IonCol>
                <Select
                  label="Establecimiento"
                  isRequired={false}
                  disabled={false}
                  multiple
                  value={
                    formik.values.EstablecimientoId !== 0 &&
                    formik.values.EstablecimientoId
                  }
                  placeholder="Selecione un establecimiento"
                  items={filterData.establecimientos}
                  handleBlur={formik.handleBlur("EstablecimientoId")}
                  onChange={(e: any) =>
                    formik.setFieldValue("EstablecimientoId", e.detail.value)
                  }
                ></Select>
              </IonCol>
            </IonRow>
          )}
        {filterData?.destinoGrupoCaracteristicas &&
          filterData.destinoGrupoCaracteristicas.length > 0 && (
            <IonRow>
              <IonCol>
                <Select
                  label="Caracteristica"
                  isRequired={false}
                  disabled={false}
                  multiple
                  value={
                    formik.values.CaracterisitcaId !== 0 &&
                    formik.values.CaracterisitcaId
                  }
                  placeholder="Selecione una caracteristica"
                  items={filterData.destinoGrupoCaracteristicas}
                  handleBlur={formik.handleBlur("CaracterisitcaId")}
                  onChange={(e: any) =>
                    formik.setFieldValue("CaracterisitcaId", e.detail.value)
                  }
                ></Select>
              </IonCol>
            </IonRow>
          )}
        {filterData?.contratos && filterData.contratos.length > 0 && (
          <IonRow>
            <IonCol>
              <Select
                label="Contrato"
                isRequired={false}
                disabled={false}
                multiple
                value={
                  formik.values.ContratoId !== 0 && formik.values.ContratoId
                }
                placeholder="Selecione un contrato"
                items={filterData.contratos}
                handleBlur={formik.handleBlur("ContratoId")}
                onChange={(e: any) =>
                  formik.setFieldValue("ContratoId", e.detail.value)
                }
              ></Select>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>
    </form>
  );
};
