import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { ILoteModel } from "../models/loteModel";
import { StorageInstance } from "../../config/createStorage";
import { IInsumoModel } from "../models/insumoModel";
import { IEmpleadoModel } from "../models/empleadoModel";
import { IOrdenDeTrabajo } from "../models/ordenDetrabajo";
import { IAsignacionModel } from "../models/asignacionModel";
import { OrdenDeTrabajoService } from "../../services/modules";

const lote: ILoteModel = {
  fecha: moment(new Date()).format("MM/DD/YYYY"),
  imputaA: "",
  codEstablecimiento: undefined,
  codLote: undefined,
  propia: true,
  codTarea: undefined,
  cantidad: undefined,
  codContratista: undefined,
  codLoteActividad: 0,
};

const asignacion: IAsignacionModel = {
  supervisorCod: 0,
  tecnicoCod: 0,
  justificacion: "",
};

let initialState: IOrdenDeTrabajo = {
  id: undefined,
  lote: lote,
  insumos: [],
  empleados: [],
  asignacion: asignacion,
  observacionesTarea: "",
  fechaCarga: "",
  horaCarga: "",
  codPeriodo: 0,
  codArea: 0,
};

export const useProvideOrdenDeTrabajo = () => {
  const [ordenDeTrabajo, setOrdenDeTrabajo] =
    useState<IOrdenDeTrabajo>(initialState);
  const [ordenesDeTrabajo, setOrdenesDeTrabajo] = useState<IOrdenDeTrabajo[]>(
    []
  );

  useEffect(() => {
    const createStorage = async () => {
      const store = await StorageInstance.getInstance();
      if (!!store) {
        const tareaPorLoteStorage: IOrdenDeTrabajo =
          await StorageInstance.getStorage("ordenDeTrabajo");
        const tareasPorLoteStorage: IOrdenDeTrabajo[] =
          await StorageInstance.getStorage("ordenesDeTrabajo");

        if (tareaPorLoteStorage) {
          setOrdenDeTrabajo(tareaPorLoteStorage);
        }

        if (tareasPorLoteStorage) {
          setOrdenesDeTrabajo(tareasPorLoteStorage);
        }
      }
    };
    createStorage();
  }, []);

  const setStorage = async (data: IOrdenDeTrabajo) => {
    await StorageInstance.setStorage("ordenDeTrabajo", data);
  };

  const setListTareasPorLoteStorage = async (data: IOrdenDeTrabajo[]) => {
    await StorageInstance.setStorage("ordenesDeTrabajo", data);
  };

  //#region Lote

  const addLote = async (loteData: ILoteModel, allownInsumo: boolean) => {
    let ins = [...ordenDeTrabajo.insumos];

    if (!allownInsumo) {
      ins = [];
    }

    const data = {
      ...ordenDeTrabajo,
      lote: loteData,
      insumos: ins,
    };
    setOrdenDeTrabajo(data);
    await setStorage(data);
  };

  //#endregion

  //#region Insumo

  const getInsumo = (id: string): IInsumoModel => {
    const dataInsumo = ordenDeTrabajo.insumos.find((item) => item.id === id);
    return dataInsumo!;
  };

  const addInsumo = async (insumo: IInsumoModel) => {
    const data = {
      ...ordenDeTrabajo,
      insumos: [...ordenDeTrabajo.insumos, insumo],
    };
    setOrdenDeTrabajo(data);
    await setStorage(data);
  };

  const editInsumo = async (insumo: IInsumoModel) => {
    const objIndex = ordenDeTrabajo.insumos.findIndex(
      (obj) => obj.id === insumo.id
    );
    let insumos = [...ordenDeTrabajo.insumos];
    insumos[objIndex] = insumo;

    const data = {
      ...ordenDeTrabajo,
      insumos: [...insumos],
    };

    setOrdenDeTrabajo(data);
    await setStorage(data);
  };

  const removeInsumo = async (id: string) => {
    const dataInsumo = ordenDeTrabajo.insumos.filter((item) => item.id !== id);
    const data = {
      ...ordenDeTrabajo,
      insumos: dataInsumo,
    };
    setOrdenDeTrabajo(data);
    await setStorage(data);
  };

  //#endregion

  //#region Empleado

  const getEmpleado = (id: string): any => {
    const dataEmpleado = ordenDeTrabajo.empleados.find(
      (item) => item.id === id
    );
    return dataEmpleado;
  };

  const addEmpleado = async (empleado: IEmpleadoModel) => {
    const data = {
      ...ordenDeTrabajo,
      empleados: [...ordenDeTrabajo.empleados, empleado],
    };
    setOrdenDeTrabajo(data);
    await setStorage(data);
  };

  const editEmpleado = async (empleado: IEmpleadoModel) => {
    const dataEmpleado = ordenDeTrabajo.empleados.map((item) => {
      return item.id === empleado.id ? empleado : item;
    });
    const data = {
      ...ordenDeTrabajo,
      empleados: dataEmpleado,
    };
    setOrdenDeTrabajo(data);
    await setStorage(data);
  };

  const removeEmpleado = async (id: string) => {
    const dataEmpleado = ordenDeTrabajo.empleados.filter(
      (item) => item.id !== id
    );
    const data = {
      ...ordenDeTrabajo,
      empleados: dataEmpleado,
    };
    setOrdenDeTrabajo(data);
    await setStorage(data);
  };

  //#endregion

  //#region Asginacion

  const addAsignacion = async (asignacionData: IAsignacionModel) => {
    const data = {
      ...ordenDeTrabajo,
      asignacion: asignacionData,
    };
    setOrdenDeTrabajo(data);
    await setStorage(data);
  };

  //#endregion

  //#region OrdenDeTrabajo

  const addOrdenDeTrabajo = async (
    ordenDeTrabajo: IOrdenDeTrabajo,
    saveInDb: boolean
  ) => {
    if (saveInDb) {
      ordenDeTrabajo.lote.propia =
        ordenDeTrabajo.lote.propia === true ||
        ordenDeTrabajo.lote.propia === "P"
          ? "P"
          : "C";
      await OrdenDeTrabajoService.save(ordenDeTrabajo);
    } else {
      setOrdenDeTrabajo(ordenDeTrabajo);
    }
  };

  const removeOrdenDeTrabajo = async () => {
    setOrdenDeTrabajo(initialState);
    await setStorage(initialState);
  };

  //#endregion

  const value = useMemo(() => {
    return {
      ordenDeTrabajo,
      ordenesDeTrabajo,
      addLote,
      getInsumo,
      addInsumo,
      editInsumo,
      removeInsumo,
      getEmpleado,
      addEmpleado,
      editEmpleado,
      removeEmpleado,
      addAsignacion,
      addOrdenDeTrabajo,
      removeOrdenDeTrabajo,
    };
  }, [ordenDeTrabajo, ordenesDeTrabajo]);

  return value;
};
