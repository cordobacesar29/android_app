import { useFormik } from "formik";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { makeRandomId } from "../../../utils/helpers/createUniqueId";
import { useOrdenDeTrabajo } from "../../../utils/hooks/useOrdenDeTrabajo";
import { IAsignacionModel } from "../../../utils/models/asignacionModel";
import { PATH_PAGE } from "../../../utils/routes";

export const useFormikAsignacion = () => {
  const ordenContext = useOrdenDeTrabajo();
  let history: any = useHistory();

  const formik = useFormik<IAsignacionModel>({
    initialValues: ordenContext.ordenDeTrabajo.asignacion,
    validationSchema: Yup.object({
      tecnicoCod: Yup.number()
        .min(1, "Debe seleccionar un técnico")
        .required("Debe seleccionar un técnico"),
      supervisorCod: Yup.number()
        .min(1, "Debe ingresar un supervisor")
        .required("Debe ingresar un supervisor"),
      justificacion: Yup.string().required("Debe ingresar una justificación"),
    }),
    enableReinitialize: true,
    onSubmit: async (values: IAsignacionModel) => {
      values.id = makeRandomId();
      ordenContext.addAsignacion(values);
      history.push(PATH_PAGE.ordenDeTrabajo.resumen);
    },
  });

  return { formik };
};
