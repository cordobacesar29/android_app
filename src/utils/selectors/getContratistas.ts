export const getContratistaName = (code: any, contratistas: Array<any>): string => {
  const data = contratistas.find((item) => item.key === code);
  return data?.value || undefined;
};
