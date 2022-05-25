import { capSQLiteValues } from "@capacitor-community/sqlite";
import { getConnection } from "../services/helpers/dataProvider";
import { deleteQuery, insertQuery, selectQuery, updateQuery } from "../services/helpers/queryBuilder";
import { IFilter } from "./IFilter";

export class Repository {
  public static async save(model: any, tableName: string): Promise<number> {
    try {
      const db = await getConnection();

      if (!model.id || isNaN(model.id) || model.id === 0) {
        const id = await db.query(`SELECT MAX(id) as maxId FROM ${tableName}`)
        if (!id.values) {
          throw new Error(`${tableName} no esta sincronizado`);
        }
        model.id = id.values[0].maxId + 1;
      }

      const config = {
        table: tableName,
        columns: Object.keys(model),
        values: [] as string[]
      };

      const objectsList = Object.values(model);

      let row = `(`;
      for (let j = 0; j < objectsList.length; j++) {
        let value = objectsList[j];

        if (typeof value === "string") {
          value = `'${value}'`;
        }
        value = value === undefined ? null : value;
        row = j === objectsList.length - 1 ? `${row} ${value})` : `${row} ${value}, `;
      }
      config.values = [...config.values, row];

      const query = insertQuery(config);

      await db.execute(query);

      return model.id;
    } catch (error) {
      throw error;
    }
  }

  public static async saveAll(lista: Array<any>, tableName: string) {
    try {
      const db = await getConnection();

      const idRegister = await db.query(`SELECT MAX(id) as maxId FROM ${tableName}`)
      let id = 1;

      if (idRegister.values) {
        id = idRegister.values[0].maxId + 1;
      }

      if (!lista[0].id || isNaN(lista[0].id || lista[0].id === 0)) {
        lista[0].id = id;
      }

      const config = {
        table: tableName,
        columns: Object.keys(lista[0]),
        values: [] as string[]
      };

      for (const entity of lista) {
        if (!entity.id || isNaN(entity.id || entity.id === 0)) {
          entity.id = id;
        }

        const objectsList = Object.values(entity);

        let row = `(`;
        for (let i = 0; i < objectsList.length; i++) {
          let value = objectsList[i];

          if (typeof value === "string") {
            value = `'${value}'`;
          }

          value = value || null;
          row = i === objectsList.length - 1 ? `${row}${value})` : `${row}${value}, `;
        }
        config.values = [...config.values, row];
        id++;
      }

      const query = insertQuery(config);
      return await db.execute(query);
    } catch (error) {
      throw error;
    }
  }

  public static async update(tableName: string, columns: IFilter[], filters?: IFilter[]): Promise<capSQLiteValues> {
    const db = await getConnection();
    const query = updateQuery(tableName, columns, filters);
    return await db.query(query);
  }

  public static async get(tableName: string, filters?: IFilter[]): Promise<capSQLiteValues> {
    const db = await getConnection();
    const query = selectQuery(tableName, filters);

    return await db.query(query);
  }

  public static async delete(tableName: string, filters?: IFilter[]) {
    try {
      const db = await getConnection();
      const query = deleteQuery(tableName, filters);

      return await db.execute(query);
    } catch (error) {
      throw error;
    }
  }
}
