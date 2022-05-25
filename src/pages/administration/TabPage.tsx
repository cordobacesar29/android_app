import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { PATH_PAGE } from "../../utils/routes";

export const TabPage: React.FC = () => {

    let history: any = useHistory();
    const location = useLocation();
    const [segmentSelected, setSegmentSelected] = useState<string>(location.pathname);
    const [buysTab, setBuysTab] = useState<boolean>(true);
    const [salesTab, setSalesTab] = useState<boolean>(true);
    const [taxTab, setTaxTab] = useState<boolean>(true);
   
    const onChange = (value: string) => {
        setSegmentSelected(value);
        history.push(value);
    }
   
    return (
        <>
            <IonSegment onIonChange={e => onChange(e.detail.value!)} value={segmentSelected}>
                <IonSegmentButton value={PATH_PAGE.administration.buys} disabled={buysTab}>
                    <IonLabel>COMPRAS</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton  value={PATH_PAGE.administration.sales} disabled={salesTab}>
                    <IonLabel>VENTAS</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton  value={PATH_PAGE.administration.taxation} disabled={taxTab}>
                    <IonLabel>IMPUESTOS</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        </>
    );
}