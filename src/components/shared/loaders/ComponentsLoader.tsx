import { IonLoading, IonContent } from "@ionic/react";

interface IProps {
  loading: boolean;
  loadingMessage?: string;
}
export const ComponentsLoader = (props: IProps) => {
  const { loading } = props;
  return (
    <IonContent>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={loading}
        message={
          props.loadingMessage ? props.loadingMessage : "Sincronizando..."
        }
      />
    </IonContent>
  );
};
