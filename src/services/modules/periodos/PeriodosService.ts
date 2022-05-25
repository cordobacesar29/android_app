import apiAxiosInstance from "../../../utils/httpConfig/apiAxiosInstance";
import { CONSTANTS } from "../../constants/constants";
import { Repository } from "../../../repositories/Repository";
import { PeriodoModel } from "./PeriodoModel";

export class PeriodosService {
    public static async getAll() {
        try {
            const response = await apiAxiosInstance.get(
                CONSTANTS.ENDPOINTS.MASTER_DATA.Periodos
            );
            let periodos: Array<PeriodoModel> = [];

            response.data.forEach((element: any) => {
                const newElement: PeriodoModel = {
                    id: element.id,
                    codigo: element.codigo,
                    fechaDesde: element.fechaDesde,
                    fechaHasta: element.fechaHasta,
                    descripcion: element.descripcion,
                    isActive: element.isActive
                };

                periodos = [...periodos, newElement];
            });

            await Repository.saveAll(periodos, CONSTANTS.TABLES.PERIODOS);
        } catch (e) {
            throw e;
        }
    }

    public static async getAllFromDb(): Promise<Array<PeriodoModel>> {
        try {
            const resultPeriodos = await Repository.get(CONSTANTS.TABLES.PERIODOS);

            let periodos: Array<PeriodoModel> = [];
            if (!resultPeriodos.values) return periodos;

            resultPeriodos.values.forEach((element: any) => {
                const newElement: PeriodoModel = {
                    id: element.id,
                    codigo: element.codigo,
                    descripcion: element.descripcion,
                    fechaDesde: element.fechaDesde,
                    fechaHasta: element.fechaHasta,
                    isActive: element.isActive
                };

                periodos = [...periodos, newElement];
            });

            return periodos;
        } catch (error) {
            throw error;
        }
    }

    public static async getLastActiveOrDefault(): Promise<PeriodoModel> {
        try {
            const periodos = await PeriodosService.getAllFromDb()

            let sortPeriodos = periodos.sort(function (a, b) { return new Date(b.fechaHasta).getTime() - new Date(a.fechaHasta).getTime(); });

            if (!sortPeriodos) return {} as PeriodoModel;

            let lastPeriodo = sortPeriodos.find(p => p.isActive) ?? sortPeriodos[0];

            return lastPeriodo;
        } catch (error) {
            throw error;
        }
    }
}
