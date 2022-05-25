import { ILoteModel } from "./loteModel";
import { IInsumoModel } from "./insumoModel";
import { IEmpleadoModel } from "./empleadoModel";
import { IAsignacionModel } from "./asignacionModel";

export interface IOrdenDeTrabajo {
  id?: string;
  ordenTrabajoId?: number;
  fechaCarga: string;
  horaCarga?: string;
  codPeriodo: number;
  codArea: number;
  observacionesTarea: string;
  lote: ILoteModel;
  insumos: IInsumoModel[];
  asignacion: IAsignacionModel;
  empleados: IEmpleadoModel[];
}
