import { CONSTANTS } from '../../constants/constants';
import apiAxiosInstance from '../../../utils/httpConfig/apiAxiosInstance';
import { MaquinariaModel } from './MaquinariaModel';
import { Repository } from '../../../repositories/Repository';

export class MaquinariaService {
    public static async getAll() {
        try {
            const response = await apiAxiosInstance.get(CONSTANTS.ENDPOINTS.MASTER_DATA.Maquinarias);
            let maquinarias: Array<MaquinariaModel> = [];

            response.data.forEach((element: any) => {  
                const newElement: MaquinariaModel = {
                    id: element.id,
                    codigo: element.codigo,
                    descripcion: element.descripcion,
                    empresa: element.empresa,
                    habilitada: element.habilitada,
                    tipo: element.tipo,
                    tipoDescripcion: element.tipoDescripcion
                };
                maquinarias = [...maquinarias, newElement];
            });

            await Repository.saveAll(maquinarias, CONSTANTS.TABLES.MAQUINARIAS);
        } catch (e) {
            throw e;
        }
    }

    public static async getFromDb(): Promise<Array<MaquinariaModel>> {
        try {
            const result = await Repository.get(CONSTANTS.TABLES.MAQUINARIAS);
            let maquinarias: Array<MaquinariaModel> = [];
            if (!result.values) return maquinarias;

            result.values.forEach((element: any) => {
                const newElement: MaquinariaModel = {
                    id: element.id,
                    codigo: element.codigo,
                    descripcion: element.descripcion,
                    empresa: element.empresa,
                    habilitada: element.habilitada,
                    tipo: element.tipo,
                    tipoDescripcion: element.tipoDescripcion
                };
                maquinarias = [...maquinarias, newElement];
            });

            return maquinarias;

        } catch (error) {
            throw error;
        }
    }

}
