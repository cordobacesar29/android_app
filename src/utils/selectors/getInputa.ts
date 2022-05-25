import { ISelect } from "../../interfaces/ISelect";

export const getImputas = (id: string = "", imputas: ISelect[]): string => {
  const data = imputas.find((item) => item.key === id);
  return data?.value || "Sin Actividad";
};
