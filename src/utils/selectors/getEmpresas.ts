export const getEmpresa = (id: number, empresas:Array<any>): string => {
  const data = empresas.find((item) => item.key === id);
  return data?.value || "Sin Empresa";
};
