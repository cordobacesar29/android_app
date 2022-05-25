export const getEmpleadoName = (cod: number, empleados: Array<any>): string => {
  const data = empleados.find((item) => item.key === cod);
  return data?.value || "Sin Empleado";
};
