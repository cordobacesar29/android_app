export interface LaboresModel {
  id?: number;
  fecha: string;
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
  tipo?: string;
  nroOrdentrabajo?: number;
  cantidad?: number;
  parteNum?: number;
  codPeriodo?: number;
  codLoteActividad?: number;
  codEstablecimiento?: number;
  imputa?: string;
  laboresInsumos?: LaboresInsumoModel[];
  laboresMaquinarias?: LaboresMaquinariaModel[];
  laboresPersonales?: LaboresPersonalModel[];
  isSync: number;
}

export interface LaboresInsumoModel {
  id?: number;
  laborId?: number;
  codArticulo: number;
  codDeposito: number;
  laborMaquinariaId?: number;
  cantidad: number;
  dosis?: number;
  tipo: string;
}

export interface LaboresMaquinariaModel {
  id?: number;
  laborId?: number;
  maquinariaCod: number;
  empresaCod: number;
  horasMaquinaria: number;
  kilometraje?: number;
  laboresInsumos?: LaboresInsumoModel[];
}

export interface LaboresPersonalModel {
  id?: number;
  laborId?: number;
  codEmpleado: number;
  codConcepto: number;
  legajo: string;
  cantidad: number;
  tarifa?: number;
  importe?: number;
}
