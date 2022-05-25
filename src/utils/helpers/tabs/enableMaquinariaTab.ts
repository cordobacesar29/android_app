import { TareasModel } from "../../../services/modules/tareas/TareasModel";
import { ILoteModel } from "../../models/loteModel";

export const enableMaquinariaTab = (
  lote: ILoteModel,
  tarea?: TareasModel
): boolean => {
  return (
    ((typeof lote.propia === "boolean" && lote.propia === true) ||
      (typeof lote.propia === "string" && lote.propia === "P")) &&
    tarea?.tipo !== "P" &&
    tarea?.indicadorInsumo !== "N" &&
    tarea !== undefined
  );
};
