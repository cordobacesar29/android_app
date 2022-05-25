import { ordenDeTrabajoContext } from "../hooks/useOrdenDeTrabajo";
import { useProvideOrdenDeTrabajo } from "../hooks/useProvideOrdenDeTrabajo";

export const ProvideOrdenDeTrabajo: React.FC = ({ children }) => {

    const ordenDeTrabajo = useProvideOrdenDeTrabajo();

    return <ordenDeTrabajoContext.Provider value={ordenDeTrabajo}>{children}</ordenDeTrabajoContext.Provider>
};