import { ISelect } from "../../interfaces/ISelect";

export const getPeriodoName = (cod: number = 0, periodos: Array<ISelect>): string => {  
  const data = periodos.find((item) => item.key == cod);  
  return data?.value || "Sin Periodo";
};
