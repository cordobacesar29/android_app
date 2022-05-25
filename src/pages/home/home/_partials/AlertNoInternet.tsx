import React, { useEffect, useState } from "react";
import { IonCol, IonIcon, IonRow } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Network } from "@capacitor/network";
import iconoSinInternet from "../../../../assets/icons/icono-sin-internet.svg";

export const AlertNoInternet: React.FC = () => {
  const [alertNoInternet, setAlertNoInternet] = useState<boolean>(true);

  const handleCancel = (): void => {
    setAlertNoInternet(!alertNoInternet);
  };
  return (
    <>
      {alertNoInternet && (
        <IonRow>
          <div className="AlertNoInternet">
            <IonCol size="2" className="colIconAlert">
              <img src={iconoSinInternet} alt="Logo" className="iconAlertNoI" />
            </IonCol>
            <IonCol size="9" className="textAlertNoI">
              <b>¡Atención!</b> <br />
              Sin conexión a internet.
            </IonCol>
            <IonCol size="1">
              <IonIcon
                className="iconCancelAlertNoI"
                onClick={handleCancel}
                icon={closeOutline}
              ></IonIcon>
            </IonCol>
          </div>
        </IonRow>
      )}
    </>
  );
};
