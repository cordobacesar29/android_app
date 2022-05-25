import { IonApp } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

//SQLite imports
import { useSQLite } from "react-sqlite-hook/dist";
import { useState } from "react";
import { ProvideAuth } from "./utils/helpers";
import GlobalLoader from "./components/shared/loaders/GlobalLoader";
import { AppRouter } from "./utils/routes";
import { ProvideTareaPorLote } from "./utils/helpers/provideTareaPorLote";

import { apiAxiosInstConfiguration } from "../src/utils/hooks/useProvideAuth"
import { ProvideOrdenDeTrabajo } from "./utils/helpers/provideOrdenDeTrabajo";

export let sqlite: any;
export let existingConn: any;

const App: React.FC = (props) => {

  const [existConn, setExistConn] = useState(false);

  existingConn = { existConn: existConn, setExistConn: setExistConn };

  const {
    //echo,
    getPlatform,
    createConnection,
    //closeConnection,
    retrieveConnection,
    //retrieveAllConnections,
    //closeAllConnections,
    //addUpgradeStatement,
    //importFromJson,
    //isJsonValid,
    //copyFromAssets,
    // isAvailable,
    checkConnectionsConsistency,
    isConnection,
  } = useSQLite();

  sqlite = {
    // echo: echo,
    getPlatform: getPlatform,
    createConnection: createConnection,
    // closeConnection: closeConnection,
    retrieveConnection: retrieveConnection,
    // retrieveAllConnections: retrieveAllConnections,
    // closeAllConnections: closeAllConnections,
    // addUpgradeStatement: addUpgradeStatement,
    // importFromJson: importFromJson,
    // isJsonValid: isJsonValid,
    // copyFromAssets: copyFromAssets,
    // isAvailable: isAvailable,
    checkConnectionsConsistency: checkConnectionsConsistency,
    isConnection: isConnection,
  };

  apiAxiosInstConfiguration();


  return (
    <IonApp>
      <GlobalLoader />
      <ProvideAuth>
        <ProvideTareaPorLote>
          <ProvideOrdenDeTrabajo>
            <AppRouter /> 
          </ProvideOrdenDeTrabajo>
        </ProvideTareaPorLote>
      </ProvideAuth>
    </IonApp>
  );
};

export default App;
