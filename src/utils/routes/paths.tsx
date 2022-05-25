import { path } from "../helpers/misc";

const ROOTS = {
  empty: "/",
  auth: "/auth",
  app: "/app",
  tareaPorLote: "/tarea-por-lote",
  ordenDeTrabajo: "/orden-de-trabajo",
  stockHarvest:"/stock-de-cosecha",
  home: "/home",
  workOrder: "/work-order",
  field:"/campo",
  administration:"/administracion"
};

export const PATH_PAGE = {
  auth: {
    empty: ROOTS.empty,
    root: ROOTS.auth,
    login: path(ROOTS.auth, "login"),
  },
  home: {
    empty: ROOTS.empty,
    root: ROOTS.app,
    main: path(ROOTS.app, ""),
    ttest: path(ROOTS.app, ":name"),
    test: (name: string) => path(ROOTS.app, name),
    default: path(ROOTS.app, "Inbox"),
  },
  tareaPorLote:{
    home: path(`${ROOTS.app}${ROOTS.tareaPorLote}`, ""),
    tareaPorLote: path(`${ROOTS.app}${ROOTS.tareaPorLote}`, "tarea-por-lote"),
    lote: path(`${ROOTS.app}${ROOTS.tareaPorLote}`, "lote"),
    insumo: path(`${ROOTS.app}${ROOTS.tareaPorLote}`, "insumo"),
    addInsumoInMaquinaria: path(path(`${ROOTS.app}${ROOTS.tareaPorLote}`, "maquinaria"), "add"),
    editInsumoInMaquinaria: path(path(`${ROOTS.app}${ROOTS.tareaPorLote}`, "maquinaria"), "edit"),
    empleado: path(`${ROOTS.app}${ROOTS.tareaPorLote}`, "empleado"),
    maquinaria: path(`${ROOTS.app}${ROOTS.tareaPorLote}`, "maquinaria"),
    resumen: path(`${ROOTS.app}${ROOTS.tareaPorLote}`, "resumen"),
  },
  ordenDeTrabajo:{
    home: path(`${ROOTS.app}${ROOTS.ordenDeTrabajo}`, ""),
    ordenDeTrabajo: path(`${ROOTS.app}${ROOTS.ordenDeTrabajo}`, "orden-de-trabajo"),
    lote: path(`${ROOTS.app}${ROOTS.ordenDeTrabajo}`, "lote"),
    insumo: path(`${ROOTS.app}${ROOTS.ordenDeTrabajo}`, "insumo"),
    empleado: path(`${ROOTS.app}${ROOTS.ordenDeTrabajo}`, "empleado"),
    asignacion: path(`${ROOTS.app}${ROOTS.ordenDeTrabajo}`, "asignacion"),
    resumen: path(`${ROOTS.app}${ROOTS.ordenDeTrabajo}`, "resumen"),
  },
  stockHarvest:{
    stockHarvest: path(`${ROOTS.app}${ROOTS.stockHarvest}`, "stock-de-cosecha"),
    index: path(`${ROOTS.app}${ROOTS.stockHarvest}`, "index"),
    cliente: path(`${ROOTS.app}${ROOTS.stockHarvest}`, "cliente"),
    silo: path(`${ROOTS.app}${ROOTS.stockHarvest}`, "silo"),
    acopio: path(`${ROOTS.app}${ROOTS.stockHarvest}`, "acopio")
  },
  workOrder: {
    home: path(`${ROOTS.app}${ROOTS.workOrder}`, ""),
    index: path(`${ROOTS.app}${ROOTS.workOrder}`, "index"),
    lots: path(`${ROOTS.app}${ROOTS.workOrder}`, "lots"),
    supplies: path(`${ROOTS.app}${ROOTS.workOrder}`, "supplies"),
    employees: path(`${ROOTS.app}${ROOTS.workOrder}`, "employees"),
    assignments: path(`${ROOTS.app}${ROOTS.workOrder}`, "assignments"),
    resume: path(`${ROOTS.app}${ROOTS.workOrder}`, "resume"),
  },
  field: {
    home: path(`${ROOTS.app}${ROOTS.field}`, ""),
    index: path(`${ROOTS.app}${ROOTS.field}`, "index"),
    field: path(`${ROOTS.app}${ROOTS.field}`, "campo"),
    farming: path(`${ROOTS.app}${ROOTS.field}`, "agricultura"),
    harvest: path(`${ROOTS.app}${ROOTS.field}`, "cosecha"),
    cattleRaising: path(`${ROOTS.app}${ROOTS.field}`, "ganaderia"),
  },
  administration: {
    home: path(`${ROOTS.app}${ROOTS.administration}`, ""),
    index: path(`${ROOTS.app}${ROOTS.administration}`, "index"),
    buys: path(`${ROOTS.app}${ROOTS.administration}`, "compras"),
    sales: path(`${ROOTS.app}${ROOTS.administration}`, "ventas"),
    taxation: path(`${ROOTS.app}${ROOTS.administration}`, "impuestos"),
  }
};
