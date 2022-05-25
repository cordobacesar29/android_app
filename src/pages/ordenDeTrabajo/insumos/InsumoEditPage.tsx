import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ISelect } from "../../../interfaces/ISelect";
import { getDepositos, getInsumos } from "../../../services/store/queryStore";
import { ACTIONS } from "../../../utils/helpers/actions";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { InsumoAddModal } from "./InsumoAddModal";

export const InsumoEditPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [insumos, setInsumos] = useState<ISelect[]>([]);
  const [depositos, setDepositos] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  let history = useHistory();

  const handleModalOpen = (value: boolean): void => {
    setIsOpen(value);
    history.push("./");
  };
  useEffect(() => {
    const getData = async () => {
      const { selects: insumos } = await getInsumos();
      setInsumos(insumos);
      const { selects: depositos } = await getDepositos();
      setDepositos(depositos);
      setLoading(false);
    };
    getData();
  }, []);
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
