export const getLote = (id: any, lotes: Array<any>): string => {
  const data = lotes.find((item) => item.key === id);
  return data?.value || "Sin Lote";
};
