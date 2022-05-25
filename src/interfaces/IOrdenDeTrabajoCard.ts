export interface IOrdenDeTrabajoCard {
    id: number;
    campania?: string;
    fecha: string;
    actividad?: string
    establecimiento: string;
    tarea?: string;
    numero?: number;
    lote?: string;
    cantidad?: number;
    isSync?: number;
    isChecked: boolean;
    ejecutada: string;
}
