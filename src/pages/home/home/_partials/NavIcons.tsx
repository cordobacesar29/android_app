import { IonCardContent } from "@ionic/react";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "../../../../utils/routes";

interface ItemHome {
  title: string;
  icon: string;
  url: string;
  internetConnection: boolean;
  lastDate: string;
  needsSync: boolean;
}
const style = {
  textDecoration: "none",
};

const NavIcons = (props: ItemHome) => {
  const handleClick = (e: any, url: string) => {
    if ((url === PATH_PAGE.stockHarvest.index && !props.internetConnection) || (props.needsSync && props.lastDate === "-")) {
      e.preventDefault();
    }
  };
  return (
    <Link
      to={props.url}
      style={style}
      className={`${(
        (!props.internetConnection && props.url === PATH_PAGE.stockHarvest.index) || (props.needsSync && props.lastDate === "-")) &&
        "link-disabled"
      }`}
      onClick={(e) => handleClick(e, props.url)}
    >
      <IonCardContent className="contentCard">
        <div className="ion-text-center">
          <img src={props.icon} alt="Logo Synagro" className="logoCard icon-home-header" />
        </div>
        <div className="ion-text-center">
          <p className="pCard1">{props.title}</p>
        </div>
      </IonCardContent>
    </Link>
  );
};

export default NavIcons;
