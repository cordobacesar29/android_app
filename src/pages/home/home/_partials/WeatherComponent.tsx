import { IonCard } from "@ionic/react";
import imgSinWifi from "../../../../assets/images/clima-sin-internet.png";
interface IProps {
  internetConnection: boolean;
}

export const WeatherComponent = (props: IProps) => {
  return (
    <IonCard className="cardComp3">
      {props.internetConnection ? (
        <div className="clima">
          <iframe
            className="clima"
            src="https://www.meteoblue.com/es/tiempo/widget/three?geoloc=detect&nocurrent=0&noforecast=0&days=3&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=image"
            scrolling="NO"
            sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
        </div>
      ) : (
        <img src={imgSinWifi} alt={"Sin Internet"} />
      )}
    </IonCard>
  );
};
