import { useEffect, useMemo, useState } from "react";
import { ILoteModel } from "../models/loteModel";
import { ITareaPorLote } from "../models/tareaPorLote";
import { StorageInstance } from "../../config/createStorage";
import { IInsumoModel } from "../models/insumoModel";
import { IEmpleadoModel } from "../models/empleadoModel";
import { IMaquinariaModel } from "../models/maquinariaModel";
import moment from "moment";
import { LaboresService } from "../../services/modules/labores/LaboresService";

const lote: ILoteModel = {
  fecha: moment(new Date()).format("MM/DD/YYYY"),
  imputaA: "",
  codEstablecimiento: undefined,
  codLote: undefined,
  propia: true,
  parte: undefined,
  codTarea: undefined,
  cantidad: undefined,
  codContratista: undefined,
  codLoteActividad: 0,
};

let initialState: ITareaPorLote = {
  id: undefined,
  laborId: undefined,
  lote: lote,
  insumos: [],
  empleados: [],
  maquinaria: [],
  observacionesTarea: "",
  fechaCarga: "",
  codPeriodo: 0,
  usuario: "",
};

export const useProvideTareaPorLote = () => {
  const [tareaPorLote, setTareaPorLote] = useState<ITareaPorLote>(initialState);
  const [tareasPorLote, setTareasPorLote] = useState<ITareaPorLote[]>([]);

  useEffect(() => {
    const createStorage = async () => {
      const store = await StorageInstance.getInstance();
      if (!!store) {
        const tareaPorLoteStorage: ITareaPorLote =
          await StorageInstance.getStorage("tareaPorLote");
        const tareasPorLoteStorage: ITareaPorLote[] =
          await StorageInstance.getStorage("tareasPorLote");

        if (tareaPorLoteStorage) {
          setTareaPorLote(tareaPorLoteStorage);
        }

        if (tareasPorLoteStorage) {
          setTareasPorLote(tareasPorLoteStorage);
        }
      }
    };
    createStorage();
  }, []);

  const setStorage = async (data: ITareaPorLote) => {
    await StorageInstance.setStorage("tareaPorLote", data);
  };

  const setListTareasPorLoteStorage = async (data: ITareaPorLote[]) => {
    await StorageInstance.setStorage("tareasPorLote", data);
  };

  const addLote = async (
    loteData: ILoteModel,
    allownMaquinaria: boolean,
    allownInsumo: boolean
  ) => {
    let maq = [...tareaPorLote.maquinaria];
    let ins = [...tareaPorLote.insumos];
    if (!allownMaquinaria) {
      maq = [];
    }

    if (!allownInsumo) {
      ins = [];
    }

    const data = {
      ...tareaPorLote,
      lote: loteData,
      maquinaria: maq,
      insumos: ins,
      codPeriodo: loteData.codPeriodo,
    };
    setTareaPorLote(data);
    await setStorage(data);
  };

  const addInsumoLote = async (insumo: IInsumoModel) => {
    const data = {
      ...tareaPorLote,
      insumos: [...tareaPorLote.insumos, insumo],
    };
    setTareaPorLote(data);
    await setStorage(data);
  };

  const editInsumoLote = async (insumo: IInsumoModel) => {
    const objIndex = tareaPorLote.insumos.findIndex(
      (obj) => obj.id === insumo.id
    );
    let insumos = [...tareaPorLote.insumos];
    insumos[objIndex] = insumo;

    const data = {
      ...tareaPorLote,
      insumos: [...insumos],
    };

    setTareaPorLote(data);
    await setStorage(data);
  };

  const addInsumoToMaquinaria = async (
    insumo: IInsumoModel,
    maquinariaId: string
  ) => {
    const objIndex = tareaPorLote.maquinaria.findIndex(
      (obj) => obj.id === maquinariaId
    );
    const maq = tareaPorLote.maquinaria.find(
      (item) => item.id === maquinariaId
    );
    if (maq !== undefined) {
      let maquinarias = [...tareaPorLote.maquinaria];
      let maquinaria = { ...maq, insumos: [...maq.insumos, insumo] };
      maquinarias[objIndex] = maquinaria;

      const data = {
        ...tareaPorLote,
        maquinaria: [...maquinarias],
      };
      setTareaPorLote(data);
      await setStorage(data);
    }
  };

  const editInsumoOfMaquinaria = async (
    insumo: IInsumoModel,
    maquinariaId: string,
    insumoId: string
  ) => {
    const maqIndex = tareaPorLote.maquinaria.findIndex(
      (item) => item.id === maquinariaId
    );
    const maq = tareaPorLote.maquinaria.find(
      (item) => item.id === maquinariaId
    );
    if (maq !== undefined) {
      const insIndex = maq.insumos.findIndex((item) => item.id === insumoId);
      let ins = [...maq.insumos];
      ins[insIndex] = insumo;

      let maquinarias = [...tareaPorLote.maquinaria];
      maquinarias[maqIndex] = { ...maq, insumos: [...ins] };

      const data = {
        ...tareaPorLote,
        maquinaria: [...maquinarias],
      };
      setTareaPorLote(data);
      await setStorage(data);
    }
  };

  const removeInsumoLote = async (id: string) => {
    const dataInsumo = tareaPorLote.insumos.filter((item) => item.id !== id);
    const data = {
      ...tareaPorLote,
      insumos: dataInsumo,
    };
    setTareaPorLote(data);
    await setStorage(data);
  };

  const getInsumo = (id: string): IInsumoModel => {
    const dataInsumo = tareaPorLote.insumos.find((item) => item.id === id);
    return dataInsumo!;
  };

  const getInsumoFromMaquinaria = (
    id: string,
    maquinariaId: string
  ): IInsumoModel => {
    const dataMaquinaria = tareaPorLote.maquinaria.find(
      (item) => item.id === maquinariaId
    );
    const dataInsumo = dataMaquinaria!.insumos.find((item) => item.id === id);
    return dataInsumo!;
  };

  const removeInsumoFromMaquinaria = async (
    insumoId: string,
    maquinariaId: string
  ) => {
    let maquinarias = [...tareaPorLote.maquinaria];
    let maquinaria = tareaPorLote.maquinaria.find(
      (item) => item.id === maquinariaId
    );
    const maqIndex = tareaPorLote.maquinaria.findIndex(
      (item) => item.id === maquinariaId
    );
    const insumos = maquinaria?.insumos.filter((item) => item.id !== insumoId);

    maquinarias[maqIndex] = { ...maquinaria!, insumos: [...insumos!] };

    const data = {
      ...tareaPorLote,
      maquinaria: [...maquinarias],
    };
    setTareaPorLote(data);
    await setStorage(data);
  };

  const addEmpleado = async (empleado: IEmpleadoModel) => {
    const data = {
      ...tareaPorLote,
      empleados: [...tareaPorLote.empleados, empleado],
    };
    setTareaPorLote(data);
    await setStorage(data);
  };

  const removeEmpleado = async (id: string) => {
    const dataEmpleado = tareaPorLote.empleados.filter(
      (item) => item.id !== id
    );
    const data = {
      ...tareaPorLote,
      empleados: dataEmpleado,
    };
    setTareaPorLote(data);
    await setStorage(data);
  };

  const getEmpleado = (id: string): any => {
    const dataEmpleado = tareaPorLote.empleados.find((item) => item.id === id);
    return dataEmpleado;
  };

  const editEmpleado = async (empleado: IEmpleadoModel) => {
    const dataEmpleado = tareaPorLote.empleados.map((item) => {
      return item.id === empleado.id ? empleado : item;
    });
    const data = {
      ...tareaPorLote,
      empleados: dataEmpleado,
    };
    setTareaPorLote(data);
    await setStorage(data);
  };

  const addMaquinaria = async (maquinaria: IMaquinariaModel) => {
    const data = {
      ...tareaPorLote,
      maquinaria: [...tareaPorLote.maquinaria, maquinaria],
    };
    setTareaPorLote(data);
    await setStorage(data);
  };

  const removeMaquinaria = async (id: string) => {
    const dataMaquinaria = tareaPorLote.maquinaria.filter(
      (item) => item.id !== id
    );
    const data = {
      ...tareaPorLote,
      maquinaria: dataMaquinaria,
    };
    setTareaPorLote(data);
    await setStorage(data);
  };

  const getMaquinaria = (id: string): any => {
    const dataMaquinaria = tareaPorLote.maquinaria.find(
      (item) => item.id === id
    );
    return dataMaquinaria;
  };

  const editMaquinaria = async (empleado: IMaquinariaModel) => {
    const dataMaquinaria = tareaPorLote.maquinaria.map((item) => {
      return item.id === empleado.id ? empleado : item;
    });
    const data = {
      ...tareaPorLote,
      maquinaria: dataMaquinaria,
    };
    setTareaPorLote(data);
    await setStorage(data);
  };

  const removeTareaPorLote = async () => {
    setTareaPorLote(initialState);
    await setStorage(initialState);
  };

  const addTareaPorLote = async (
    tareaPorLote: ITareaPorLote,
    saveInDb: boolean
  ) => {
    if (saveInDb) {
      tareaPorLote.lote.propia =
        tareaPorLote.lote.propia === true || tareaPorLote.lote.propia === "P"
          ? "P"
          : "C";

      await LaboresService.save(tareaPorLote);
    } else {
      setTareaPorLote(tareaPorLote);
    }
  };

  const value = useMemo(() => {
    return {
      tareaPorLote,
      tareasPorLote,
      addLote,
      addInsumoLote,
      editInsumoLote,
      addInsumoToMaquinaria,
      editInsumoOfMaquinaria,
      removeInsumoLote,
      removeInsumoFromMaquinaria,
      getInsumo,
      getInsumoFromMaquinaria,
      addEmpleado,
      removeEmpleado,
      getEmpleado,
      editEmpleado,
      addMaquinaria,
      removeMaquinaria,
      getMaquinaria,
      editMaquinaria,
      removeTareaPorLote,
      addTareaPorLote,
    };
  }, [tareaPorLote, tareasPorLote]);

  return value;
};
