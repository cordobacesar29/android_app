import React, { useEffect, useState } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonCard,
  IonRow,
  IonCol,
  IonIcon,
  IonFooter,
  IonPage,
} from "@ionic/react";
import { car, notificationsOutline } from "ionicons/icons";
import "../../../assets/styles/homePage.css";
import { SincComponent } from "./_partials/SincComponent";
import HomeTabs from "../HomeTabs";
import LogoSynagroBlanco from "../../../assets/icons/logo-synagro-blanco.svg";
import { cards } from "./_partials/navItems";
import NavIcons from "./_partials/NavIcons";
import { WeatherComponent } from "./_partials/WeatherComponent";
import IconNoConect from "./_partials/IconNoConect";
import { AlertNoInternet } from "./_partials/AlertNoInternet";
import { NetworkConnect } from "../../../utils/helpers/useNetworkConnect";
import { GenericSyncsService } from "../../../services/modules/genericSyncs/GenericSyncsService";

const HomePage: React.FC = () => {
  const { checkConnection, internetConnection } = NetworkConnect();
  const [lastDate, setLastDate] = useState<string>("-");
  
  useEffect(() => { 
    let mounted = true;
    if (mounted) {
      checkConnection();
      setTimeout(async () => {
        const lastSyncDate = await GenericSyncsService.getLastFromDb();
        setLastDate(lastSyncDate?.fecha || "-");
      }, 500);
    }
    return () => {
      mounted = false;
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start" className="btn-nav">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-left ">
            <div className="titleLogo">
              <img
                src={LogoSynagroBlanco}
                alt="Logo"
                className="ionLogoTitle"
              />
              {!internetConnection && <IconNoConect />}
              <IonIcon
                icon={notificationsOutline}
                className="iconNotif"
              ></IonIcon>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow className="content-home">
          <IonCol>
            {!internetConnection && <AlertNoInternet />}
            <IonCard className="cardComp">
              <IonRow className="ion-text-center">
                {cards.map((card, index) => {
                  return (
                    <IonCol className="colCard col1" size="4" key={index}>
                      <NavIcons
                        internetConnection={internetConnection}
                        title={card.title}
                        icon={card.icon}
                        url={card.url}
                        needsSync={card.needsSync}
                        lastDate={lastDate} 
                      />
                    </IonCol>
                  );
                })}
              </IonRow>
            </IonCard>
            <SincComponent 
              internetConnection={internetConnection}
              lastDate={lastDate} 
              setLastDate={setLastDate} 
            />
            <WeatherComponent internetConnection={internetConnection} />
          </IonCol>
        </IonRow>
      </IonContent>
      <IonFooter>
        <HomeTabs />
      </IonFooter>
    </IonPage>
  );
};

export default HomePage;
