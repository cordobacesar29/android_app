import { CONSTANTS } from '../../constants/constants';
import apiAxiosInstance from '../../../utils/httpConfig/apiAxiosInstance';
import { CotizacionModel } from './CotizacionModel';
import { Repository } from '../../../repositories/Repository';

export class CotizacionService {
    public static async getAll(): Promise<Array<CotizacionModel>> {
        try {
            const response = await apiAxiosInstance.get(CONSTANTS.ENDPOINTS.MASTER_DATA.Cotizaciones);
            let cotizaciones: Array<CotizacionModel> = [];
            
            response.data.forEach((element: any) => {
                const newElement: CotizacionModel = {
                    id: element.id,
                    fecha: element.fecha,
                    monedaId: element.monedaId,
                    valorCompra: element.valorCompra,
                    valorVenta: element.valorVenta
                };
                
                cotizaciones = [...cotizaciones, newElement];
            });
            return cotizaciones;
        } catch (e) {
            throw e;
        }
    }

    public static async getFromDb(): Promise<Array<CotizacionModel>>{
        try {
            const result = await Repository.get(CONSTANTS.TABLES.COTIZACIONES);
            let cotizaciones: Array<CotizacionModel> = [];
            if (!result.values) return cotizaciones;
            
            result.values.forEach((element: any) => {
                const newElement: CotizacionModel = {
                    id: element.id,
                    fecha: element.fecha,
                    monedaId: element.monedaId,
                    valorCompra: element.valorCompra,
                    valorVenta: element.valorVenta
                };
    
                cotizaciones = [...cotizaciones, newElement];
            });
    
            return cotizaciones;

        } catch(error) {
            throw error;
        }
    }
}
