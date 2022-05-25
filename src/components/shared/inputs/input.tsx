import { IonInput, IonItem, IonLabel } from "@ionic/react";
import { IInputModel } from "../../../utils/models/inputs/inputModel";
import Error from "./Error";

const Input: React.FC<IInputModel> = (props: IInputModel) => {
  return (
    <>
      <IonItem>
        <IonLabel position="stacked">
          {props.label} {props.isRequired ? "*" : ""}
        </IonLabel>
        <IonInput
          disabled={props.disabled}
          type={props.type}
          placeholder={props.placeholder}
          onIonChange={props.onChange}
          onIonBlur={props.handleBlur}
          value={props.value}
          onKeyDown={props.onKeyPress}
          step={props.step}
        >
          {" "}
        </IonInput>
      </IonItem>
      <Error error={props.error}></Error>
    </>
  );
};

export default Input;
