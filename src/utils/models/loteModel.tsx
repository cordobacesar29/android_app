
export interface ILoteModel {
    fecha: string;
    parte?: number;
    imputaA?: string;
    codEstablecimiento?: number;
    codLote?: number;
    codTarea?: number;
    cantidad?: number;
    propia: boolean | string;
    codContratista?: number;
    codLoteActividad?: number;
    codArea?: number;
    campania?: string;
    codPeriodo?: number;
}
