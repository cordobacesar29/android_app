export const getActividadName = (id: number = 0, cuentas: Array<any>): string => {
  const data = cuentas.find((item) => item.key === id);
  return data?.value || "Sin Actividad";
};
