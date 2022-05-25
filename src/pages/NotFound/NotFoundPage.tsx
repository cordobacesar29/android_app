import {
  IonCardContent,
  IonRow,
  IonCol,
  IonCardTitle, 
  IonCardSubtitle
} from "@ionic/react";
import { ComponentsLoader } from "../../components/shared/loaders/ComponentsLoader";
import { INotFoundPage } from "../../interfaces/INotFoundPage";


export const NotFoundPage: React.FC<INotFoundPage> = (props: INotFoundPage) => {
  return (
    <IonCardContent style={{background: "#f1f0f1"}}>
      {props.loading ? <ComponentsLoader loading={props.loading} /> :
      <>
        <IonRow>
          <IonCol style={{margin:"1rem 6rem 0rem 6rem" }}>
            <img src={props.img} alt={props.title}/>
          </IonCol>        
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCardTitle style={{textAlign:"center", marginBottom:"1.5rem"}}>
              {props.title}
            </IonCardTitle>
            <IonCardSubtitle style={{textAlign:"center", color:"gray"}}>
              <strong>
                {props.p1}
              </strong>
            </IonCardSubtitle>
            <IonCardSubtitle style={{textAlign:"center", color:"gray", marginBottom:"1.5rem"}}>
              <strong>
                {props.p2}
              </strong>
            </IonCardSubtitle>
          </IonCol>          
        </IonRow>
      </>      
      }
    </IonCardContent>
  );
};