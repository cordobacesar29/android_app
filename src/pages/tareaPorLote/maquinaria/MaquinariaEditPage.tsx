import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MaquinariaAddModal } from "./MaquinariaAddModal";
import { PATH_PAGE } from "../../../utils/routes/paths";
import { ISelect } from "../../../interfaces/ISelect";
import {
  getEmpresasServicios,
  getMaquinarias,
} from "../../../services/store/queryStore";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { MaquinariaModel } from "../../../services/modules/maquinarias/MaquinariaModel";

export const MaquinariaEditPage: React.FC = () => {
  const isOpen: boolean = true;
  let history: any = useHistory();
  const [maquinarias, setMaquinarias] = useState<MaquinariaModel[]>([]);
  const [empresas, setEmpresas] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const { selects: empresas } = await getEmpresasServicios();
      setEmpresas(empresas);
      const { data: maquinarias } = await getMaquinarias();
      setMaquinarias(maquinarias);
      setLoading(false);
    };
    getData();
  }, []);

  const handleModalOpen = (value?: boolean): void => {
    history.push(PATH_PAGE.tareaPorLote.maquinaria);
  };

  return (
    <>
      {loading ? (
        <ComponentsLoader loading={loading} />
      ) : (
        <>
          <MaquinariaAddModal
            isOpen={isOpen}
            handleModalOpen={handleModalOpen}
            isNew={false}
            empresas={empresas}
            maquinarias={maquinarias}
          />
        </>
      )}
    </>
  );
};
