import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ISelect } from "../../../interfaces/ISelect";
import { getDepositos, getInsumos } from "../../../services/store/queryStore";
import { ACTIONS } from "../../../utils/helpers/actions";
import { PATH_PAGE } from "../../../utils/routes";
import { InsumoAddModal } from "./InsumoAddModal";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";

export const InsumoMaquinariaEditPage: React.FC = () => {
  const { tareaPorLote } = useTareaPorLote();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [insumos, setInsumos] = useState<ISelect[]>([]);
  const [depositos, setDepositos] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  let history = useHistory();
  const { id, maquinaria }: any = useParams();

  const handleModalOpen = (value: boolean): void => {
    history.push(PATH_PAGE.tareaPorLote.maquinaria);
  };

  useEffect(() => {
    const getData = async () => {
      const { selects: insumos } = await getInsumos();
      const ids = tareaPorLote.maquinaria.find(m => m.id == maquinaria)?.insumos.filter(i => i.id != id).map(i => i.codArticulo) ?? [];
      const result = insumos.filter(({key}) => !ids.includes(key));
      setInsumos(result);
      const { selects: depositos } = await getDepositos();
      setDepositos(depositos);
      setLoading(false);
    };
    getData();
  }, [isOpen]);

  return (
    <>
      {loading ? (
        <ComponentsLoader loading={loading} />
      ) : (
        <>
          <InsumoAddModal
            isOpen={isOpen}
            insumos={insumos}
            depositos={depositos}
            handleModalOpen={handleModalOpen}
            action={ACTIONS.insumo.editInsumoOfMaquinaria}
          />
        </>
      )}
    </>
  );
};
