export interface ITareaPorLoteCard {
  id?: number;
  fecha: string;
  parteNum?: number;
  imputaA: string;
  establecimiento: string;
  tarea?: string;
  lote: string;
  cantidad?: number;
  isSync?: number;
  isChecked: boolean;
  codPeriodo: number | undefined;
}
