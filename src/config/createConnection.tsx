// import { sqlite } from "../App";
import { SQLiteDBConnection } from "react-sqlite-hook/dist/useSQLite";
import { Capacitor } from '@capacitor/core';
import { sqlite } from "../App";

export class Connection {
  private static instance: SQLiteDBConnection;

  private constructor() {}

  public static async getInstance(
    database: string, 
    encrypted: boolean, 
    mode: string, 
    version: number
  ): Promise<SQLiteDBConnection> {
    try {
      const platform = Capacitor.getPlatform();
  
      if(platform === "web") {
        const jeepEl = document.createElement("jeep-sqlite");
        document.body.appendChild(jeepEl);
        await customElements.whenDefined('jeep-sqlite');
        await sqlite.initWebStore();
      }

      const ret = await sqlite.checkConnectionsConsistency();
      const isConn = (await sqlite.isConnection(database)).result;
  
      let db: SQLiteDBConnection
      if (ret.result && isConn) {
        db = await sqlite.retrieveConnection(database);
      } else {
        db = await sqlite.createConnection(database, encrypted, mode, version);
      }

      await db.open();
      return db;
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.message || "Hubo un error inesperado")
    }
  }
}
