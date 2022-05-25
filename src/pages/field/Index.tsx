import React from "react";
import {
  IonApp,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { PATH_PAGE } from "../../utils/routes/paths";
import { TabPage } from "./TabPage";
import HomeTabs from '../home/HomeTabs';
import LogoProximamente from'../../assets/icons/LogoProximamente.svg'
import "./Index.css"
export const Index: React.FC = () => {
  let history: any = useHistory();

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-left ">
            <div className="titleLogo">
              <IonTitle>Campo</IonTitle>
              <IonIcon
                icon={notificationsOutline}
                className="iconNotif"
              ></IonIcon>
            </div>
          </IonTitle>
        </IonToolbar>
        <TabPage />
      </IonHeader>
      <IonContent>
        <div className="container-img-proximamente">
          <img src={LogoProximamente}></img>
        </div>
      </IonContent>
      <HomeTabs />
    </IonApp>
  );
};
