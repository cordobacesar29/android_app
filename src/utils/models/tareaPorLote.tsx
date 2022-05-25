import { ILoteModel } from "./loteModel";
import { IInsumoModel } from "./insumoModel";
import { IEmpleadoModel } from "./empleadoModel";
import { IMaquinariaModel } from "./maquinariaModel";

export interface ITareaPorLote {
  id?: string;
  laborId?: number;
  fechaCarga: string;
  codPeriodo?: number;
  observacionesTarea: string;
  lote: ILoteModel;
  insumos: IInsumoModel[];
  empleados: IEmpleadoModel[];
  maquinaria: IMaquinariaModel[];
  ordenId?: number;
  usuario?: string;
  nroOrdentrabajo?: number;
}
