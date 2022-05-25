export interface OrdenDeTrabajoModel {
  id: number;
  cantidad?: number;
  tipo?: string;
  codArea?: number;
  codLote?: number;
  codTarea?: number;
  propia: boolean | string;
  codContratista?: number;
  observacionesTarea?: string;
  usuario?: string;
  fechaCarga?: string;
  precioTarea?: number;
  observacionesMaquina?: string;
  codPeriodo?: number;
  codLoteActividad?: number;
  codEstablecimiento?: number;
  cotizacionDolar?: number;
  ejecutada?: string;
  fecha: string;
  horaCarga?: string;
  numero?: number;
  precioTareaDolar?: number;
  tecnico: number;
  supervisor: number;
  justificacion?: string;
  isSync?: number;
  ordenesTrabajoInsumo?: OrdenDeTrabajoInsumoModel[];
  ordenesTrabajoPersonal?: OrdenDeTrabajoPersonalModel[];
}

export interface OrdenDeTrabajoInsumoModel {
  id?: number;
  codDeposito: number;
  codArticulo: number;
  dosis?: number;
  cantidad: number;
  ordenTrabajoId: number;
  ordenTrabajoMaquinaId?: number;
  tipo: string;
}

export interface OrdenDeTrabajoPersonalModel {
  id?: number;
  cantidad: number;
  codConcepto: number;
  codEmpleado: number;
  legajo: string;
  importe?: number;
  precio?: number;
  ordenTrabajoId?: number;
}
