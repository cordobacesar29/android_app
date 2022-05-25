
export const getCuenta = (id: any, cuentas: Array<any>): string => {
  const data = cuentas.find((item) => item.key === id);
  return data?.value || "Sin Actividad";
};
