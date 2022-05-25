export const getTarea = (code: any, tareas: Array<any>): string => {
  const data = tareas.find((item) => item.key === code);
  return data?.value || "Sin Tareas";
};
