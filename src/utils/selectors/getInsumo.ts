export const getInsumoName = (code: number, insumos: Array<any>): string => {
  const data = insumos.find((item) => item.key === code);
  return data?.value || "Sin Insumo";
};
