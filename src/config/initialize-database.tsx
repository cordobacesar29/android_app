import { capSQLiteChanges } from "@capacitor-community/sqlite";
import { SQLiteDBConnection } from "react-sqlite-hook/dist/useSQLite";
import { Connection } from "./createConnection";
import DatabaseScript from "../repositories/DatabaseScript";

export const initialize = async () => {
  try {
    const db = await Connection.getInstance(process.env.DB_HOST || 'synagro-7', false, process.env.ENCRYPT || "no-encryption", 1);
    
    let ret: capSQLiteChanges = await db.execute(DatabaseScript);
    if ((ret.changes ?? 0) < 0) {
      throw new Error("Algo salio mal!");
    }
    ret = await db.createSyncTable();
    if ((ret.changes?.changes ?? 0) < 0) {
      throw new Error("Algo salio mal!");
    }

    // set the synchronization date
    const syncDate: string = new Date().toISOString();
    await db.setSyncDate(syncDate);    
  } catch (error) {
    // TODO manejo de errores
    console.log(error);
  }
};

export const openConnection = async (db: SQLiteDBConnection) => {
  const isOpen = (await db.isDBOpen()).result;
  if (!isOpen) {
    await db.open();
  }
};
