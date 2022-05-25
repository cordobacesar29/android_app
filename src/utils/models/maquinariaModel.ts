import { IInsumoModel } from "./insumoModel";

export interface IMaquinariaModel {
    id:string;
    maquinariaCod: number;
    empresaCod: number;
    hsKm: number;
    insumos: IInsumoModel[];
}