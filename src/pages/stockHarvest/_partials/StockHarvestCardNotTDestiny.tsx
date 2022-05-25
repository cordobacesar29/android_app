import { IonCard, IonCardContent, IonRow } from "@ionic/react";
import {
  IHarvestDestiny,
  IHarvestNotDestiny,
} from "../../../utils/models/harvestModel";
import { AnyType } from "../index/IndexPage";
import { GridStockCard } from "./GridStockCard";

interface IProps {
  stockeHarvest: IHarvestNotDestiny[] | IHarvestDestiny[] | AnyType[];
}
export const StockHarvestCardNotTDestiny = (props: IProps) => {
  const { stockeHarvest } = props;
  return (
    <IonRow className="content-card-harvest-not-destiny">
      <IonCard className="cardHarvest">
        <IonCardContent className="contentCardHarvest">
          <GridStockCard stockeHarvest={stockeHarvest} />
        </IonCardContent>
      </IonCard>
    </IonRow>
  );
};
