import { tareaPorLoteContext } from "../hooks/useTareaPorLote";
import { useProvideTareaPorLote } from "../hooks/useProvideTareaPorLote";

export const ProvideTareaPorLote: React.FC = ({ children }) => {

    const tareaPorLote = useProvideTareaPorLote();

    return <tareaPorLoteContext.Provider value={tareaPorLote}>{children}</tareaPorLoteContext.Provider>
};
