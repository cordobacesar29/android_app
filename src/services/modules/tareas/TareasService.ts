import { CONSTANTS } from '../../constants/constants';
import apiAxiosInstance from '../../../utils/httpConfig/apiAxiosInstance';
import { TareasModel } from './TareasModel';
import { Repository } from '../../../repositories/Repository';

export class TareasService {
    public static async getAll() {
        try {
            const response = await apiAxiosInstance.get(
                CONSTANTS.ENDPOINTS.MASTER_DATA.Tareas
            );
            let tareas: Array<TareasModel> = [];

            response.data.forEach((element: any) => {
                const newElement: TareasModel = {
                    id: element.id,
                    codigo: element.codigo,
                    tipo: element.tipo,
                    descripcion: element.descripcion,
                    indicadorInsumo: element.indicadorInsumo,
                    precio: element.precio,
                    tipoPrecio: element.tipoPrecio,
                };

                tareas = [...tareas, newElement];
            });
            
            await Repository.saveAll(tareas, CONSTANTS.TABLES.TAREAS);
        } catch (e) {
            throw e;
        }
    }
    public static async getFromDb(): Promise<Array<TareasModel>> {
        try {
            const result = await Repository.get(CONSTANTS.TABLES.TAREAS);
            let tareas: Array<TareasModel> = [];
            if (!result.values) return tareas;

            result.values.forEach((element: any) => {
                const newElement: TareasModel = {
                    id: element.id,
                    codigo: element.codigo,
                    tipo: element.tipo,
                    descripcion: element.descripcion,
                    indicadorInsumo: element.indicadorInsumo,
                    precio: element.precio,
                    tipoPrecio: element.tipoPrecio,
                };
                tareas = [...tareas, newElement];
            });

            return tareas;
        } catch (error) {
            throw error;
        }
    }
}
