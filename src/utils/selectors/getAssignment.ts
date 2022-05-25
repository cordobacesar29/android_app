export const getAssignment = (id: number, assignments: Array<any>): string => {
  const data = assignments.find((item) => item.key === id);
  return data?.value || "Undefined";
};