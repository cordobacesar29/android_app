import { CONSTANTS } from '../../constants/constants';
import apiAxiosInstance from '../../../utils/httpConfig/apiAxiosInstance';
import { InsumoModel } from './InsumoModel';
import { Repository } from '../../../repositories/Repository';

export class InsumosService {
    public static async getAll() {
        try {
            const response = await apiAxiosInstance.get(CONSTANTS.ENDPOINTS.MASTER_DATA.Insumos);
            let insumos: Array<InsumoModel> = [];

            response.data.forEach((element: any) => {
                const newElement: InsumoModel = {
                    id: element.id,
                    codArticulo: element.codArticulo,
                    codRubro: element.codRubro,
                    descripcion: element.descripcion,
                    unidadMedidaId: element.unidadMedidaId,
                };

                insumos = [...insumos, newElement];
            });
            
            await Repository.saveAll(insumos, CONSTANTS.TABLES.INSUMOS);
        } catch (e) {
            throw e;
        }
    }

    public static async getFromDb(): Promise<Array<InsumoModel>>{
        try {
            const result = await Repository.get(CONSTANTS.TABLES.INSUMOS);
            let insumos: Array<InsumoModel> = [];
            if (!result.values) return insumos;
            
            result.values.forEach((element: any) => {
                const newElement: InsumoModel = {
                    id: element.id,
                    codArticulo: element.codArticulo,
                    codRubro: element.codRubro,
                    descripcion: element.descripcion,
                    unidadMedidaId: element.unidadMedidaId,
                };
    
                insumos = [...insumos, newElement];
            });
    
            return insumos;

        } catch(error) {
            throw error;
        }
    }
}
