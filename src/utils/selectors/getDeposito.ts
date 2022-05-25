export const getDepositoName = (code: number, depositos: Array<any>): string => {
  const data = depositos.find((item) => item.key === code);
  return data?.value || undefined;
};
