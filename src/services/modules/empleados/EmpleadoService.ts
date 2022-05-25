import { CONSTANTS } from '../../constants/constants';
import apiAxiosInstance from '../../../utils/httpConfig/apiAxiosInstance';
import { EmpleadoModel } from './EmpleadoModel';
import { Repository } from '../../../repositories/Repository';

export class EmpleadoService {
    public static async getAll() {
        try {
            const response = await apiAxiosInstance.get(CONSTANTS.ENDPOINTS.MASTER_DATA.Empleados);
            let empleados: Array<EmpleadoModel> = [];

            response.data.forEach((element: any) => {
                const newElement: EmpleadoModel = {
                    id: element.id,
                    codigo: element.codigo,
                    nombre: element.nombre,
                    jornal: element.jornal,
                    legajo: element.legajo,
                    codConcepto: element.codConcepto,
                    activo: element.activo
                };
                
                empleados = [...empleados, newElement];
            });

            await Repository.saveAll(empleados, CONSTANTS.TABLES.EMPLEADOS);
        } catch (e) {
            throw e;
        }
    }

    public static async getFromDb(): Promise<Array<EmpleadoModel>>{
        try {
            const result = await Repository.get(CONSTANTS.TABLES.EMPLEADOS);
            let empleados: Array<EmpleadoModel> = [];
            if (!result.values) return empleados;
            
            result.values.forEach((element: any) => {
                const newElement: EmpleadoModel = {
                    id: element.id,
                    codigo: element.codigo,
                    nombre: element.nombre,
                    jornal: element.jornal,
                    legajo: element.legajo,
                    codConcepto: element.codConcepto,
                    activo: element.activo
                };
    
                empleados = [...empleados, newElement];
            });
    
            return empleados;

        } catch(error) {
            throw error;
        }
    }
}
