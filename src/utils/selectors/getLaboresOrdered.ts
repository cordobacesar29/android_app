import { ITareaPorLoteCard } from "../../interfaces/ITareaPorLoteCard";

export const getLaboresOrdered = (labores: ITareaPorLoteCard[]): ITareaPorLoteCard[] => {
    labores.sort((x, y) => new Date(y.fecha).getTime() - new Date(x.fecha).getTime());
    labores.sort((x, y) => Number(x.isSync) - Number(y.isSync));
    return labores;
};
