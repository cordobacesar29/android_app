import { IonDatetime, IonItem, IonLabel, IonText } from "@ionic/react";
import { ICalendarModel } from "../../../utils/models/inputs/calendarModel";
import "./calendar.css";
import Error from "./Error";

const Calendar: React.FC<ICalendarModel> = (props: ICalendarModel) => {
  return (
    <>
      <IonItem>
        <IonLabel position="stacked">
          {props.label} {props.isRequired ? "*" : ""}
        </IonLabel>
        <IonDatetime
          class="container"
          placeholder={props.placeholder}
          displayFormat="DD/MM/YYYY"
          value={props.value}
          onIonBlur={props.handleBlur}
          onIonChange={props.onChange}
        >
          {" "}
        </IonDatetime>
      </IonItem>
      <Error error={props.error}></Error>
    </>
  );
};

export default Calendar;
