import { IOrdenDeTrabajoCard } from "../../interfaces/IOrdenDeTrabajoCard";

export const getOrdenesDeTrabajoOrdered = (ordenes: IOrdenDeTrabajoCard[]): IOrdenDeTrabajoCard[] => {
    ordenes.sort((x, y) => new Date(y.fecha).getTime() - new Date(x.fecha).getTime());
    ordenes.sort((x, y) => Number(x.isSync) - Number(y.isSync));
    return ordenes;
};
