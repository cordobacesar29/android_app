export interface IEmpleadoModel {
    id:string;
    codEmpleado: number;
    legajo: string;    
    codConcepto: number;
    cantidad: number;
    tarifa?: number;
    importe?: number;
}