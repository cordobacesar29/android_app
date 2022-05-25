import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PATH_PAGE } from "../../../utils/routes/paths";
import { getConceptos, getEmpleados } from "../../../services/store/queryStore";
import { ISelect } from "../../../interfaces/ISelect";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { EmpleadoAddModal } from "./EmpleadoAddModal";

export const EmpleadoEditPage: React.FC = () => {
  const [empleados, setEmpleados] = useState<ISelect[]>([]);
  const [conceptos, setConceptos] = useState<ISelect[]>([]);
  const [dataEmployee, setDataEmployee] = useState<any[]>([]);
  const [dataConcepts, setDataConcepts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const isOpen: boolean = true;
  let history: any = useHistory();

  const handleModalOpen = (value?: boolean): void => {
    history.push(PATH_PAGE.ordenDeTrabajo.empleado);
  };

  useEffect(() => {
    const getData = async () => {
      const { data: dataEmployee, selects: empleados } = await getEmpleados();
      setEmpleados(empleados);
      setDataEmployee(dataEmployee);
      const { data: dataConcepts, selects: conceptos } = await getConceptos();
      setConceptos(conceptos);
      setDataConcepts(dataConcepts);
      setLoading(false);
    };
    getData();
  }, []);
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
