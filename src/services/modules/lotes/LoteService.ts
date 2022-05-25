import { CONSTANTS } from '../../constants/constants';
import apiAxiosInstance from '../../../utils/httpConfig/apiAxiosInstance';
import { LoteModel } from './LoteModel';
import { Repository } from '../../../repositories/Repository';

export class LoteService {
    public static async getAll() {
        try {
            const response = await apiAxiosInstance.get(
                CONSTANTS.ENDPOINTS.MASTER_DATA.Lotes
            );
            let lotes: Array<LoteModel> = [];

            response.data.forEach((element: any) => {
                const newElement: LoteModel = {
                    id: element.id,
                    codigo: element.codigo,
                    nombre: element.nombre,
                    superficie: element.superficie,
                    codEstablecimiento: element.codEstablecimiento,
                };

                lotes = [...lotes, newElement];
            });

            await Repository.saveAll(lotes, CONSTANTS.TABLES.LOTES);
        } catch (e) {
            throw e;
        }
    }
    public static async getFromDb(): Promise<Array<LoteModel>> {
        try {
            const result = await Repository.get(CONSTANTS.TABLES.LOTES);
            let lotes: Array<LoteModel> = [];
            if (!result.values) return lotes;

            result.values.forEach((element: any) => {
                const newElement: LoteModel = {
                    id: element.id,
                    codigo: element.codigo,
                    nombre: element.nombre,
                    superficie: element.superficie,
                    codEstablecimiento: element.codEstablecimiento,
                };
                lotes = [...lotes, newElement];
            });

            return lotes;
        } catch (error) {
            throw error;
        }
    }
}
