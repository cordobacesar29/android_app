export interface IHarvestForm {
  PeriodoId: number;
  ActividadId: number;
  verTipoDestino: boolean;
  Desde: string;
  Hasta: string;
  ModoDestino: string;
  GrupoDestinoId: Array<any>;
  EstablecimientoId: Array<any>;
  CaracterisitcaId: Array<any>;
  ContratoId: Array<any>;
}

export interface IFilterFront {
  Desde: string;
  Hasta: string;
  ModoDestino: string;
  GrupoDestinoId: Array<any>;
  EstablecimientoId: Array<any>;
  CaracterisitcaId: Array<any>;
  ContratoId: Array<any>;
}

export interface IHarvestFilterBack {
  periodos: Array<any>;
  cultivos: Array<any>;
  modoDestinos: Array<any>;
  grupoDestinos: Array<any>;
  establecimientos: Array<any>;
  destinoGrupoCaracteristicas: Array<any>;
  contratos: Array<any>;
}

export interface IHarvestFilterData {  
  modoDestinos: Array<any>;
  grupoDestinos: Array<any>;
  establecimientos: Array<any>;
  destinoGrupoCaracteristicas: Array<any>;
  contratos: Array<any>;
}

export interface IHarvestNotDestiny {
  nombre: string;
  existencia: number;
}

export interface IHarvestDestiny {
  tipoDestino: string;
  destinos: IHarvestNotDestiny[];
}
