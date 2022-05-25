import { CONSTANTS } from "../../constants/constants";
import apiAxiosInstance from "../../../utils/httpConfig/apiAxiosInstance";
import { ConceptoModel } from "./ConceptoModel";
import { Repository } from "../../../repositories/Repository";

export class ConceptoService {
  public static async getAll() {
    try {
      const response = await apiAxiosInstance.get(
        CONSTANTS.ENDPOINTS.MASTER_DATA.Conceptos
      );
      let conceptos: Array<ConceptoModel> = [];

      response.data.forEach((element: any) => {
        const newElement: ConceptoModel = {
          id: element.id,
          codigo: element.codigo,
          valorUnitario: element.valorUnitario,
          descripcion: element.descripcion,
          tipoCalculo: element.tipoCalculo,
        };

        conceptos = [...conceptos, newElement];
      });

      await Repository.saveAll(conceptos, CONSTANTS.TABLES.CONCEPTOS);
    } catch (e) {
      throw e;
    }
  }

  public static async getFromDb(): Promise<Array<ConceptoModel>> {
    try {
      const result = await Repository.get(CONSTANTS.TABLES.CONCEPTOS);
      let conceptos: Array<ConceptoModel> = [];
      if (!result.values) return conceptos;

      result.values.forEach((element: any) => {
        const newElement: ConceptoModel = {
          id: element.id,
          codigo: element.codigo,
          valorUnitario: element.valorUnitario,
          descripcion: element.descripcion,
          tipoCalculo: element.tipoCalculo,
        };

        conceptos = [...conceptos, newElement];
      });

      return conceptos;
    } catch (error) {
      throw error;
    }
  }
}
