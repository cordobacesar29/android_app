import { IAsignacionModel } from "../../models/asignacionModel";
import { ILoteModel } from "../../models/loteModel";

export const enableResumenTab = (
  lote: ILoteModel,
  asig: IAsignacionModel | undefined = undefined
): boolean => {
  let isEnable = !!lote.codTarea;
  if (!!asig) {
    isEnable =
      isEnable &&
      !!asig.justificacion &&
      !!asig.supervisorCod &&
      !!asig.tecnicoCod;
  }
  return isEnable;
};
