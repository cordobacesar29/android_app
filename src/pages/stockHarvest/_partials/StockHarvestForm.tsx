import {
  IonIcon,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonLabel,
  IonButton,
  IonRow,
  IonCol,
  IonGrid,
} from "@ionic/react";
import { optionsSharp } from "ionicons/icons";
import SearchableSelect from "../../../components/shared/inputs/SearchableSelect";
import { ISelect } from "../../../interfaces/ISelect";

interface IProps {
  setShowModal: (data: boolean) => void;
  cultivos: ISelect[];
  periodos: ISelect[];
  formik: any;
}
export const StockHarvestForm = (props: IProps) => {
  const { setShowModal, cultivos, periodos, formik } = props;
  return (
    <IonCard className="cardTask">
      <IonCardContent className="ionContentTask">
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size="5">
              <SearchableSelect
                label=""
                isRequired={false}
                value={formik.values.PeriodoId}
                placeholder="Selecione una opción"
                items={periodos}
                error={
                  formik.touched.PeriodoId && formik.errors.PeriodoId
                    ? formik.errors.PeriodoId
                    : undefined
                }
                handleBlur={() => formik.setFieldTouched("PeriodoId")}
                onChange={(e: any) => formik.setFieldValue("PeriodoId", e)}
                disabled={false}
              />
            </IonCol>
            <IonCol size="5">
              <SearchableSelect
                label=""
                isRequired={false}
                value={formik.values.ActividadId}
                placeholder="Selecione una opción"
                items={cultivos}
                error={
                  formik.touched.ActividadId && formik.errors.ActividadId
                    ? formik.errors.ActividadId
                    : undefined
                }
                handleBlur={() => formik.setFieldTouched("ActividadId")}
                onChange={(e: any) => formik.setFieldValue("ActividadId", e)}
                disabled={false}
              />
            </IonCol>
            <IonCol
              size="2"
              className="icon-filter-harvest"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <IonIcon icon={optionsSharp} />
              <span>Filtrar</span>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol className="container-check-harvest">
              <IonCheckbox
                color="primary"
                className="check-harvest"
                checked={formik.values.verTipoDestino}
                onIonChange={(e: any) =>
                  formik.setFieldValue("verTipoDestino", e.target.checked)
                }
              />
              <IonLabel className="label-check-harvest">
                Ver por tipo de destino
              </IonLabel>
            </IonCol>
            <IonCol className="ion-text-end">
              <IonButton color="secondary" onClick={formik.submitForm}>
                Generar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
