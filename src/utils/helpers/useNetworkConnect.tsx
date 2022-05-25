import { useState } from "react";
import { Network } from "@capacitor/network";

export const NetworkConnect = () => {
  const [internetConnection, setInternetConnection] = useState<boolean>(false);

  const checkConnection = async () => {
    const status = await Network.getStatus();
    setInternetConnection(status.connected);
  };

  return { checkConnection, internetConnection };
};
