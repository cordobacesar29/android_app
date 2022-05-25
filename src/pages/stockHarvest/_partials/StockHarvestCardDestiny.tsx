import {
  IonCard,
  IonCardContent,
  IonRow,
  IonGrid,
  IonCardHeader,
  IonCol,
  IonIcon,
} from "@ionic/react";
import { chevronDown, chevronUp } from "ionicons/icons";
import { useState } from "react";
import {
  IHarvestDestiny,
  IHarvestNotDestiny,
} from "../../../utils/models/harvestModel";
import { AnyType } from "../index/IndexPage";
import { GridStockCard } from "./GridStockCard";

interface IProps {
  stockeHarvest: IHarvestNotDestiny[] | IHarvestDestiny[] | AnyType[];
}
export const StockHarvestCardTDestiny = (props: IProps) => {
  const { stockeHarvest } = props;
  const [show, setShow] = useState<number | null>(null);
  const setShowVisible = (index: any) => {
    if (index === show) {
      setShow(null);
    } else {
      setShow(index);
    }
  };
  return (
    <div className="content-card-harvest-destiny">
      {stockeHarvest.map(
        (
          currentValue: IHarvestNotDestiny | IHarvestDestiny | AnyType,
          index: number
        ) => (
          <IonCol key={index}>
            <IonCard className="cardHarvestDestiny">
              <IonCardHeader
                className={`headerCardHarvest ${
                  show !== null && show === index
                    ? "headerCardHarvestSelected"
                    : "headerCardHarvestNotSelected"
                }`}
                onClick={() => setShowVisible(index)}
              >
                <IonGrid>
                  <IonRow>
                    <IonCol>{currentValue?.tipoDestino}</IonCol>
                    {show !== null && show === index ? (
                      <IonCol className="ion-text-end">
                        <IonIcon icon={chevronUp} />
                      </IonCol>
                    ) : (
                      <IonCol className="ion-text-end">
                        <IonIcon icon={chevronDown} />
                      </IonCol>
                    )}
                  </IonRow>
                </IonGrid>
              </IonCardHeader>
              {show !== null && show === index && (
                <IonCardContent className="contentCardHarvestDestiny">
                  <GridStockCard stockeHarvest={currentValue?.destinos} />
                </IonCardContent>
              )}
            </IonCard>
          </IonCol>
        )
      )}
    </div>
  );
};
