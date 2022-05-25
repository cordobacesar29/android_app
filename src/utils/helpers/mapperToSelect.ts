import { ISelect } from "../../interfaces/ISelect";
import { CuentaModel } from "../../services/modules/cultivos/CuentaModel";
import { IContratoModel } from "../../services/modules/destinos/ContratosModel";
import { IDestinoGrupoCaracteristicaModel } from "../../services/modules/destinos/DestinoGrupoCaracteristicasModel";
import { IGrupoDestinoAModel } from "../../services/modules/destinos/GrupoDestinoMode";
import { IModoDestinoModel } from "../../services/modules/destinos/ModoDestinoModel";
import { EstablecimientoModel } from "../../services/modules/establecimientos/EstablecimientoModel";
import { PeriodoModel } from "../../services/modules/periodos/PeriodoModel";

export const mapPeriodToISelect = (data: PeriodoModel[]): ISelect[] | [] => {
  const result =
    data.length > 0
      ? data.map(
          (el: PeriodoModel): ISelect => ({
            key: el.id,
            value: el.descripcion,
          })
        )
      : [];
  return result;
};

export const mapCultivoToISelect = (data: CuentaModel[]): ISelect[] | [] => {
  const result =
    data.length > 0
      ? data.map(
          (el: CuentaModel): ISelect => ({
            key: el.id,
            value: el.descripcion,
          })
        )
      : [];
  return result;
};

export const mapModoDestinoToISelect = (
  data: IModoDestinoModel[]
): ISelect[] | [] => {
  const result =
    data.length > 0
      ? data.map(
          (el: IModoDestinoModel): ISelect => ({
            key: el.id,
            value: el.descripcion,
          })
        )
      : [];
  return result;
};

export const mapGrupoDestinoToISelect = (
  data: IGrupoDestinoAModel[]
): ISelect[] | [] => {
  const result =
    data.length > 0
      ? data.map(
          (el: IGrupoDestinoAModel): ISelect => ({
            key: el.id,
            value: el.nombre,
          })
        )
      : [];
  return result;
};

export const mapEstablecimientoToISelect = (
  data: EstablecimientoModel[]
): ISelect[] | [] => {
  const result =
    data.length > 0
      ? data.map(
          (el: EstablecimientoModel): ISelect => ({
            key: el.id,
            value: el.nombre,
          })
        )
      : [];
  return result;
};

export const mapCaracteristicaToISelect = (
  data: IDestinoGrupoCaracteristicaModel[]
): ISelect[] | [] => {
  const result =
    data.length > 0
      ? data.map(
          (el: IDestinoGrupoCaracteristicaModel): ISelect => ({
            key: el.id,
            value: el.descripcion,
          })
        )
      : [];
  return result;
};

export const mapContratoToISelect = (
  data: IContratoModel[]
): ISelect[] | [] => {
  const result =
    data.length > 0
      ? data.map(
          (el: IContratoModel): ISelect => ({
            key: el.id,
            value: el.descontrato,
          })
        )
      : [];
  return result;
};
