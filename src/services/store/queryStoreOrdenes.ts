import { ISelect } from "../../interfaces/ISelect";
import {
  EstablecimientoService,
  LoteService,
  TareasService,
  ContratistaService,
  InsumosService,
  DepositoService,
  EmpleadoService,
  ConceptoService,
  MaquinariaService,
  EmpresaService,
} from "../modules";
import { ConceptoModel } from "../modules/conceptos/ConceptoModel";
import { ContratistaModel } from "../modules/contratistas/ContratistaModel";
import { DepositoModel } from "../modules/depositos/DepositoModel";
import { EmpleadoModel } from "../modules/empleados/EmpleadoModel";
import { EmpresaModel } from "../modules/empresas/EmpresaModel";
import { EstablecimientoModel } from "../modules/establecimientos/EstablecimientoModel";
import { ImputaAModel } from "../modules/imputaA/ImputaAModel";
import { ImputaAService } from "../modules/imputaA/ImputaAService";
import { InsumoModel } from "../modules/insumos/InsumoModel";
import { LoteActividadesService } from "../modules/loteActividades/LoteActividadesService";
import { LoteActividadModel } from "../modules/loteActividades/LoteActividadModel";
import { LoteModel } from "../modules/lotes/LoteModel";
import { MaquinariaModel } from "../modules/maquinarias/MaquinariaModel";
import { PeriodoModel } from "../modules/periodos/PeriodoModel";
import { PeriodosService } from "../modules/periodos/PeriodosService";
import { TareasModel } from "../modules/tareas/TareasModel";
import { getEstablecimiento } from "../../utils/selectors/getEstablecimiento";
import { getLote } from "../../utils/selectors/getLote";
import { getTarea } from "../../utils/selectors/getTareas";
import { OrdenDeTrabajoService } from "../modules/ordenDeTrabajo/OrdenDeTrabajoService";
import {
  OrdenDeTrabajoInsumoModel,
  OrdenDeTrabajoModel,
  OrdenDeTrabajoPersonalModel,
} from "../modules/ordenDeTrabajo/OrdenDeTrabajoModel";
import { IOrdenDeTrabajoCard } from "../../interfaces/IOrdenDeTrabajoCard";
import { getCampaniaName } from "../../utils/selectors/getCampania";
import { getActividadName } from "../../utils/selectors/getActividad";
import { CuentaService } from "../modules/cultivos/CuentaService";
import { CuentaModel } from "../modules/cultivos/CuentaModel";
import { IFilter } from "../../repositories/IFilter";
import { IOrdenDeTrabajo } from "../../utils/models/ordenDetrabajo";
import { IInsumoModel } from "../../utils/models/insumoModel";
import { IEmpleadoModel } from "../../utils/models/empleadoModel";
import { ILoteModel } from "../../utils/models/loteModel";
import { makeRandomId } from "../../utils/helpers/createUniqueId";
import { ITareaPorLote } from "../../utils/models/tareaPorLote";

interface dataReturn {
  data:
    | OrdenDeTrabajoModel[]
    | EstablecimientoModel[]
    | LoteModel[]
    | TareasModel[]
    | ContratistaModel[]
    | InsumoModel[]
    | EmpleadoModel[]
    | ConceptoModel[]
    | MaquinariaModel[]
    | EmpresaModel[]
    | DepositoModel[]
    | PeriodoModel[]
    | CuentaModel[];
  selects: ISelect[];
}

export const getEstablecimientos = async (): Promise<dataReturn> => {
  const data = await EstablecimientoService.getFromDb();
  const selects = data.map(
    (establecimiento: EstablecimientoModel): ISelect => ({
      key: establecimiento.codigo,
      value: establecimiento.nombre,
    })
  );
  return { data, selects };
};

export const getLotes = async (): Promise<dataReturn> => {
  const data = await LoteService.getFromDb();
  const selects = data.map(
    (lote: LoteModel): ISelect => ({
      key: lote.codigo,
      value: lote.nombre,
    })
  );
  return { data, selects };
};

export const getTareas = async (): Promise<dataReturn> => {
  const data = await TareasService.getFromDb();
  const selects = data.map(
    (tarea: TareasModel): ISelect => ({
      key: tarea.codigo,
      value: tarea.descripcion,
    })
  );
  return { data, selects };
};

export const getTareaByCode = async (code?: number): Promise<TareasModel> => {
  const data = await TareasService.getFromDb();
  const tarea = data.find((t) => t.codigo === code);
  return tarea!;
};

export const getContratistas = async (): Promise<dataReturn> => {
  const data = await ContratistaService.getFromDb();
  const selects = data.map(
    (contratista: ContratistaModel): ISelect => ({
      key: contratista.codigo,
      value: contratista.nombre,
    })
  );
  return { data, selects };
};

export const getInsumos = async (): Promise<dataReturn> => {
  const data = await InsumosService.getFromDb();
  const selects = data.map(
    (insumo: InsumoModel): ISelect => ({
      key: insumo.codArticulo,
      value: insumo.descripcion,
    })
  );
  return { data, selects };
};

export const getDepositos = async () => {
  const data = await DepositoService.getFromDb();
  const selects = data.map(
    (deposito: DepositoModel): ISelect => ({
      key: deposito.codDeposito,
      value: deposito.descripcion,
    })
  );
  return { data, selects };
};

export const getEmpleados = async () => {
  const data = await EmpleadoService.getFromDb();
  const selects = data.map(
    (empleado: EmpleadoModel): ISelect => ({
      key: empleado.codigo,
      value: empleado.nombre,
    })
  );
  return { data, selects };
};

export const getConceptos = async () => {
  const data = await ConceptoService.getFromDb();
  const selects = data.map(
    (concepto: ConceptoModel): ISelect => ({
      key: concepto.codigo,
      value: concepto.descripcion,
    })
  );
  return { data, selects };
};

export const getMaquinarias = async () => {
  const data = await MaquinariaService.getFromDb();
  const selects = data.map(
    (maquinaria: MaquinariaModel): ISelect => ({
      key: maquinaria.codigo,
      value: maquinaria.descripcion,
    })
  );
  return { data, selects };
};

export const getEmpresas = async () => {
  const data = await EmpresaService.getFromDb();
  const selects = data.map(
    (empresa: EmpresaModel): ISelect => ({
      key: empresa.codigo,
      value: empresa.nombre,
    })
  );
  return { data, selects };
};

export const getImputasA = async () => {
  const data = await ImputaAService.getFromDb();
  const selectsNotFiltered = data.map(
    (imputaA: ImputaAModel): ISelect => ({
      key: imputaA.id,
      value: imputaA.descripcion,
    })
  );
  const selects = selectsNotFiltered.filter(
    (item: ISelect): any => item.key !== "1"
  );
  return { data, selects };
};

export const getLastPeriodo = async (): Promise<PeriodoModel> => {
  const periodo = await PeriodosService.getLastActiveOrDefault();
  return periodo;
};

export const getAllPeriodos = async (): Promise<dataReturn> => {
  const data = await PeriodosService.getAllFromDb();
  const selects = data.map(
    (period: PeriodoModel): ISelect => ({
      key: period.codigo,
      value: period.descripcion,
    })
  );
  return { data, selects };
};

export const getCuentas = async (): Promise<dataReturn> => {
  const data = await CuentaService.getFromDb();
  const selects = data.map(
    (period: CuentaModel): ISelect => ({
      key: period.codigo,
      value: period.descripcion,
    })
  );
  return { data, selects };
};

export const getEstablecimientosByPeriodo = async (): Promise<ISelect[]> => {
  const periodo = await PeriodosService.getLastActiveOrDefault();
  const lotesActividades = (await LoteActividadesService.getFromDb()).filter(
    (la) => la.codPeriodo === periodo.codigo
  );
  const establecimientosIds = lotesActividades.map(
    (la) => la.codEstablecimiento
  );
  const data = await EstablecimientoService.getFromDb();
  const establecimientos = data.filter((e) =>
    establecimientosIds.includes(e.codigo)
  );

  const selects = establecimientos.map(
    (establecimiento: EstablecimientoModel): ISelect => ({
      key: establecimiento.codigo,
      value: establecimiento.nombre,
    })
  );
  return selects;
};

export const getLotesByEstablecimiento = async (
  code: number
): Promise<ISelect[]> => {
  const data = (await LoteService.getFromDb()).filter(
    (l) => l.codEstablecimiento === code
  );
  const selects = data.map(
    (lote: LoteModel): ISelect => ({
      key: lote.codigo,
      value: lote.nombre,
    })
  );

  return selects;
};

export const getLoteActividad = async (
  codEstablecimiento: number,
  codLote: number
): Promise<LoteActividadModel | undefined> => {
  const periodo = await PeriodosService.getLastActiveOrDefault();
  const lotesActividad = (await LoteActividadesService.getFromDb()).find(
    (la) =>
      la.codEstablecimiento === codEstablecimiento &&
      la.codPeriodo === periodo.codigo &&
      la.codLote === codLote
  );

  return lotesActividad;
};

export const getLoteActividades = async () => {
  const data = await LoteActividadesService.getFromDb();
  return { data };
};

export const getOrdenesDeTrabajo = async () => {
  const data = await OrdenDeTrabajoService.getOrdersOnlyFromDb();
  let list: IOrdenDeTrabajoCard[] = [];

  if (data.length > 0) {
    const { selects: establecimientos } = await getEstablecimientos();
    const { selects: lotes } = await getLotes();
    const { selects: tareas } = await getTareas();
    const { selects: periodos } = await getAllPeriodos();
    const { selects: cuentas } = await getCuentas();

    list = data.map(
      (orden: OrdenDeTrabajoModel): IOrdenDeTrabajoCard => ({
        id: orden.id,
        fecha: orden.fecha,
        campania: getCampaniaName(orden.codPeriodo, periodos),
        actividad: getActividadName(orden.codLoteActividad, cuentas),
        cantidad: orden.cantidad,
        establecimiento: getEstablecimiento(
          orden.codEstablecimiento,
          establecimientos
        ),
        lote: getLote(orden.codLote, lotes),
        tarea: getTarea(orden.codTarea, tareas),
        numero: orden.numero,
        isChecked: false,
        isSync: orden.isSync,
        ejecutada: orden.ejecutada ?? "N",
      })
    );
  }
  return { data, list };
};

export const getOrdenDeTrabajoToEdit = async (id: number) => {
  const filter: IFilter[] = [
    {
      column: "id",
      value: id,
    },
  ];

  const data = await OrdenDeTrabajoService.getAllFromDb(filter);

  let ordenDeTrabajo: IOrdenDeTrabajo = {
    ordenTrabajoId: undefined,
    fechaCarga: "",
    codPeriodo: 1,
    observacionesTarea: "",
    lote: {
      fecha: "",
      imputaA: "",
      propia: false,
    },
    insumos: [],
    empleados: [],
    asignacion: {
      supervisorCod: 1,
      tecnicoCod: 1,
    },
    codArea: 0,
  };

  if (data.length > 0) {
    const orden = data[0];

    let insumos: IInsumoModel[] = [];
    let empleados: IEmpleadoModel[] = [];

    const lote: ILoteModel = {
      fecha: orden.fecha,
      cantidad: orden.cantidad,
      codArea: orden.codArea,
      codEstablecimiento: orden.codEstablecimiento,
      codTarea: orden.codTarea,
      codLote: orden.codLote,
      codLoteActividad: orden.codLoteActividad,
      propia: orden.propia,
      codContratista: orden.codContratista ?? undefined,
    };

    orden.ordenesTrabajoInsumo
      ?.filter((li) => li.tipo === "T")
      .forEach((li: OrdenDeTrabajoInsumoModel) => {
        const newInsumo: IInsumoModel = {
          id: makeRandomId(),
          codArticulo: li.codArticulo,
          dosis: li.dosis,
          cantidad: li.cantidad,
          codDeposito: li.codDeposito,
        };

        insumos = [...insumos, newInsumo];
      });

    orden.ordenesTrabajoPersonal?.forEach((lp: OrdenDeTrabajoPersonalModel) => {
      const newEmpleado: IEmpleadoModel = {
        id: makeRandomId(),
        cantidad: lp.cantidad,
        codConcepto: lp.codConcepto,
        codEmpleado: lp.codEmpleado,
        legajo: lp.legajo,
        importe: lp.importe,
        tarifa: lp.precio,
      };

      empleados = [...empleados, newEmpleado];
    });

    ordenDeTrabajo = {
      ordenTrabajoId: orden.id,
      observacionesTarea: orden.observacionesTarea ?? "",
      codPeriodo: Number(orden.codPeriodo),
      fechaCarga: orden.fechaCarga || "",
      codArea: orden.codArea || 0,
      lote: lote,
      insumos: insumos,
      empleados: empleados,
      id: makeRandomId(),
      asignacion: {
        supervisorCod: orden.supervisor,
        tecnicoCod: orden.tecnico,
        justificacion: orden.justificacion,
      },
    };
  }

  return ordenDeTrabajo;
};

export const getOrdenDeTrabajoToExecute = async (id: number) => {
  const filter: IFilter[] = [
    {
      column: "id",
      value: id,
    },
  ];

  const data = await OrdenDeTrabajoService.getAllFromDb(filter);
  
  if (data.length > 0) {
    const orden = data[0];

    let insumos: IInsumoModel[] = [];
    let empleados: IEmpleadoModel[] = [];
    const filterImputaA: IFilter[] = [
      {
        column: "descripcion",
        value: "'Cultivo'",
      },
    ];
    const imputaA = await ImputaAService.getFromDb(filterImputaA);
    let imputa: string = "";
    if (imputaA && imputaA.length > 0) {
      imputa = imputaA[0].id;
    }

    const lote: ILoteModel = {
      fecha: orden.fecha,
      cantidad: orden.cantidad,
      codEstablecimiento: orden.codEstablecimiento,
      codTarea: orden.codTarea,
      codLote: orden.codLote,
      codLoteActividad: orden.codLoteActividad,
      propia: orden.propia,
      codContratista: orden.codContratista ?? undefined,
      imputaA: imputa,
    };

    orden.ordenesTrabajoInsumo
      ?.filter((li) => li.tipo === "T")
      .forEach((li: OrdenDeTrabajoInsumoModel) => {
        const newInsumo: IInsumoModel = {
          codArticulo: li.codArticulo,
          dosis: li.dosis,
          codDeposito: li.codDeposito,
          id: makeRandomId(),
          cantidad: li.cantidad,
        };

        insumos = [...insumos, newInsumo];
      });

    orden.ordenesTrabajoPersonal?.forEach((lp: OrdenDeTrabajoPersonalModel) => {
      const newEmpleado: IEmpleadoModel = {
        id: makeRandomId(),
        cantidad: lp.cantidad,
        codConcepto: lp.codConcepto,
        codEmpleado: lp.codEmpleado,
        legajo: lp.legajo,
        importe: lp.importe,
        tarifa: lp.precio,
      };

      empleados = [...empleados, newEmpleado];
    });

    const tareaPorLote: ITareaPorLote = {
      ordenId: orden.id,
      observacionesTarea: orden.observacionesTarea ?? "",
      codPeriodo: Number(orden.codPeriodo),
      fechaCarga: orden.fechaCarga || "",
      lote: lote,
      insumos: insumos,
      empleados: empleados,
      maquinaria: [],
      nroOrdentrabajo: orden.numero,
      id: makeRandomId(),
    };    
    return tareaPorLote;
  }

  throw Error("No se encontró la orden de trabajo");
};

export const setOrdenExecuted = async (id: number) => {
  const filters: IFilter[] = [
    {
      column: "id",
      value: id,
    },
  ];

  const columns: IFilter[] = [
    {
      column: "ejecutada",
      value: "'S'",
    },
  ];

  await OrdenDeTrabajoService.update(columns, filters);
};
