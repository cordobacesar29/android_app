import React from "react";
import useAxiosLoader from "../../../utils/hooks/useAxiosLoader";
import { IonLoading, IonContent } from "@ionic/react";

const GlobalLoader = () => {
  const [loading] = useAxiosLoader();
  // return (<div>{loading ? "loading" : "not loading"}</div>);
  return (
    <IonContent>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={loading}
        message={"Please wait..."}
      />
    </IonContent>
  );
};

export default GlobalLoader;
