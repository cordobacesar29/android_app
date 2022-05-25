import { CONSTANTS } from '../../constants/constants';
import apiAxiosInstance from '../../../utils/httpConfig/apiAxiosInstance';
import { SubRubrosModel } from './SubRubrosModel';
import { Repository } from '../../../repositories/Repository';

export class SubRubrosService {
    public static async getAll() {
        try {
            const response = await apiAxiosInstance.get(CONSTANTS.ENDPOINTS.MASTER_DATA.SubRubros);
            let subRubros: Array<SubRubrosModel> = [];

            response.data.forEach((element: any) => {
                const newElement: SubRubrosModel = {
                    id: element.id,
                    codRubro: element.codRubro,
                    codSubRubro: element.codSubRubro,
                    descripcion: element.descripcion,
                };
                
                subRubros = [...subRubros, newElement];
            });

            await Repository.saveAll(subRubros, CONSTANTS.TABLES.SUBRUBROS);
        } catch (e) {
            throw e;
        }
    }
}
