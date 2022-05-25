import { IonCol, IonItem, IonLabel, IonRadio, IonRadioGroup, IonRow } from "@ionic/react";
import { IRadioGroupModel } from "../../../utils/models/inputs/radioGroupModel";
import Error from "./Error";

const RadioGroup: React.FC<IRadioGroupModel> = (props: IRadioGroupModel) => {

    return (
        <>
            <IonRadioGroup value={props.value}
                onIonChange={props.onChange}>
                <IonCol>
                    <label>
                        {props.label}
                    </label>
                </IonCol>
                <IonRow >
                    {
                        props.items.map(i =>
                            <IonItem lines="none" key={i.key} className="rowRadios">
                                <IonLabel>{i.key}</IonLabel>
                                <IonRadio slot="start" value={i.value} disabled={props.readOnly} className="radioTasks" />
                            </IonItem>
                        )
                    }
                </IonRow>
            </IonRadioGroup>
            <Error error={props.error}></Error>
        </>
    );
};

export default RadioGroup;
