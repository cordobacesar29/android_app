export const getCampaniaName = (id: number = 0, canpanias: Array<any>): string => {
  const data = canpanias.find((item) => item.key === id);
  return data?.value || "Sin Campaña";
};
