import { useFormik } from "formik";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { getTareaByCode } from "../../../services/store/queryStore";
import { enableInsumoTab } from "../../../utils/helpers/tabs/enableInsumoTab";
import { useOrdenDeTrabajo } from "../../../utils/hooks/useOrdenDeTrabajo";
import { ILoteModel } from "../../../utils/models/loteModel";
import { PATH_PAGE } from "../../../utils/routes";

export const useFormikLote = () => {
  const ordenContext = useOrdenDeTrabajo();
  let history: any = useHistory();

  const formik = useFormik<ILoteModel>({
    initialValues: ordenContext.ordenDeTrabajo.lote,
    validationSchema: Yup.object({
      fecha: Yup.date()
        .required("Debe indicar una fecha")
        .max(
          new Date(),
          "La fecha debe ser menor o igual al dia de la fecha actual"
        ),
      codEstablecimiento: Yup.number().required(
        "Debe seleccionar un establecimiento"
      ),
      codLote: Yup.number().required("Debe seleccionar un lote"),
      codTarea: Yup.number().required("Debe seleccionar una tarea"),
      cantidad: Yup.number()
        .required("Debe indicar una cantidad")
        .min(1, "El valor debe ser mayor a 0"),
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
      const allownInsumo = enableInsumoTab(tarea);
      ordenContext.addLote(values, allownInsumo);
      if (allownInsumo) {
        history.push(PATH_PAGE.ordenDeTrabajo.insumo);
      } else {
        history.push(PATH_PAGE.ordenDeTrabajo.empleado);
      }
    },
  });

  return { formik };
};
