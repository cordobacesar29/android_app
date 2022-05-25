import { CONSTANTS } from "../../constants/constants";
import apiAxiosInstance from "../../../utils/httpConfig/apiAxiosInstance";
import { ContratistaModel } from "./ContratistaModel";
import { Repository } from "../../../repositories/Repository";

export class ContratistaService {
  public static async getAll() {
    try {
      const response = await apiAxiosInstance.get(
        CONSTANTS.ENDPOINTS.MASTER_DATA.Contratistas
      );
      let contratistas: Array<ContratistaModel> = [];

      response.data.forEach((element: any) => {
        const newElement: ContratistaModel = {
          id: element.id,
          nombre: element.nombre,
          codigo: element.codigo,
        };
        contratistas = [...contratistas, newElement];
      });

      await Repository.saveAll(contratistas, CONSTANTS.TABLES.CONTRATISTAS);
    } catch (e) {
      throw e;
    }
  }

  public static async getFromDb(): Promise<Array<ContratistaModel>> {
    try {
      const result = await Repository.get(CONSTANTS.TABLES.CONTRATISTAS);
      let contratistas: Array<ContratistaModel> = [];
      if (!result.values) return contratistas;

      result.values.forEach((element: any) => {
        const newElement: ContratistaModel = {
          id: element.id,
          nombre: element.nombre,
          codigo: element.codigo,
        };
        contratistas = [...contratistas, newElement];
      });

      return contratistas;
    } catch (error) {
      throw error;
    }
  }
}
