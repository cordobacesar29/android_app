import { ISelect } from "../../interfaces/ISelect";

export const getLote = (code:number, lotes: ISelect[]): string[] => {
    const data = lotes.filter((l) => l.key === code);
    return data?.map(d => d.value) || "Sin Lote";
  };
  