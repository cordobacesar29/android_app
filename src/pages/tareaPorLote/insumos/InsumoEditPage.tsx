import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ISelect } from "../../../interfaces/ISelect";
import { getDepositos, getInsumos } from "../../../services/store/queryStore";
import { ACTIONS } from "../../../utils/helpers/actions";
import { InsumoAddModal } from "./InsumoAddModal";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { PATH_PAGE } from "../../../utils/routes";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";

export const InsumoEditPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { tareaPorLote } = useTareaPorLote();
  const [insumos, setInsumos] = useState<ISelect[]>([]);
  const [depositos, setDepositos] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  let history = useHistory();
  let { id }: any = useParams();
  
  const handleModalOpen = (value: boolean): void => {
    setIsOpen(value);
    history.push(PATH_PAGE.tareaPorLote.insumo);
  };

  useEffect(() => {
    const getData = async () => {
      const { selects: insumos } = await getInsumos();
      const codes = tareaPorLote.insumos.filter(i => i.id !== id).map(i => i.codArticulo);
      const result = insumos.filter(({key}) => !codes.includes(key));
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
        <InsumoAddModal
          isOpen={isOpen}
          insumos={insumos}
          depositos={depositos}
          handleModalOpen={handleModalOpen}
          action={ACTIONS.insumo.edit}
        />
      )}
    </>
  );
};
