import { path } from "../../utils/helpers/misc";

const ROOTS = {
  MasterData: "/MasterData",
  MovimientoDestino: "/MovimientoPorDestino",
};

export const CONSTANTS = {
  ENDPOINTS: {
    MASTER_DATA: {
      Conceptos: path(ROOTS.MasterData, "GetConceptos"),
      Cotizaciones: path(ROOTS.MasterData, "GetCotizaciones"),
      Cuentas: path(ROOTS.MasterData, "GetCuentas"),
      Depositos: path(ROOTS.MasterData, "GetDepositos"),
      Establecimientos: path(ROOTS.MasterData, "GetEstablecimientos"),
      Insumos: path(ROOTS.MasterData, "GetInsumos"),
      Lotes: path(ROOTS.MasterData, "GetLotes"),
      SubRubros: path(ROOTS.MasterData, "GetSubRubros"),
      Tareas: path(ROOTS.MasterData, "GetTareas"),
      Maquinarias: path(ROOTS.MasterData, "GetMaquinarias"),
      Contratistas: path(ROOTS.MasterData, "GetContratistas"),
      Empleados: path(ROOTS.MasterData, "GetPersonales"),
      Empresas: path(ROOTS.MasterData, "GetEmpresas"),
      EmpresasServicios: path(ROOTS.MasterData, "GetEmpresasServicios"),
      ImputaA: path(ROOTS.MasterData, "GetImputaA"),
      Periodos: path(ROOTS.MasterData, "GetPeriodos"),
      LoteActividades: path(ROOTS.MasterData, "GetLoteActividades"),
      Labores: {
        Get: path(ROOTS.MasterData, "GetLabores"),
        Save: path(ROOTS.MasterData, "SaveLabores"),
      },
      OrdenesDeTrabajo: {
        Get: path(ROOTS.MasterData, "GetOrdenesTrabajo"),
        Save: path(ROOTS.MasterData, "SaveOrdenesTrabajo"),
      },
    },
    MOVIMIENTO_DESTINO: {
      TotalesPorDestino: path(ROOTS.MovimientoDestino, "GetTotalesPorDestino"),
      Filtro: path(ROOTS.MovimientoDestino, "GetTotalesPorDestinoFiltros"),
    },
  },
  TABLES: {
    INSUMOS: "articulos",
    CONCEPTOS: "conceptos",
    COTIZACIONES: "cotizaciones",
    CUENTAS: "cuentas",
    DEPOSITOS: "depositos",
    ESTABLECIMIENTOS: "establecimientos",
    LOTES: "lotes",
    SUBRUBROS: "subRubros",
    TAREAS: "tareas",
    MAQUINARIAS: "maquinarias",
    CONTRATISTAS: "contratistas",
    EMPLEADOS: "empleados",
    EMPRESAS: "empresas",
    IMPUTA_A: "imputa_a",
    PERIODOS: "periodos",
    LOTE_ACTIVIDAD: "lote_actividad",
    EMPRESAS_SERVICIOS: "empresas_servicios",
    LABORES: "labores",
    LABORES_INSUMOS: "labores_insumos",
    LABORES_PERSONALES: "labores_personales",
    LABORES_MAQUINARIAS: "labores_maquinarias",
    ORDENES_DE_TRABAJO: "ordenes_de_trabajo",
    ORDENES_DE_TRABAJO_INSUMOS: "ordenes_de_trabajo_insumos",
    ORDENES_DE_TRABAJO_PERSONALES: "ordenes_de_trabajo_personales",
    GENERIC_SYNCS: "generic_syncs",
  },
};
