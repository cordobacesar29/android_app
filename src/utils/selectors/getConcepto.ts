export const getConceptoName = (code: number, conceptos: Array<any>): string => {
  const data = conceptos.find((item) => item.key === code);
  return data?.value || undefined;
};
