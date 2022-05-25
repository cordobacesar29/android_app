import { useFormik } from "formik";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { getTareaByCode } from "../../../services/store/queryStore";
import { enableInsumoTab } from "../../../utils/helpers/tabs/enableInsumoTab";
import { enableMaquinariaTab } from "../../../utils/helpers/tabs/enableMaquinariaTab";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";
import { ILoteModel } from "../../../utils/models/loteModel";
import { PATH_PAGE } from "../../../utils/routes";

export const useFormikLote = () => {
  const tareaPorLote = useTareaPorLote();

  let history: any = useHistory();
  const formik = useFormik<ILoteModel>({
    initialValues: tareaPorLote.tareaPorLote.lote,
    validationSchema: Yup.object({
      fecha: Yup.date()
        .required("Debe indicar una fecha")
        .max(
          new Date(),
          "La fecha debe ser menor o igual al dia de la fecha actual"
        ),
      imputaA: Yup.string().required("Debe seleccionar la imputa"),
      codEstablecimiento: Yup.number().required(
        "Debe seleccionar un establecimiento"
      ),
      codLote: Yup.number().when("imputaA", {
        is: (imputaA: string) => imputaA === "A",
        then: Yup.number().required("Debe seleccionar un lote"),
        otherwise: Yup.number().notRequired(),
      }),
      codTarea: Yup.number().required("Debe seleccionar una tarea"),
      cantidad: Yup.number()
        .required("Debe indicar una cantidad")
        .min(0, "El valor debe ser mayor a 0"),
      codContratista: Yup.number().when("propia", {
        is: false,
        then: Yup.number().required("Debe seleccionar un contratista"),
      }),
    }),
    enableReinitialize: true,
    onSubmit: async (values: ILoteModel) => {
      if (values.propia === true || values.propia === "P") {
        values.codContratista = undefined;
      }
      const tarea = await getTareaByCode(values.codTarea);
      const allownMaquinaria = enableMaquinariaTab(values, tarea);
      const allownInsumo = enableInsumoTab(tarea);      
      tareaPorLote.addLote(values, allownMaquinaria, allownInsumo);
      if (allownInsumo) {
        history.push(PATH_PAGE.tareaPorLote.insumo);
      } else {
        history.push(PATH_PAGE.tareaPorLote.empleado);
      }
    },
  });

  return { formik };
};
