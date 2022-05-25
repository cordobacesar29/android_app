import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { PATH_PAGE } from "../../utils/routes";

export const TabPage: React.FC = () => {

    let history: any = useHistory();
    const location = useLocation();
    const [segmentSelected, setSegmentSelected] = useState<string>(location.pathname);
    const [agriculturaTab, setAgriculturaTab] = useState<boolean>(true);
    const [ganaderiaTab, setGanaderiaTab] = useState<boolean>(true);
    const [cosechaTab, setCosechaTab] = useState<boolean>(true);
   
    const onChange = (value: string) => {
        setSegmentSelected(value);
        history.push(value);
    }
   
    return (
        <>
            <IonSegment onIonChange={e => onChange(e.detail.value!)} value={segmentSelected}>
                <IonSegmentButton value={PATH_PAGE.field.farming} disabled={agriculturaTab}>
                    <IonLabel>AGRICULTURA</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton  value={PATH_PAGE.field.harvest} disabled={cosechaTab}>
                    <IonLabel>COSECHA</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton  value={PATH_PAGE.field.cattleRaising} disabled={ganaderiaTab}>
                    <IonLabel>GANADERIA</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        </>
    );
}

