import { PATH_PAGE } from "../../../../utils/routes/paths";
import IconoTareasPorLote from "../../../../assets/icons/icono-tareas-por-lote.svg";
import IconoOrdenDeTrabajo from "../../../../assets/icons/icono-orden-de-trabajo.svg";
import IconoRemitoDeCompra from "../../../../assets/icons/icono-remito-de-compra.svg";
import IconoStockDeArticulos from "../../../../assets/icons/icono-stock-de-articulos.svg";
import IconoStockDeCosecha from "../../../../assets/icons/icono-stock-de-cosecha.svg";
import IconoCosecha from "../../../../assets/icons/icono-cosecha.svg";

export const cards = [
    {
        title: 'Tareas por Lote',
        url: PATH_PAGE.tareaPorLote.home,
        icon: IconoTareasPorLote,
        needsSync: true,
    },
    {
        title: 'Orden de Trabajo',
        url: PATH_PAGE.ordenDeTrabajo.home,
        icon: IconoOrdenDeTrabajo,
        needsSync: true,
    },
    // {
    //     title: 'Remito de Compra',
    //     url: PATH_PAGE.home.default,
    //     icon: IconoRemitoDeCompra,
    // },
    // {
    //     title: 'Stock de Artículos',
    //     url: PATH_PAGE.home.default,
    //     icon: IconoStockDeArticulos,
    // },
    {
        title: 'Stock de Cosecha',
        url: PATH_PAGE.stockHarvest.index,
        icon: IconoStockDeCosecha,
        needsSync: false,
    },
    // {
    //     title: 'Cosecha',
    //     url: PATH_PAGE.home.default,
    //     icon: IconoCosecha,
    // },
];
