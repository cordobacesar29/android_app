import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ISelect } from "../../../interfaces/ISelect";
import { getDepositos, getInsumos } from "../../../services/store/queryStore";
import { ACTIONS } from "../../../utils/helpers/actions";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";
import { PATH_PAGE } from "../../../utils/routes";
import { InsumoAddModal } from "./InsumoAddModal";

export const InsumoMaquinariaAddPage: React.FC = () => {
  const { tareaPorLote } = useTareaPorLote();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [insumos, setInsumos] = useState<ISelect[]>([]);
  const [depositos, setDepositos] = useState<ISelect[]>([]);
  let history = useHistory();
  const { maquinaria }: any = useParams();

  const handleModalOpen = (value: boolean): void => {
    history.push(PATH_PAGE.tareaPorLote.maquinaria);
  };

  useEffect(() => {
    const getData = async () => {
      const { selects: insumos } = await getInsumos();
      const codes = tareaPorLote.maquinaria.find(m => m.id == maquinaria)?.insumos?.map(i => i.codArticulo) ?? [];
      const result = insumos.filter(({key}) => !codes.includes(key));
      setInsumos(result);
      const { selects: depositos } = await getDepositos();
      setDepositos(depositos);
    };
    getData();
  }, [isOpen]);

  return (
    <>
      <InsumoAddModal
        isOpen={isOpen}
        insumos={insumos}
        depositos={depositos}
        handleModalOpen={handleModalOpen}
        action={ACTIONS.insumo.addInsumoToMaquinaria}
      />
    </>
  );
};
