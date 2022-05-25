import { ISelect } from "../../interfaces/ISelect";
import { ITareaPorLoteCard } from "../../interfaces/ITareaPorLoteCard";
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
import {
  LaboresInsumoModel,
  LaboresMaquinariaModel,
  LaboresModel,
  LaboresPersonalModel,
} from "../modules/labores/LaboresModel";
import { LaboresService } from "../modules/labores/LaboresService";
import { LoteActividadesService } from "../modules/loteActividades/LoteActividadesService";
import { LoteActividadModel } from "../modules/loteActividades/LoteActividadModel";
import { LoteModel } from "../modules/lotes/LoteModel";
import { MaquinariaModel } from "../modules/maquinarias/MaquinariaModel";
import { PeriodoModel } from "../modules/periodos/PeriodoModel";
import { PeriodosService } from "../modules/periodos/PeriodosService";
import { TareasModel } from "../modules/tareas/TareasModel";
import { getEstablecimiento } from "../../utils/selectors/getEstablecimiento";
import { getImputas } from "../../utils/selectors/getInputa";
import { getLote } from "../../utils/selectors/getLote";
import { getTarea } from "../../utils/selectors/getTareas";
import { CuentaService } from "../modules/cultivos/CuentaService";
import { CuentaModel } from "../modules/cultivos/CuentaModel";
import { IFilter } from "../../repositories/IFilter";
import { ILoteModel } from "../../utils/models/loteModel";
import { IInsumoModel } from "../../utils/models/insumoModel";
import { IMaquinariaModel } from "../../utils/models/maquinariaModel";
import { IEmpleadoModel } from "../../utils/models/empleadoModel";
import { ITareaPorLote } from "../../utils/models/tareaPorLote";
import { makeRandomId } from "../../utils/helpers/createUniqueId";
import { EmpresaServicioService } from "../modules/empresasServicios/EmpresaServicioService";
import { EmpresaServicioModel } from "../modules/empresasServicios/EmpresaServicioModel";

interface dataReturn {
  data:
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
    | PeriodoModel[];
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

export const getCuentas = async () => {
  const data = await CuentaService.getFromDb();
  const selects = data.map(
    (concepto: CuentaModel): ISelect => ({
      key: concepto.id,
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
      key: empresa.id,
      value: empresa.nombre,
    })
  );
  return { data, selects };
};

export const getEmpresasServicios = async () => {
  const data = await EmpresaServicioService.getFromDb();
  const selects = data.map(
    (empresa: EmpresaServicioModel): ISelect => ({
      key: empresa.codigo,
      value: empresa.descripcion,
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

export const getLabores = async () => {
  const data = await LaboresService.getLaboresOnlyFromDb();
  let list: ITareaPorLoteCard[] = [];
  
  if (data.length > 0) {
    const { selects: establecimientos } = await getEstablecimientos();
    const { selects: imputaA } = await getImputasA();
    const { selects: lotes } = await getLotes();
    const { selects: tareas } = await getTareas();

    list = data.map(
      (labor: LaboresModel): ITareaPorLoteCard => ({
        id: labor.id,
        fecha: labor.fecha,
        cantidad: labor.cantidad,
        parteNum: labor.parteNum,
        isChecked: false,
        isSync: labor.isSync,
        establecimiento: getEstablecimiento(
          labor.codEstablecimiento,
          establecimientos
        ),
        lote: getLote(labor.codLote, lotes),
        tarea: getTarea(labor.codTarea, tareas),
        imputaA: getImputas(labor.imputa, imputaA),
        codPeriodo: labor.codPeriodo,
      })
    );
  }  
  return { data, list };
};

export const getLaborToEdit = async (id: number) => {
  const filter: IFilter[] = [
    {
      column: "id",
      value: id,
    },
  ];

  const data = await LaboresService.getAllFromDb(filter);

  let tareaPorLote: ITareaPorLote = {
    laborId: undefined,
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
    maquinaria: [],
  };

  if (data.length > 0) {
    const labor = data[0];

    let insumos: IInsumoModel[] = [];
    let maquinarias: IMaquinariaModel[] = [];
    let empleados: IEmpleadoModel[] = [];

    const lote: ILoteModel = {
      fecha: labor.fecha,
      cantidad: labor.cantidad,
      imputaA: labor.imputa,
      codEstablecimiento: labor.codEstablecimiento,
      codTarea: labor.codTarea,
      codLote: labor.codLote,
      codLoteActividad: labor.codLoteActividad,
      codArea: labor.codArea,
      parte: labor.parteNum ?? undefined,
      propia: labor.propia,
      codContratista: labor.codContratista ?? undefined,
    };

    labor.laboresInsumos
      ?.filter((li) => li.tipo === "T")
      .forEach((li: LaboresInsumoModel) => {
        const newInsumo: IInsumoModel = {
          codArticulo: li.codArticulo,
          dosis: li.dosis,
          cantidad: li.cantidad,
          codDeposito: li.codDeposito,
          id: makeRandomId(),
        };

        insumos = [...insumos, newInsumo];
      });

    labor.laboresMaquinarias?.forEach((lm: LaboresMaquinariaModel) => {
      const newMaquinaria: IMaquinariaModel = {
        id: makeRandomId(),
        empresaCod: lm.empresaCod,
        hsKm: lm.horasMaquinaria,
        maquinariaCod: lm.maquinariaCod,
        insumos: lm.laboresInsumos
          ? lm.laboresInsumos.map(
              (li: LaboresInsumoModel): IInsumoModel => ({
                codArticulo: li.codArticulo,
                dosis: li.dosis ?? undefined,
                cantidad: li.cantidad,
                codDeposito: li.codDeposito,
                id: makeRandomId(),
              })
            )
          : [],
      };

      maquinarias = [...maquinarias, newMaquinaria];
    });

    labor.laboresPersonales?.forEach((lp: LaboresPersonalModel) => {
      const newEmpleado: IEmpleadoModel = {
        id: makeRandomId(),
        cantidad: lp.cantidad,
        codConcepto: lp.codConcepto,
        codEmpleado: lp.codEmpleado,
        legajo: lp.legajo,
        importe: lp.importe,
        tarifa: lp.tarifa,
      };

      empleados = [...empleados, newEmpleado];
    });

    tareaPorLote = {
      laborId: labor.id,
      observacionesTarea: labor.observacionesTarea ?? "",
      codPeriodo: Number(labor.codPeriodo),
      fechaCarga: labor.fechaCarga || "",
      maquinaria: maquinarias,
      lote: lote,
      insumos: insumos,
      empleados: empleados,
      id: makeRandomId(),
    };
  }

  return tareaPorLote;
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

export const getEstablecimientosByPeriodo = async (): Promise<ISelect[]> => {
  const periodo = await PeriodosService.getLastActiveOrDefault();
  const lotesActividades = (await LoteActividadesService.getFromDb()).filter(
    (la) => la.codPeriodo === periodo.codigo
  );
  const establecimientosCodes = lotesActividades.map(
    (la) => la.codEstablecimiento
  );
  const data = await EstablecimientoService.getFromDb();
  const establecimientos = data.filter((e) =>
    establecimientosCodes.includes(e.codigo)
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
