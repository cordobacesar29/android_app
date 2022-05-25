import { CONSTANTS } from '../../constants/constants';
import apiAxiosInstance from '../../../utils/httpConfig/apiAxiosInstance';
import { CuentaModel } from './CuentaModel';
import { Repository } from '../../../repositories/Repository';

export class CuentaService {
    public static async getAll() {
        try {
            const response = await apiAxiosInstance.get(CONSTANTS.ENDPOINTS.MASTER_DATA.Cuentas);
            let cuentas: Array<CuentaModel> = [];
            
            response.data.forEach((element: any) => {
                const newElement: CuentaModel = {
                    id: element.id,
                    codigo: element.codigo,
                    descripcion: element.descripcion,
                };

                cuentas = [...cuentas, newElement];
            });

            await Repository.saveAll(cuentas, CONSTANTS.TABLES.CUENTAS);
        } catch (e) {
            throw e;
        }
    }
    
    public static async getFromDb(): Promise<Array<CuentaModel>>{
        try {
            const result = await Repository.get(CONSTANTS.TABLES.CUENTAS);
            let cuentas: Array<CuentaModel> = [];
            if (!result.values) return cuentas;
            
            result.values.forEach((element: any) => {
                const newElement: CuentaModel = {
                    id: element.id,
                    codigo: element.codigo,
                    descripcion: element.descripcion,
                };
    
                cuentas = [...cuentas, newElement];
            });
    
            return cuentas;

        } catch(error) {
            throw error;
        }
    }
}
