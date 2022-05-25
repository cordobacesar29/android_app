import { Repository } from "../repositories/Repository";
import { CONSTANTS } from "../services/constants/constants";
import { 
  InsumosService, 
  TareasService, 
  EstablecimientoService, 
  LoteService, 
  DepositoService, 
  ConceptoService, 
  MaquinariaService, 
  ContratistaService, 
  EmpleadoService, 
  EmpresaService 
} from "../services/modules";
import { CotizacionService } from "../services/modules/cotizaciones/CotizacionService";
import { CuentaService } from "../services/modules/cultivos/CuentaService";
import { EmpresaServicioService } from "../services/modules/empresasServicios/EmpresaServicioService";
import { ImputaAService } from "../services/modules/imputaA/ImputaAService";
import { LaboresService } from "../services/modules/labores/LaboresService";
import { LoteActividadesService } from "../services/modules/loteActividades/LoteActividadesService";
import { OrdenDeTrabajoService } from "../services/modules/ordenDeTrabajo/OrdenDeTrabajoService";
import { PeriodosService } from "../services/modules/periodos/PeriodosService";
import { SubRubrosService } from "../services/modules/subRubros/SubRubrosService";

export const synchronizeLaboresService = async () => {
  const laboresToStay = await LaboresService.synchronizeLabors(); // ALMACENA LAS LABORES SIN SINCRONIZAR EN BD EXTERNA
  await LaboresService.deleteAllFromLocalDb(); // LIMPIA BD LOCAL - LABORES
  await LaboresService.getAll(); // TRAE TODO DE BD EXTERNA Y COMPLETA BD LOCAL LABORES
  await LaboresService.saveUpdated(laboresToStay);
};

export const synchronizeOrdenesService = async () => {
  await OrdenDeTrabajoService.synchronizeOrdenesDeTrabajo(); // ALMACENA LAS ORDENES SIN SINCRONIZAR EN BD EXTERNA
  await OrdenDeTrabajoService.deleteAllFromLocalDb(); // LIMPIA BD LOCAL - ORDENES
  await OrdenDeTrabajoService.getAll(); // TRAE TODO DE BD EXTERNA Y COMPLETA BD LOCAL - ORDENES
};

export const getAllGenericServices = async () => { // OK
  await deleteAllGenericFromDb();

  await InsumosService.getAll();
  await TareasService.getAll();
  await CotizacionService.getAll();
  await EstablecimientoService.getAll();
  await LoteService.getAll();
  await DepositoService.getAll();
  await SubRubrosService.getAll();
  await ConceptoService.getAll();
  await CuentaService.getAll();
  await MaquinariaService.getAll();
  await ContratistaService.getAll();
  await EmpleadoService.getAll();
  await EmpresaService.getAll();
  await ImputaAService.getAll();
  await PeriodosService.getAll();
  await LoteActividadesService.getAll();
  await EmpresaServicioService.getAll();
};

const deleteAllGenericFromDb = async () => { // OK
  await Repository.delete(CONSTANTS.TABLES.INSUMOS);
  await Repository.delete(CONSTANTS.TABLES.TAREAS);
  await Repository.delete(CONSTANTS.TABLES.COTIZACIONES);
  await Repository.delete(CONSTANTS.TABLES.LOTES);
  await Repository.delete(CONSTANTS.TABLES.CONTRATISTAS);
  await Repository.delete(CONSTANTS.TABLES.CUENTAS);
  await Repository.delete(CONSTANTS.TABLES.DEPOSITOS);
  await Repository.delete(CONSTANTS.TABLES.EMPLEADOS);
  await Repository.delete(CONSTANTS.TABLES.EMPRESAS);
  await Repository.delete(CONSTANTS.TABLES.IMPUTA_A);
  await Repository.delete(CONSTANTS.TABLES.LOTE_ACTIVIDAD);
  await Repository.delete(CONSTANTS.TABLES.MAQUINARIAS);
  await Repository.delete(CONSTANTS.TABLES.PERIODOS);
  await Repository.delete(CONSTANTS.TABLES.SUBRUBROS);
  await Repository.delete(CONSTANTS.TABLES.CONCEPTOS);
  await Repository.delete(CONSTANTS.TABLES.ESTABLECIMIENTOS);
  await Repository.delete(CONSTANTS.TABLES.EMPRESAS_SERVICIOS);
};