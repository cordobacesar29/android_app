
export const getEstablecimiento = (code: any, establecimientos: Array<any>): string => {
  const data = establecimientos.find((item) => item.key === code);

  return data?.value || "Sin Establecimiento";
};
