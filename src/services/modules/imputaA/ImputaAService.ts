import { CONSTANTS } from "../../constants/constants";
import apiAxiosInstance from "../../../utils/httpConfig/apiAxiosInstance";
import { ImputaAModel } from "./ImputaAModel";
import { Repository } from "../../../repositories/Repository";
import { IFilter } from "../../../repositories/IFilter";

export class ImputaAService {
  public static async getAll() {
    try {
      const response = await apiAxiosInstance.get(
        CONSTANTS.ENDPOINTS.MASTER_DATA.ImputaA
      );

      const imputasAArray: Array<ImputaAModel> = response.data.map(
        (element: ImputaAModel) => ({
          id: element.id,
          descripcion: element.descripcion,
        })
      );

      await Repository.saveAll([{ id: "Z", descripcion: "Otros" }, ...imputasAArray], CONSTANTS.TABLES.IMPUTA_A);
    } catch (e) {
      throw e;
    }
  }
  public static async getFromDb(filters?: IFilter[]): Promise<Array<ImputaAModel>> {
    try {
      const result = await Repository.get(CONSTANTS.TABLES.IMPUTA_A, filters);
      let imputasA: Array<ImputaAModel> = [];
      if (!result.values) return imputasA;

      result.values.forEach((element: any) => {
        const newElement: ImputaAModel = {
          id: element.id,
          descripcion: element.descripcion,
        };
        imputasA = [...imputasA, newElement];
      });

      return imputasA;
    } catch (error) {
      throw error;
    }
  }
}
