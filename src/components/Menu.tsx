import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonNote,
  IonRow,
} from "@ionic/react";
import { menuController } from "@ionic/core";
import "./Menu.css";
import { useAuth } from "../utils/hooks/useAuth";
import { useEffect, useState } from "react";
import { getLastPeriodo } from "../services/store/queryStore";
import { PeriodoModel } from "../services/modules/periodos/PeriodoModel";
import { useHistory } from "react-router";
import { PATH_PAGE } from "../utils/routes";
import { logOutOutline } from "ionicons/icons";

const Menu: React.FC = () => {
  const { user, logOut } = useAuth();
  const [periodo, setPeriodo] = useState<PeriodoModel>();
  const history = useHistory();

  // useEffect(() => {
  //   const getData = async () => {
  //     setTimeout(async () => {
  //       const periodo = await getLastPeriodo();
  //       setPeriodo(periodo);
  //     }, 500)
  //   };
  //   getData();
  // }, []);

  const logout = async (e: any) => {
    await menuController.close();
    await logOut();
  };
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{user.userName}</IonListHeader>
          <IonNote>{user.email}</IonNote>
          <IonListHeader>
            <IonLabel color="primary" className="campania-nav">
              { periodo?.descripcion || ""}
            </IonLabel>
          </IonListHeader>
        </IonList>
        <IonRow className="btn-logout-container">
          <IonCol>
            <a
              color="transparent"
              onClick={(e) => logout(e)}
              className="btn-logout"
            >
              <IonIcon icon={logOutOutline} className="icon-logout"></IonIcon>{" "}
              <p>Cerrar Sesión</p>
            </a>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
