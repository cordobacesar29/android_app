import { IonText } from "@ionic/react";

interface IProps{
    error?: string;
}

const Error: React.FC<IProps> = (e: IProps) => {
    return (
        <IonText color="danger" className="ion-padding-start">
            <small>
                <span role="alert" id={`${e.error}Error`}>
                    {e.error}
                </span>
            </small>
        </IonText>
    );
};

export default Error;
