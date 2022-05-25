import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonFooter,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonTitle,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import Input from "../../../components/shared/inputs/input";
import { useHistory } from "react-router-dom";
import { PATH_PAGE } from "../../../utils/routes";
import YesNoAlert from "../../../components/shared/alerts/YesNoAlert";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { ISelect } from "../../../interfaces/ISelect";
import { getEmpleados } from "../../../services/store/queryStore";
import SearchableSelect from "../../../components/shared/inputs/SearchableSelect";
import { useFormikAsignacion } from "./useFormikAsignacion";
import { TabPage } from "../TabPage";
import { IComponentsRoute } from "../../../utils/models/ComponentRoutes";

export const AsignacionPage: React.FC<IComponentsRoute> = (
  props: IComponentsRoute
) => {
  let history: any = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [empleados, setEmpleados] = useState<ISelect[]>([]);
  const { formik } = useFormikAsignacion();

  useEffect(() => {
    const getData = async () => {
      const { selects: empleado } = await getEmpleados();
      setEmpleados(empleado);
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
          <IonContent>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <SearchableSelect
                      label="Técnico"
                      isRequired={true}
                      value={formik.values.tecnicoCod}
                      placeholder="Seleccione técnico"
                      items={empleados}
                      error={
                        formik.touched.tecnicoCod && formik.errors.tecnicoCod
                          ? formik.errors.tecnicoCod
                          : undefined
                      }
                      handleBlur={() => formik.setFieldTouched("tecnicoCod")}
                      onChange={(e: any) =>
                        formik.setFieldValue("tecnicoCod", e)
                      }
                    ></SearchableSelect>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <SearchableSelect
                      label="Supervisor"
                      isRequired={true}
                      value={formik.values.supervisorCod}
                      placeholder="Selecione supervisor"
                      items={empleados}
                      error={
                        formik.touched.supervisorCod &&
                        formik.errors.supervisorCod
                          ? formik.errors.supervisorCod
                          : undefined
                      }
                      handleBlur={() => formik.setFieldTouched("supervisorCod")}
                      onChange={(e: any) =>
                        formik.setFieldValue("supervisorCod", e)
                      }
                    ></SearchableSelect>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Input
                      label="Justificación"
                      isRequired={true}
                      value={formik.values.justificacion}
                      type="text"
                      placeholder="Escribe tu justificación"
                      error={
                        formik.touched.justificacion &&
                        formik.errors.justificacion
                          ? formik.errors.justificacion
                          : undefined
                      }
                      handleBlur={formik.handleBlur("justificacion")}
                      onKeyPress={(e: any) => {}}
                      onChange={(e: any) =>
                        formik.setFieldValue("justificacion", e.detail.value)
                      }
                    ></Input>
                  </IonCol>
                </IonRow>
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
