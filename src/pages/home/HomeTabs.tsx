import React, { useState } from "react";
import { IonIcon, IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import { documentText, documentTextOutline, leaf, leafOutline, home, homeOutline } from "ionicons/icons";
import { PATH_PAGE } from "../../utils/routes";
import { useHistory, useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const HomeTabs: React.FC = () => {
  let history: any = useHistory();
  const location = useLocation();
  const [segmentSelected, setSegmentSelected] = useState<string>(
    location.pathname
  );
  return (
    <IonSegment
      onIonChange={(e) => {}}
      value={segmentSelected}
      className="homeSegment"
    >
      <NavLink className="link-route-tabs" to={PATH_PAGE.home.default} activeClassName="selected-item">
        <IonSegmentButton value={PATH_PAGE.home.default} className={`${location.pathname === PATH_PAGE.home.default ? 'segment-home-selected' : 'segment-home'}`}>
          <IonIcon icon={location.pathname === PATH_PAGE.home.default ? home : homeOutline } />
          <IonLabel className="text-home-tabs">Inicio</IonLabel>
        </IonSegmentButton>
      </NavLink>

      <NavLink className="link-route-tabs" to={PATH_PAGE.administration.index} activeClassName="selected-item">
        <IonSegmentButton value={PATH_PAGE.administration.index} className={`${location.pathname === PATH_PAGE.administration.index ? 'segment-home-selected' : 'segment-home'}`}>
          <IonIcon icon={location.pathname === PATH_PAGE.administration.index ? documentText : documentTextOutline} />
          <IonLabel className="text-home-tabs">Administración</IonLabel>
        </IonSegmentButton>
      </NavLink>
      <NavLink className="link-route-tabs" to={PATH_PAGE.field.index} activeClassName="selected-item">
        <IonSegmentButton value={PATH_PAGE.field.index} className={`${location.pathname === PATH_PAGE.field.index ? 'segment-home-selected' : 'segment-home'}`}>
          <IonIcon icon={location.pathname === PATH_PAGE.field.index ? leaf : leafOutline} />
          <IonLabel className="text-home-tabs">Campo</IonLabel>
        </IonSegmentButton>
      </NavLink>
    </IonSegment>
  );
};

export default HomeTabs;
