import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Connection } from "../../config/createConnection";

const getConnection = async (): Promise<SQLiteDBConnection> => {
  return await Connection.getInstance(
    process.env.DB_HOST || "synagro-7",
    false,
    process.env.ENCRYPT || "no-encryption",
    1
  );
};


export { getConnection };
