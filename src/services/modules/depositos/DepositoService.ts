import { CONSTANTS } from '../../constants/constants';
import apiAxiosInstance from '../../../utils/httpConfig/apiAxiosInstance';
import { DepositoModel } from './DepositoModel';
import { Repository } from '../../../repositories/Repository';

export class DepositoService {
    public static async getAll() {
        try {
            const response = await apiAxiosInstance.get(CONSTANTS.ENDPOINTS.MASTER_DATA.Depositos);
            let depositos: Array<DepositoModel> = [];
            
            response.data.forEach((element: any) => {
                const newElement: DepositoModel = {
                    id: element.id,
                    codDeposito: element.codDeposito,
                    descripcion: element.descripcion,
                    trazabilidad: element.trazabilidad,
                };

                depositos = [...depositos, newElement];
            });

            await Repository.saveAll(depositos, CONSTANTS.TABLES.DEPOSITOS);
        } catch (e) {
            throw e;
        }
    }
    
    public static async getFromDb(): Promise<Array<DepositoModel>>{
        try {
            const result = await Repository.get(CONSTANTS.TABLES.DEPOSITOS);
            let depositos: Array<DepositoModel> = [];
            if (!result.values) return depositos;
            
            result.values.forEach((element: any) => {
                const newElement: DepositoModel = {
                    id: element.id,
                    codDeposito: element.codDeposito,
                    descripcion: element.descripcion,
                    trazabilidad: element.trazabilidad,
                };
    
                depositos = [...depositos, newElement];
            });
    
            return depositos;

        } catch(error) {
            throw error;
        }
    }
}
