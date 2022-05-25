import { TareasModel } from "../../../services/modules/tareas/TareasModel";

export const enableInsumoTab = (tarea?: TareasModel): boolean => {
    return tarea !== undefined && tarea.indicadorInsumo !== 'N' && tarea.indicadorInsumo !== null;
};
