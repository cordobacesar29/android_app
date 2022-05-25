import { useEffect, useState } from "react";
import { IonRow, IonCol, IonGrid } from "@ionic/react";
import {
  IHarvestDestiny,
  IHarvestNotDestiny,
} from "../../../utils/models/harvestModel";
import { AnyType } from "../index/IndexPage";

interface IProps {
  stockeHarvest: IHarvestNotDestiny[] | IHarvestDestiny[] | AnyType[];
}
export const GridStockCard = (props: IProps) => {
  const { stockeHarvest } = props;
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let total: number = 0;
    stockeHarvest.forEach(
      (el: IHarvestNotDestiny | IHarvestDestiny | AnyType) => {
        total = el?.existencia ? total + el.existencia : total + 0;
      }
    );
    setTotal(total);
  }, [stockeHarvest]);
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <b>Nombre</b>
        </IonCol>
        <IonCol className="ion-text-end">
          <b>Existencia</b>
        </IonCol>
      </IonRow>
      {stockeHarvest.map(
        (
          currentValue: IHarvestNotDestiny | IHarvestDestiny | AnyType,
          index: number
        ) => {
          return (
            <IonRow key={index}>
              <IonCol>{currentValue?.nombre}</IonCol>
              <IonCol className="ion-text-end">
                {currentValue?.existencia.toLocaleString()}
              </IonCol>
            </IonRow>
          );
        }
      )}
      <IonRow className="harvestNotDestinyStock">
        <IonCol>
          <b>Existencia Total</b>
        </IonCol>
        <IonCol className="ion-text-end">
          <b>{total.toLocaleString()}</b>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
