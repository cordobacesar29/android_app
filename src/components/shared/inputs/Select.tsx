import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { ISelectModel } from "../../../utils/models/inputs/selectModel";
import Error from "./Error";

const Select: React.FC<ISelectModel> = (props: ISelectModel) => {
  return (
    <>
      <IonItem>
        <IonLabel position="stacked">
          {props.label} {props.isRequired ? "*" : ""}
        </IonLabel>
        <IonSelect
          disabled={props.disabled || (props.items.length < 1) }
          placeholder={props.placeholder}
          value={props.value}
          multiple={props.multiple}
          onIonBlur={props.handleBlur}
          onIonChange={props.onChange}
        >
          {props.items.map((i) => (
            <IonSelectOption key={i.key} value={i.key}>
              {i.value}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      <Error error={props.error}></Error>
    </>
  );
};

export default Select;
