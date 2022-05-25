import { CONSTANTS } from "../../constants/constants";
import apiAxiosInstance from "../../../utils/httpConfig/apiAxiosInstance";
import { EmpresaModel } from "./EmpresaModel";
import { Repository } from "../../../repositories/Repository";

export class EmpresaService {
  public static async getAll() {
    try {
      const response = await apiAxiosInstance.get(
        CONSTANTS.ENDPOINTS.MASTER_DATA.Empresas
      );
      let empresas: Array<EmpresaModel> = [];

      response.data.forEach((element: any) => {
        const newElement: EmpresaModel = {
          id: element.id,
          codigo: element.codigo,
          nombre: element.nombre,
        };

        empresas = [...empresas, newElement];
      });

      await Repository.saveAll(empresas, CONSTANTS.TABLES.EMPRESAS);
    } catch (e) {
      throw e;
    }
  }
  public static async getFromDb(): Promise<Array<EmpresaModel>> {
    try {
      const result = await Repository.get(CONSTANTS.TABLES.EMPRESAS);
      let empresas: Array<EmpresaModel> = [];
      if (!result.values) return empresas;

      result.values.forEach((element: any) => {
        const newElement: EmpresaModel = {
          id: element.id,
          codigo: element.codigo,
          nombre: element.nombre,
        };
        empresas = [...empresas, newElement];
      });

      return empresas;
    } catch (error) {
      throw error;
    }
  }
}
