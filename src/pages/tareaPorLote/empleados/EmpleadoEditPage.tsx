import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { EmpleadoAddModal } from "./EmpleadoAddModal";
import { PATH_PAGE } from "../../../utils/routes/paths";
import { getConceptos, getEmpleados } from "../../../services/store/queryStore";
import { ISelect } from "../../../interfaces/ISelect";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";

export const EmpleadoEditPage: React.FC = () => {
  const isOpen: boolean = true;
  const { tareaPorLote } = useTareaPorLote();
  const [empleados, setEmpleados] = useState<ISelect[]>([]);
  const [conceptos, setConceptos] = useState<ISelect[]>([]);
  const [dataEmployee, setDataEmployee] = useState<any[]>([]);
  const [dataConcepts, setDataConcepts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  let history: any = useHistory();
  let { id }: any = useParams();
  
  const handleModalOpen = (value?: boolean): void => {
    history.push(PATH_PAGE.tareaPorLote.empleado);
  };

  useEffect(() => {
    const getData = async () => {
      const { data: dataEmployee, selects: empleados } = await getEmpleados();
      const codes = tareaPorLote.empleados.filter(e => e.id !== id).map(e => e.codEmpleado);
      const result = empleados.filter(({key}) => !codes.includes(key));
      setEmpleados(result);
      setDataEmployee(dataEmployee);
      const { data: dataConcepts, selects: conceptos } = await getConceptos();
      setConceptos(conceptos);
      setDataConcepts(dataConcepts);
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
          <EmpleadoAddModal
            isOpen={isOpen}
            handleModalOpen={handleModalOpen}
            isNew={false}
            empleados={empleados}
            conceptos={conceptos}
            dataEmployee={dataEmployee}
            dataConcepts={dataConcepts}
          />
        </>
      )}
    </>
  );
};
