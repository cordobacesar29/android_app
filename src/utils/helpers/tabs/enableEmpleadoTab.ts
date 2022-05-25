import { ILoteModel } from "../../models/loteModel";

export const enableEmpleadoTab = (lote: ILoteModel): boolean => {
    return lote.codTarea !== undefined;
};
