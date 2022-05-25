import { useFormik } from "formik";
import * as Yup from "yup";
import { IHarvestForm } from "../../utils/models/harvestModel";

export interface IProps {
  initialValues: IHarvestForm;
  getReport: (params: IHarvestForm) => void;
}
export const useFormikHarvest = (props: IProps) => {
  const { initialValues, getReport } = props;
  const formik = useFormik<IHarvestForm>({
    initialValues,
    validationSchema: Yup.object({
      ActividadId: Yup.string().required("Debe seleccionar una actividad"),
      PeriodoId: Yup.number().required("Debe seleccionar una campaña"),
      Desde: Yup.date(),
      Hasta: Yup.date().max(new Date(), "Debe ser menor o igual a hoy"),
    }),
    enableReinitialize: true,
    onSubmit: async (values: IHarvestForm) => {
      getReport(values);
    },
  });

  return { formik };
};
