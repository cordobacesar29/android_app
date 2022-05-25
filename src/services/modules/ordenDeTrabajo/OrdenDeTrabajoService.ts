import moment from "moment";
import { CONSTANTS } from "../../constants/constants";
import apiAxiosInstance from "../../../utils/httpConfig/apiAxiosInstance";
import { Repository } from "../../../repositories/Repository";
import { IFilter } from "../../../repositories/IFilter";
import { IInsumoModel } from "../../../utils/models/insumoModel";
import { IEmpleadoModel } from "../../../utils/models/empleadoModel";
import { IOrdenDeTrabajo } from "../../../utils/models/ordenDetrabajo";
import {
  OrdenDeTrabajoInsumoModel,
  OrdenDeTrabajoModel,
  OrdenDeTrabajoPersonalModel,
} from "./OrdenDeTrabajoModel";
import { LaboresService } from "../labores/LaboresService";
import { StorageInstance } from "../../../config/createStorage";

export class OrdenDeTrabajoService {
  public static async getAll(): Promise<Array<OrdenDeTrabajoModel>> {
    try {
      const response = await apiAxiosInstance.get(
        CONSTANTS.ENDPOINTS.MASTER_DATA.OrdenesDeTrabajo.Get
      );
      let orders: Array<OrdenDeTrabajoModel> = [];
      let ordenesTrabajoInsumo: Array<OrdenDeTrabajoInsumoModel> = [];
      let ordenesTrabajoPersonales: Array<OrdenDeTrabajoPersonalModel> = [];

      response?.data.forEach((ordenTrabajo: any) => {
        const newElement: OrdenDeTrabajoModel = {
          id: ordenTrabajo.id,
          usuario: ordenTrabajo.usuario,
          cantidad: ordenTrabajo.cantidad,
          tipo: ordenTrabajo.tipo,
          codArea: ordenTrabajo.codArea,
          codLote: ordenTrabajo.codLote,
          codTarea: ordenTrabajo.codTarea,
          codLoteActividad: ordenTrabajo.codLoteActividad,
          codEstablecimiento: ordenTrabajo.codEstablecimiento,
          codContratista: ordenTrabajo.codContratista,
          codPeriodo: ordenTrabajo.codPeriodo,
          propia: ordenTrabajo.propia,
          cotizacionDolar: ordenTrabajo.cotizacionDolar,
          ejecutada: ordenTrabajo.ejecutada,
          fecha: ordenTrabajo.fecha,
          fechaCarga: ordenTrabajo.fechaCarga,
          horaCarga: ordenTrabajo.horaCarga,
          justificacion: ordenTrabajo.justificacion,
          numero: ordenTrabajo.numero,
          observacionesMaquina: ordenTrabajo.observacionesMaquina,
          observacionesTarea: ordenTrabajo.observacionesTarea,
          precioTarea: ordenTrabajo.precioTarea,
          precioTareaDolar: ordenTrabajo.precioTareaDolar,
          tecnico: ordenTrabajo.tecnico,
          supervisor: ordenTrabajo.supervisor,
          isSync: 1,
        };
        ordenTrabajo.ordenesTrabajoInsumo.forEach(
          (ordenTrabajoInsumo: any): any => {
            const newOrdenTrabajoInsumo: OrdenDeTrabajoInsumoModel = {
              id: ordenTrabajoInsumo.id,
              codDeposito: ordenTrabajoInsumo.codDeposito,
              codArticulo: ordenTrabajoInsumo.codArticulo,
              cantidad: ordenTrabajoInsumo.cantidad,
              dosis: ordenTrabajoInsumo.dosis,
              ordenTrabajoId: ordenTrabajoInsumo.ordenTrabajoId,
              ordenTrabajoMaquinaId: ordenTrabajoInsumo.ordenTrabajoMaquinaId,
              tipo: ordenTrabajoInsumo.tipo,
            };
            ordenesTrabajoInsumo = [
              ...ordenesTrabajoInsumo,
              newOrdenTrabajoInsumo,
            ];
          }
        );
        ordenTrabajo.ordenesTrabajoPersonal.forEach(
          (ordenTrabajoPersonal: any) => {
            const newOrdenTrabajoPersonal: OrdenDeTrabajoPersonalModel = {
              id: ordenTrabajoPersonal.id,
              cantidad: ordenTrabajoPersonal.cantidad,
              codConcepto: ordenTrabajoPersonal.codConcepto,
              codEmpleado: ordenTrabajoPersonal.codEmpleado,
              legajo: ordenTrabajoPersonal.legajo,
              importe: ordenTrabajoPersonal.importe,
              precio: ordenTrabajoPersonal.precio,
              ordenTrabajoId: ordenTrabajoPersonal.ordenTrabajoId,
            };
            ordenesTrabajoPersonales = [
              ...ordenesTrabajoPersonales,
              newOrdenTrabajoPersonal,
            ];
          }
        );

        orders = [...orders, newElement];
      });

      await Repository.saveAll(orders, CONSTANTS.TABLES.ORDENES_DE_TRABAJO);
      await Repository.saveAll(
        ordenesTrabajoInsumo,
        CONSTANTS.TABLES.ORDENES_DE_TRABAJO_INSUMOS
      );
      await Repository.saveAll(
        ordenesTrabajoPersonales,
        CONSTANTS.TABLES.ORDENES_DE_TRABAJO_PERSONALES
      );

      return orders;
    } catch (e) {
      throw e;
    }
  }

  public static async getOrdersOnlyFromDb(
    filters?: IFilter[]
  ): Promise<Array<OrdenDeTrabajoModel>> {
    try {
      const resultOrders = await Repository.get(
        CONSTANTS.TABLES.ORDENES_DE_TRABAJO,
        filters
      );

      let orders: Array<OrdenDeTrabajoModel> = [];
      if (!resultOrders.values) return orders;

      for (let i = 0; i < resultOrders.values.length; i++) {
        const element = resultOrders.values[i];

        const newElement: OrdenDeTrabajoModel = {
          id: element.id,
          codLoteActividad: element.codLoteActividad,
          cantidad: element.cantidad,
          codLote: element.codLote,
          codTarea: element.codTarea,
          codEstablecimiento: element.codEstablecimiento,
          codPeriodo: element.codPeriodo,
          fecha: element.fecha,
          numero: element.numero,
          propia: element.propia === "1" ? true : false,
          isSync: element.isSync,
          tecnico: element.tecnicoId,
          supervisor: element.supervisorCod,
          ejecutada: element.ejecutada,
        };
        orders = [...orders, newElement];
      }

      return orders;
    } catch (error) {
      throw error;
    }
  }

  public static async getAllFromDb(
    filters?: IFilter[]
  ): Promise<Array<OrdenDeTrabajoModel>> {
    try {
      const resultOrders = await Repository.get(
        CONSTANTS.TABLES.ORDENES_DE_TRABAJO,
        filters
      );

      let orders: Array<OrdenDeTrabajoModel> = [];
      if (!resultOrders.values) return orders;

      for (let i = 0; i < resultOrders.values.length; i++) {
        const element = resultOrders.values[i];

        const newElement: OrdenDeTrabajoModel = {
          id: element.id,
          usuario: element.usuario,
          cantidad: element.cantidad,
          tipo: element.tipo,
          codArea: element.codArea,
          codLote: element.codLote,
          codTarea: element.codTarea,
          codLoteActividad: element.codLoteActividad,
          codEstablecimiento: element.codEstablecimiento,
          codContratista: element.codContratista,
          codPeriodo: element.codPeriodo,
          propia: element.propia,
          cotizacionDolar: element.cotizacionDolar,
          ejecutada: element.ejecutada,
          fecha: element.fecha,
          fechaCarga: element.fechaCarga,
          horaCarga: element.horaCarga,
          justificacion: element.justificacion,
          numero: element.numero,
          observacionesMaquina: element.observacionesMaquina,
          observacionesTarea: element.observacionesTarea,
          precioTarea: element.precioTarea,
          precioTareaDolar: element.precioTareaDolar,
          tecnico: element.tecnico,
          supervisor: element.supervisor,
        };

        const idFilter: IFilter[] = [
          {
            column: "ordenTrabajoId",
            value: element.id,
          },
        ];

        const ordersInsumosResult = await Repository.get(
          CONSTANTS.TABLES.ORDENES_DE_TRABAJO_INSUMOS,
          idFilter
        );
        let ordersInsumos: Array<OrdenDeTrabajoInsumoModel> = [];

        if (
          ordersInsumosResult.values &&
          ordersInsumosResult.values.length > 0
        ) {
          ordersInsumosResult.values
            .filter((i) => i.tipo === "T")
            .forEach((insumo: any) => {
              const newInsumo: OrdenDeTrabajoInsumoModel = {
                id: insumo.id,
                ordenTrabajoId: insumo.ordenTrabajoId,
                codArticulo: insumo.codArticulo,
                codDeposito: insumo.codDeposito,
                cantidad: insumo.cantidad,
                ordenTrabajoMaquinaId: insumo.ordenTrabajoMaquinaId,
                dosis: insumo.dosis,
                tipo: insumo.tipo,
              };
              ordersInsumos = [...ordersInsumos, newInsumo];
            });
        }

        const ordersPersonalesResult = await Repository.get(
          CONSTANTS.TABLES.ORDENES_DE_TRABAJO_PERSONALES,
          idFilter
        );
        let ordersPersonales: Array<OrdenDeTrabajoPersonalModel> = [];

        if (
          ordersPersonalesResult.values &&
          ordersPersonalesResult.values.length > 0
        ) {
          ordersPersonalesResult.values.forEach((personal: any) => {
            const newPersonal: OrdenDeTrabajoPersonalModel = {
              id: personal.id,
              ordenTrabajoId: personal.ordenTrabajoId,
              codEmpleado: personal.codEmpleado,
              codConcepto: personal.codConcepto,
              legajo: personal.legajo,
              cantidad: personal.cantidad,
              precio: personal.precio,
              importe: personal.importe,
            };
            ordersPersonales = [...ordersPersonales, newPersonal];
          });
        }

        newElement.ordenesTrabajoInsumo = ordersInsumos;
        newElement.ordenesTrabajoPersonal = ordersPersonales;

        orders = [...orders, newElement];
      }
      return orders;
    } catch (error) {
      throw error;
    }
  }

  public static async save(ordenTrabajo: IOrdenDeTrabajo): Promise<any> {
    const user = await StorageInstance.getStorage("user");
    const newOrden: OrdenDeTrabajoModel = {
      fecha: moment(ordenTrabajo.lote.fecha).format(),
      codEstablecimiento: ordenTrabajo.lote.codEstablecimiento,
      codLote: ordenTrabajo.lote.codLote,
      codTarea: ordenTrabajo.lote.codTarea,
      codContratista: ordenTrabajo.lote.codContratista,
      codArea: ordenTrabajo.lote.codArea,
      cantidad: ordenTrabajo.lote.cantidad,
      codPeriodo: ordenTrabajo.codPeriodo,
      fechaCarga: ordenTrabajo.fechaCarga,
      horaCarga: ordenTrabajo.horaCarga,
      codLoteActividad: ordenTrabajo.lote.codLoteActividad,
      observacionesTarea: ordenTrabajo.observacionesTarea,
      isSync: 0,
      usuario: user.userName,
      numero: 0,
      propia: ordenTrabajo.lote.propia,
      tecnico: ordenTrabajo.asignacion.tecnicoCod,
      supervisor: ordenTrabajo.asignacion.supervisorCod,
      justificacion: ordenTrabajo.asignacion.justificacion,
      id: 0,
    };

    if (ordenTrabajo.ordenTrabajoId) {
      await this.delete(ordenTrabajo.ordenTrabajoId);
    }
    
    const orderTrabajoId = await Repository.save(
      newOrden,
      CONSTANTS.TABLES.ORDENES_DE_TRABAJO
    );
    let ordenesTrabajoInsumos: Array<OrdenDeTrabajoInsumoModel> = [];

    if (ordenTrabajo.insumos.length > 0) {
      for (let oti = 0; oti < ordenTrabajo.insumos.length; oti++) {
        const insumo: IInsumoModel = ordenTrabajo.insumos[oti];

        const newInsumo: OrdenDeTrabajoInsumoModel = {
          ordenTrabajoId: orderTrabajoId,
          codArticulo: insumo.codArticulo,
          codDeposito: insumo.codDeposito,
          cantidad: insumo.cantidad,
          dosis: insumo.dosis,
          tipo: "T",
        };
        ordenesTrabajoInsumos = [...ordenesTrabajoInsumos, newInsumo];
      }
      await Repository.saveAll(
        ordenesTrabajoInsumos,
        CONSTANTS.TABLES.ORDENES_DE_TRABAJO_INSUMOS
      );
    }

    let laboresPersonales: Array<OrdenDeTrabajoPersonalModel> = [];

    if (ordenTrabajo.empleados.length > 0) {
      for (let ote = 0; ote < ordenTrabajo.empleados.length; ote++) {
        const personal: IEmpleadoModel = ordenTrabajo.empleados[ote];

        const newPersonal: OrdenDeTrabajoPersonalModel = {
          ordenTrabajoId: orderTrabajoId,
          codEmpleado: personal.codEmpleado,
          codConcepto: personal.codConcepto,
          legajo: personal.legajo,
          cantidad: personal.cantidad,
          precio: personal.tarifa,
          importe: personal.importe,
        };
        laboresPersonales = [...laboresPersonales, newPersonal];
      }

      await Repository.saveAll(
        laboresPersonales,
        CONSTANTS.TABLES.ORDENES_DE_TRABAJO_PERSONALES
      );
    }
  }

  public static async update(
    columns: IFilter[],
    filters?: IFilter[]
  ): Promise<any> {
    await Repository.update(
      CONSTANTS.TABLES.ORDENES_DE_TRABAJO,
      columns,
      filters
    );
  }

  public static async synchronizeOrdenesDeTrabajo(): Promise<any> {
    const filter: IFilter[] = [
      {
        column: "isSync",
        value: 0,
      },
    ];

    const ordenes = await this.getAllFromDb(filter);
    
    if (ordenes.length > 0) {
      const ids = await apiAxiosInstance.post(
        CONSTANTS.ENDPOINTS.MASTER_DATA.OrdenesDeTrabajo.Save,
        { ordenesTrabajo: ordenes }
      );

      for (let x = 0; x < ids.data.length; x++) {
        const ordenIds = ids.data[x];

        const columns: IFilter[] = [
          {
            column: "nroOrdentrabajo",
            value: ordenIds.newId,
          },
        ];

        const filters: IFilter[] = [
          {
            column: "nroOrdentrabajo",
            value: ordenIds.oldId,
          },
        ];

        LaboresService.update(columns, filters);
      }
    }
  }

  public static async delete(id: number): Promise<any> {
    try {
      let filter: IFilter[] = [
        {
          column: "ordenTrabajoId",
          value: id,
        },
      ];
      await Repository.delete(
        CONSTANTS.TABLES.ORDENES_DE_TRABAJO_INSUMOS,
        filter
      );
      await Repository.delete(
        CONSTANTS.TABLES.ORDENES_DE_TRABAJO_PERSONALES,
        filter
      );

      filter = [
        {
          column: "id",
          value: id,
        },
      ];
      await Repository.delete(CONSTANTS.TABLES.ORDENES_DE_TRABAJO, filter);
    } catch (error) {
      throw error;
    }
  }

  public static async deleteAllFromLocalDb(): Promise<void> {
    await Repository.delete(CONSTANTS.TABLES.ORDENES_DE_TRABAJO_INSUMOS);
    await Repository.delete(CONSTANTS.TABLES.ORDENES_DE_TRABAJO_PERSONALES);
    await Repository.delete(CONSTANTS.TABLES.ORDENES_DE_TRABAJO);
  }
}
