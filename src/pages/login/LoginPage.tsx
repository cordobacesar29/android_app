import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonCheckbox,
} from "@ionic/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../utils/hooks/useAuth";
import { IUserLoginModel } from "../../utils/models/userLoginModel";
import "../../assets/styles/loginPage.css";
import { PATH_PAGE } from "../../utils/routes/paths";
import { RouteComponentProps } from "react-router-dom";
import { initialize } from "../../config/initialize-database";
import Lottie from "react-lottie";
import LogoSynagro from "../../assets/icons/Logo_SYNAgro_COLOR-01.svg";
import animationData from "../../assets/animations/LogoJson/JSON_Logo/JSON_EXP/data.json";
import "./login.css";

export const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const { signin, isPending, setIsPending } = useAuth();

  // LOTTIE ANIMATIONS CONFIGURATION
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const formik = useFormik<IUserLoginModel>({
    initialValues: {
      email: "",
      password: "",
      logged: false,
      checked: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Formato invalido")
        .required("Debe indicar un valor"),
      password: Yup.string()
        .min(4, "Debe tener más de 4 caracteres")
        .required("Debe indicar un valor"),
    }),
    onSubmit: async (values: IUserLoginModel) => {
      setIsPending(true);
      const response = await signin(values);
      if (response === 200) {
        await initialize();
        history.push(PATH_PAGE.home.default);
        setIsPending(false);
      } else {
        setIsPending(false);
      }
    },
  });

  return (
    <IonPage>
      <IonContent>
        {isPending ? (
          <div className="container-animation-login">
            <Lottie
              options={defaultOptions}
              isStopped={false}
              isPaused={false}
              height={400}
              width={400}
            />
          </div>
        ) : (
          <>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-xl="6" offset-xl="3">
                  <IonCard className="card-login">
                    <IonCardContent>
                      <div className="ion-text-center">
                        <img
                          src={LogoSynagro}
                          alt="Logo Synagro"
                          className="logo"
                        />
                      </div>
                      <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <IonRow>
                          <IonCol size="12">
                            <IonItem>
                              <IonLabel position="floating">Usuario</IonLabel>
                              <IonInput
                                id="email"
                                name="email"
                                type="text"
                                onIonChange={(e: any) =>
                                  formik.setFieldValue("email", e.target.value)
                                }
                                onIonBlur={formik.handleBlur}
                                value={formik.values.email}
                              />
                            </IonItem>
                            <div
                              color="danger"
                              className="error-message-container"
                            >
                              {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                              ) : null}
                            </div>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol size="12">
                            <IonItem>
                              <IonLabel position="floating">
                                Contraseña
                              </IonLabel>
                              <IonInput
                                id="password"
                                name="password"
                                type="password"
                                onIonChange={(e: any) =>
                                  formik.setFieldValue(
                                    "password",
                                    e.target.value
                                  )
                                }
                                onIonBlur={formik.handleBlur}
                                value={formik.values.password}
                              />
                            </IonItem>
                            <div
                              color="danger"
                              className="error-message-container"
                            >
                              {formik.touched.password &&
                              formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                              ) : null}
                            </div>
                          </IonCol>
                        </IonRow>
                        {/* <IonRow>
                          <IonCol size="12">
                            <IonItem className="labelcheckbox">
                              <IonCheckbox
                                className="checkbox"
                                itemType="checkbox"
                                name="checked"
                                onIonChange={(e: any) =>
                                  formik.setFieldValue(
                                    "checked",
                                    e.target.checked
                                  )
                                }
                                onIonBlur={formik.handleBlur}
                              />
                              <IonLabel color="primary">
                                Recordar usuario
                              </IonLabel>
                            </IonItem>
                          </IonCol>
                        </IonRow> */}
                        <IonRow>
                          <IonCol size="12">
                            <IonButton
                              expand="block"
                              type="submit"
                              className="buttonLogin"
                            >
                              Iniciar Sesión
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};
