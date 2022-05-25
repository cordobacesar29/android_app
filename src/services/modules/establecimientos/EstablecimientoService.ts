import { CONSTANTS } from '../../constants/constants';
import apiAxiosInstance from '../../../utils/httpConfig/apiAxiosInstance';
import { EstablecimientoModel } from './EstablecimientoModel';
import { Repository } from '../../../repositories/Repository';

export class EstablecimientoService {
  public static async getAll() {
    try {
      const response = await apiAxiosInstance.get(CONSTANTS.ENDPOINTS.MASTER_DATA.Establecimientos);
      let establecimientos: Array<EstablecimientoModel> = [];

      response.data.forEach((element: any) => {
        const newElement: EstablecimientoModel = {
          id: element.id,
          codigo: element.codigo,
          nombre: element.nombre,
          latitud: element.latitud,
          longitud: element.longitud,
        };

        establecimientos = [...establecimientos, newElement];
      });
      
      await Repository.saveAll(establecimientos, CONSTANTS.TABLES.ESTABLECIMIENTOS);
    } catch (e) {
      throw e;
    }
  }
  public static async getFromDb(): Promise<Array<EstablecimientoModel>> {
    try {
      const result = await Repository.get(CONSTANTS.TABLES.ESTABLECIMIENTOS);
      let establecimientos: Array<EstablecimientoModel> = [];
      if (!result.values) return establecimientos;

      result.values.forEach((element: any) => {
        const newElement: EstablecimientoModel = {
          id: element.id,
          codigo: element.codigo,
          nombre: element.nombre,
        };
        establecimientos = [...establecimientos, newElement];
      });

      return establecimientos;
    } catch (error) {
      throw error;
    }
  }
}
