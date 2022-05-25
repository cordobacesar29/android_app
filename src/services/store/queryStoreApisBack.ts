import apiAxiosInstance from "../../utils/httpConfig/apiAxiosInstance";
import {
  IHarvestNotDestiny,
  IHarvestDestiny,
  IHarvestFilterBack,
  IHarvestForm,
} from "../../utils/models/harvestModel";
import { CONSTANTS } from "../constants/constants";

export const getHarvestFilter = async (): Promise<
  IHarvestFilterBack | undefined
> => {
  try {
    const response = await apiAxiosInstance.get(
      CONSTANTS.ENDPOINTS.MOVIMIENTO_DESTINO.Filtro
    );
    return response.data;
  } catch (error) {
    return undefined;
  }
};
export const getHarvestReport = async (
  params: IHarvestForm
): Promise<IHarvestNotDestiny[] | IHarvestDestiny[] | undefined> => {
  try {
    let endUrl = `?PeriodoId=${params.PeriodoId}&ActividadId=${params.ActividadId}&VerTipoDestino=${params.verTipoDestino}`;
    if (params.ModoDestino !== "") {
      endUrl += `&ModoDestino=${params.ModoDestino}`;
    }
    if (params.Hasta !== "") {
      endUrl += `&Hasta=${params.Hasta}`;
    }
    if (params.Desde !== "") {
      endUrl += `&Desde=${params.Desde}`;
    }
    if (params.EstablecimientoId.length > 0) {
      params.EstablecimientoId.forEach((el) => {
        endUrl += `&EstablecimientoId=${el}`;
      });
    }

    if (params.CaracterisitcaId.length > 0) {
      params.CaracterisitcaId.forEach((el) => {
        endUrl += `&CaracterisitcaId=${el}`;
      });
    }
    if (params.ContratoId.length > 0) {
      params.ContratoId.forEach((el) => {
        endUrl += `&ContratoId=${el}`;
      });
    }
    if (params.GrupoDestinoId.length > 0) {
      params.GrupoDestinoId.forEach((el) => {
        endUrl += `&GrupoDestinoId=${el}`;
      });
    }
    const url = `${CONSTANTS.ENDPOINTS.MOVIMIENTO_DESTINO.TotalesPorDestino}${endUrl}`;
    const response = await apiAxiosInstance.get(url);
    return response.data;
  } catch (error) {
    return undefined;
  }
};
