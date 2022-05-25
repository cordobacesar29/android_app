import { createContext, useContext } from "react";
import { IAsignacionModel } from "../models/asignacionModel";
import { IEmpleadoModel } from "../models/empleadoModel";
import { IInsumoModel } from "../models/insumoModel";
import { ILoteModel } from "../models/loteModel";
import { IOrdenDeTrabajo } from "../models/ordenDetrabajo";

interface IContext {
  ordenDeTrabajo: IOrdenDeTrabajo;
  ordenesDeTrabajo: IOrdenDeTrabajo[];

  addLote: (lote: ILoteModel, allownInsumo: boolean) => void;

  getInsumo: (id: string) => IInsumoModel;
  addInsumo: (insumo: IInsumoModel) => void;
  editInsumo: (insumo: IInsumoModel) => void;
  removeInsumo: (id: string) => void;

  getEmpleado: (id: string) => any;  
  addEmpleado: (empleado: IEmpleadoModel) => void;
  editEmpleado: (empleado: IEmpleadoModel) => void;
  removeEmpleado: (id: string) => void;

  addAsignacion: (asignacion: IAsignacionModel) => void;

  addOrdenDeTrabajo: (tareaPorLote: IOrdenDeTrabajo, saveInDb: boolean) => Promise<void>;
  removeOrdenDeTrabajo: () => void;
}

export const ordenDeTrabajoContext = createContext({} as IContext);

export const useOrdenDeTrabajo = () => {
  return useContext(ordenDeTrabajoContext);
};
