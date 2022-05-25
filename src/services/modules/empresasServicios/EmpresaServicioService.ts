import { CONSTANTS } from "../../constants/constants";
import apiAxiosInstance from "../../../utils/httpConfig/apiAxiosInstance";
import { Repository } from "../../../repositories/Repository";
import { EmpresaServicioModel } from "./EmpresaServicioModel";

export class EmpresaServicioService {
  public static async getAll() {
    try {
      const response = await apiAxiosInstance.get(
        CONSTANTS.ENDPOINTS.MASTER_DATA.EmpresasServicios
      );
      let empresas: Array<EmpresaServicioModel> = [];

      response.data.forEach((element: any) => {
        const newElement: EmpresaServicioModel = {
          id: element.id,
          codigo: element.codigo,
          descripcion: element.descripcion,
        };

        empresas = [...empresas, newElement];
      });

      await Repository.saveAll(empresas, CONSTANTS.TABLES.EMPRESAS_SERVICIOS);
    } catch (e) {
      throw e;
    }
  }
  public static async getFromDb(): Promise<Array<EmpresaServicioModel>> {
    try {
      const result = await Repository.get(CONSTANTS.TABLES.EMPRESAS_SERVICIOS);
      let empresas: Array<EmpresaServicioModel> = [];
      if (!result.values) return empresas;

      result.values.forEach((element: any) => {
        const newElement: EmpresaServicioModel = {
          id: element.id,
          codigo: element.codigo,
          descripcion: element.descripcion,
        };
        empresas = [...empresas, newElement];
      });

      return empresas;
    } catch (error) {
      throw error;
    }
  }
}
