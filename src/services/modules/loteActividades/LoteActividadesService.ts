import apiAxiosInstance from "../../../utils/httpConfig/apiAxiosInstance";
import { CONSTANTS } from "../../constants/constants";
import { Repository } from "../../../repositories/Repository";
import { LoteActividadModel } from "./LoteActividadModel";

export class LoteActividadesService {
    public static async getAll() {
        try {
            const response = await apiAxiosInstance.get(
                CONSTANTS.ENDPOINTS.MASTER_DATA.LoteActividades
            );
            let loteActividades: Array<LoteActividadModel> = [];

            response.data.forEach((element: any) => {
                const newElement: LoteActividadModel = {
                    id: element.id,
                    codigo: element.codigo,
                    descripcion: element.descripcion,
                    superficie: element.superficie,
                    codEstablecimiento: element.codEstablecimiento,
                    codLote: element.codLote,
                    codActividad: element.codActividad,
                    codPeriodo: element.codPeriodo
                };

                loteActividades = [...loteActividades, newElement];
            });

            await Repository.saveAll(loteActividades, CONSTANTS.TABLES.LOTE_ACTIVIDAD);
        } catch (e) {
            throw e;
        }
    }

    public static async getFromDb(): Promise<Array<LoteActividadModel>> {
        try {
            const result = await Repository.get(CONSTANTS.TABLES.LOTE_ACTIVIDAD);
            let loteActividades: Array<LoteActividadModel> = [];
            if (!result.values) return loteActividades;

            result.values.forEach((element: any) => {
                const newElement: LoteActividadModel = {
                    id: element.id,
                    codigo: element.codigo,
                    descripcion: element.descripcion,
                    superficie: element.superficie,
                    codEstablecimiento: element.codEstablecimiento,
                    codLote: element.codLote,
                    codActividad: element.codActividad,
                    codPeriodo: element.codPeriodo
                };
                loteActividades = [...loteActividades, newElement];
            });

            return loteActividades;
        } catch (error) {
            throw error;
        }
    }
}
