import { createContext, useContext } from "react";
import { IEmpleadoModel } from "../models/empleadoModel";
import { IMaquinariaModel } from "../models/maquinariaModel";
import { IInsumoModel } from "../models/insumoModel";
import { ILoteModel } from "../models/loteModel";
import { ITareaPorLote } from "../models/tareaPorLote";

interface IContext {
  tareaPorLote: ITareaPorLote;
  tareasPorLote: ITareaPorLote[];
  addLote: (lote: ILoteModel, allownMaquinaria: boolean, allownInsumo: boolean) => void;
  addInsumoLote: (insumo: IInsumoModel) => void;
  editInsumoLote: (insumo: IInsumoModel) => void;
  addInsumoToMaquinaria: (insumo: IInsumoModel, maquinariaId: string) => void;
  editInsumoOfMaquinaria: (insumo: IInsumoModel, maquinariaId: string, insumoId: string) => void;
  removeInsumoLote: (id: string) => void;
  removeInsumoFromMaquinaria: (insumoId: string, maquinariaId: string) => void;
  getInsumo: (id: string) => IInsumoModel;
  getInsumoFromMaquinaria: (id: string, maquinariaId: string) => IInsumoModel;
  addEmpleado: (empleado: IEmpleadoModel) => void;
  removeEmpleado: (id: string) => void;
  getEmpleado: (id: string) => any;  
  editEmpleado: (empleado: IEmpleadoModel) => void;
  addMaquinaria: (maquinaria: IMaquinariaModel) => void;
  removeMaquinaria: (id: string) => void;
  getMaquinaria: (id: string) => any;  
  editMaquinaria: (empleado: IMaquinariaModel) => void;
  removeTareaPorLote: () => void;
  addTareaPorLote: (tareaPorLote: ITareaPorLote, saveInDb: boolean) => Promise<void>;
}

export const tareaPorLoteContext = createContext({} as IContext);

export const useTareaPorLote = () => {
  return useContext(tareaPorLoteContext);
};
