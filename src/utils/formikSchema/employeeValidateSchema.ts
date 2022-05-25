import * as Yup from "yup";
const _empleadoIdRequired = Yup.string().required(
  "Debe seleccionar una opción"
);
const _legajoRequired = Yup.string();
const _codigoIdRequired = Yup.string().required("Debe seleccionar una opción");
const _conceptoIdRequired = Yup.string().required(
  "Debe seleccionar una opción"
);
const _cantidadRequired = Yup.number().required("Debe seleccionar una opción").min(1, 'El valor debe ser mayo a 0');;

export const employeeValidationSchema = Yup.object({
  empleadoId: _empleadoIdRequired,
  legajo: _legajoRequired,
  codigo: _codigoIdRequired,
  conceptoId: _conceptoIdRequired,
  cantidad: _cantidadRequired,
});
