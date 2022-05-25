import { ISelect } from "../../interfaces/ISelect";
import { MaquinariaModel } from "../../services/modules/maquinarias/MaquinariaModel";

export const getMaquinaria = (code: number, maquinarias: Array<any>): string => {
  const data = maquinarias.find((item) => item.key === code);
  return data?.value || "Sin Máquinas";
};

export const getMaquinariasToSelect = (maquinarias: Array<MaquinariaModel>): ISelect[] => {
  return maquinarias?.map((m): ISelect => ({ key: m.codigo, value: m.descripcion })) ?? [];
}