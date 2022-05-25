import { CONSTANTS } from "../../constants/constants";
import apiAxiosInstance from "../../../utils/httpConfig/apiAxiosInstance";
import {
  LaboresInsumoModel,
  LaboresMaquinariaModel,
  LaboresPersonalModel,
  LaboresModel,
} from "./LaboresModel";
import { Repository } from "../../../repositories/Repository";
import { IFilter } from "../../../repositories/IFilter";
import { ITareaPorLote } from "../../../utils/models/tareaPorLote";
import { IInsumoModel } from "../../../utils/models/insumoModel";
import { IEmpleadoModel } from "../../../utils/models/empleadoModel";
import { StorageInstance } from "../../../config/createStorage";
import { OrdenDeTrabajoService } from "../ordenDeTrabajo/OrdenDeTrabajoService";

export class LaboresService {
  public static async getAll(): Promise<Array<LaboresModel>> {
    try {
      const response = await apiAxiosInstance.get(
        CONSTANTS.ENDPOINTS.MASTER_DATA.Labores.Get
      );
      let labores: Array<LaboresModel> = [];
      let laboresInsumos: Array<LaboresInsumoModel> = [];
      let laboresMaquinarias: Array<LaboresMaquinariaModel> = [];
      let laboresPersonales: Array<LaboresPersonalModel> = [];

      response.data.forEach((element: any) => {
        const newElement: LaboresModel = {
          id: element.id,
          fecha: element.fecha,
          codArea: element.codArea,
          codLote: element.codLote,
          codTarea: element.codTarea,
          propia: element.propia,
          codContratista: element.codContratista,
          observacionesTarea: element.observacionesTarea,
          usuario: element.usuario,
          fechaCarga: element.fechaCarga,
          precioTarea: element.precioTarea,
          observacionesMaquina: element.observacionesMaquina,
          tipo: element.tipo,
          nroOrdentrabajo: element.nroOrdentrabajo,
          cantidad: element.cantidad,
          parteNum: element.parteNum,
          codPeriodo: element.codPeriodo,
          codLoteActividad: element.codLoteActividad,
          codEstablecimiento: element.codEstablecimiento,
          imputa: element.imputa,
          isSync: 1,
        };

        element.laboresInsumos.forEach((insumo: any) => {
          const newInsumo: LaboresInsumoModel = {
            id: insumo.id,
            laborId: insumo.laborId,
            codArticulo: insumo.codArticulo,
            codDeposito: insumo.codDeposito,
            laborMaquinariaId: insumo.laborMaquinariaId,
            cantidad: insumo.cantidad,
            dosis: insumo.dosis,
            tipo: insumo.tipo,
          };
          laboresInsumos = [...laboresInsumos, newInsumo];
        });

        element.laboresMaquinarias.forEach((maquinaria: any) => {
          const newMaquinaria: LaboresMaquinariaModel = {
            id: maquinaria.id,
            laborId: maquinaria.laborId,
            maquinariaCod: maquinaria.maquinariaCod,
            empresaCod: maquinaria.empresaCod,
            horasMaquinaria: maquinaria.horasMaquinaria,
            kilometraje: maquinaria.kilometraje,
          };
          laboresMaquinarias = [...laboresMaquinarias, newMaquinaria];
        });

        element.laboresPersonales.forEach((personal: any) => {
          const newPersonal: LaboresPersonalModel = {
            id: personal.id,
            laborId: personal.laborId,
            codEmpleado: personal.codEmpleado,
            codConcepto: personal.codConcepto,
            legajo: personal.legajo,
            cantidad: personal.cantidad,
            tarifa: personal.tarifa,
            importe: personal.importe,
          };
          laboresPersonales = [...laboresPersonales, newPersonal];
        });

        labores = [...labores, newElement];
      });

      await Repository.saveAll(labores, CONSTANTS.TABLES.LABORES);
      await Repository.saveAll(laboresInsumos, CONSTANTS.TABLES.LABORES_INSUMOS);
      await Repository.saveAll(laboresMaquinarias, CONSTANTS.TABLES.LABORES_MAQUINARIAS);
      await Repository.saveAll(laboresPersonales, CONSTANTS.TABLES.LABORES_PERSONALES);

      return labores;
    } catch (e) {
      throw e;
    }
  }

  public static async getLaboresOnlyFromDb(
    filters?: IFilter[]
  ): Promise<Array<LaboresModel>> {
    try {
      const resultLabores = await Repository.get(
        CONSTANTS.TABLES.LABORES,
        filters
      );

      let labores: Array<LaboresModel> = [];
      if (!resultLabores.values) return labores;

      for (let i = 0; i < resultLabores.values.length; i++) {
        const element = resultLabores.values[i];

        const newElement: LaboresModel = {
          id: element.id,
          fecha: element.fecha,
          codArea: element.codArea,
          codLote: element.codLote,
          codTarea: element.codTarea,
          propia: element.propia,
          codContratista: element.codContratista,
          observacionesTarea: element.observacionesTarea,
          usuario: element.usuario,
          fechaCarga: element.fechaCarga,
          precioTarea: element.precioTarea,
          observacionesMaquina: element.observacionesMaquina,
          tipo: element.tipo,
          nroOrdentrabajo: element.nroOrdentrabajo,
          cantidad: element.cantidad,
          parteNum: element.parteNum,
          codPeriodo: element.codPeriodo,
          codLoteActividad: element.codLoteActividad,
          codEstablecimiento: element.codEstablecimiento,
          imputa: element.imputa,
          isSync: element.isSync,
        };
        labores = [...labores, newElement];
      }

      return labores;
    } catch (error) {
      throw error;
    }
  }

  public static async getAllFromDb(
    filters?: IFilter[]
  ): Promise<Array<LaboresModel>> {
    try {
      const resultLabores = await Repository.get(
        CONSTANTS.TABLES.LABORES,
        filters
      );

      let labores: Array<LaboresModel> = [];
      if (!resultLabores.values) return labores;

      for (let i = 0; i < resultLabores.values.length; i++) {
        const element = resultLabores.values[i];

        const newElement: LaboresModel = {
          id: element.id,
          fecha: new Date(element.fecha).toISOString(),
          codArea: element.codArea,
          codLote: element.codLote,
          codTarea: element.codTarea,
          propia: element.propia,
          codContratista: element.codContratista,
          observacionesTarea: element.observacionesTarea,
          usuario: element.usuario,
          fechaCarga: element.fechaCarga,
          tipo: element.tipo,
          nroOrdentrabajo: element.nroOrdentrabajo,
          cantidad: element.cantidad,
          parteNum: element.parteNum,
          codPeriodo: element.codPeriodo,
          codLoteActividad: element.codLoteActividad,
          codEstablecimiento: element.codEstablecimiento,
          imputa: element.imputa,
          isSync: element.isSync
        };

        const idFilter: IFilter[] = [
          {
            column: "laborId",
            value: element.id,
          },
        ];

        const laboresInsumosResult = await Repository.get(
          CONSTANTS.TABLES.LABORES_INSUMOS,
          idFilter
        );
        let laboresInsumos: Array<LaboresInsumoModel> = [];

        if (
          laboresInsumosResult.values &&
          laboresInsumosResult.values.length > 0
        ) {
          laboresInsumosResult.values
            .filter((i) => i.tipo === "T")
            .forEach((insumo: any) => {
              const newInsumo: LaboresInsumoModel = {
                id: insumo.id,
                laborId: insumo.laborId,
                codArticulo: insumo.codArticulo,
                codDeposito: insumo.codDeposito,
                laborMaquinariaId: insumo.laborMaquinariaId,
                cantidad: insumo.cantidad,
                dosis: insumo.dosis,
                tipo: insumo.tipo,
              };
              laboresInsumos = [...laboresInsumos, newInsumo];
            });
        }

        const laboresMaquinariasResult = await Repository.get(
          CONSTANTS.TABLES.LABORES_MAQUINARIAS,
          idFilter
        );
        let laboresMaquinarias: Array<LaboresMaquinariaModel> = [];

        if (
          laboresMaquinariasResult.values &&
          laboresMaquinariasResult.values.length > 0
        ) {
          for (let j = 0; j < laboresMaquinariasResult.values.length; j++) {
            const maquinaria = laboresMaquinariasResult.values[j];
            const idFilter: IFilter[] = [
              {
                column: "laborMaquinariaId",
                value: maquinaria.id,
              },
            ];

            const insumosMaquinariaResult = await Repository.get(
              CONSTANTS.TABLES.LABORES_INSUMOS,
              idFilter
            );

            let insumos: Array<LaboresInsumoModel> = [];

            if (
              insumosMaquinariaResult.values &&
              insumosMaquinariaResult.values.length > 0
            ) {
              insumosMaquinariaResult.values.forEach(
                (insumo: LaboresInsumoModel) => {
                  insumos = [...insumos, insumo];
                }
              );
            }

            const newMaquinaria: LaboresMaquinariaModel = {
              id: maquinaria.id,
              laborId: maquinaria.laborId,
              maquinariaCod: maquinaria.maquinariaCod,
              empresaCod: maquinaria.empresaCod,
              horasMaquinaria: maquinaria.horasMaquinaria,
              kilometraje: maquinaria.kilometraje,
              laboresInsumos: insumos,
            };
            laboresMaquinarias = [...laboresMaquinarias, newMaquinaria];
          }
        }

        const laboresPersonalesResult = await Repository.get(
          CONSTANTS.TABLES.LABORES_PERSONALES,
          idFilter
        );
        let laboresPersonales: Array<LaboresPersonalModel> = [];

        if (
          laboresPersonalesResult.values &&
          laboresPersonalesResult.values.length > 0
        ) {
          laboresPersonalesResult.values.forEach((personal: any) => {
            const newPersonal: LaboresPersonalModel = {
              id: personal.id,
              laborId: personal.laborId,
              codEmpleado: personal.codEmpleado,
              codConcepto: personal.codConcepto,
              legajo: personal.legajo,
              cantidad: personal.cantidad,
              tarifa: personal.tarifa,
              importe: personal.importe,
            };
            laboresPersonales = [...laboresPersonales, newPersonal];
          });
        }

        newElement.laboresInsumos = laboresInsumos;
        newElement.laboresMaquinarias = laboresMaquinarias;
        newElement.laboresPersonales = laboresPersonales;

        labores = [...labores, newElement];
      }
      return labores;
    } catch (error) {
      throw error;
    }
  }

  public static async save(tareaPorLote: ITareaPorLote): Promise<any> {
    const user = await StorageInstance.getStorage("user");
    const newLabor: LaboresModel = {
      fecha: tareaPorLote.lote.fecha,
      parteNum: tareaPorLote.lote.parte,
      imputa: tareaPorLote.lote.imputaA,
      codEstablecimiento: tareaPorLote.lote.codEstablecimiento,
      codLote: tareaPorLote.lote.codLote,
      codTarea: tareaPorLote.lote.codTarea,
      codContratista: tareaPorLote.lote.codContratista,
      codArea: tareaPorLote.lote.codArea,
      cantidad: tareaPorLote.lote.cantidad,
      propia: tareaPorLote.lote.propia,
      codPeriodo: tareaPorLote.codPeriodo,
      observacionesTarea: tareaPorLote.observacionesTarea,
      fechaCarga: tareaPorLote.fechaCarga,
      codLoteActividad: tareaPorLote.lote.codLoteActividad,
      nroOrdentrabajo: tareaPorLote.nroOrdentrabajo || tareaPorLote.ordenId,
      usuario: user.userName,
      isSync: 0,
    };

    if (tareaPorLote.laborId) {
      await LaboresService.delete(tareaPorLote.laborId);
    }

    const laborId = await Repository.save(newLabor, CONSTANTS.TABLES.LABORES);
    let laboresInsumos: Array<LaboresInsumoModel> = [];

    if (tareaPorLote.insumos.length > 0) {
      tareaPorLote.insumos.forEach((insumo: IInsumoModel) => {
        const newInsumo: LaboresInsumoModel = {
          laborId: laborId,
          codArticulo: insumo.codArticulo,
          codDeposito: insumo.codDeposito,
          cantidad: insumo.cantidad,
          dosis: insumo.dosis,
          tipo: "T",
        };
        laboresInsumos = [...laboresInsumos, newInsumo];
      });

      await Repository.saveAll(
        laboresInsumos,
        CONSTANTS.TABLES.LABORES_INSUMOS
      );
    }

    let laboresMaquinarias: Array<LaboresMaquinariaModel> = [];

    if (tareaPorLote.maquinaria.length > 0) {
      for (let i = 0; i < tareaPorLote.maquinaria.length; i++) {
        const maquinaria = tareaPorLote.maquinaria[i];

        const newMaquinaria: LaboresMaquinariaModel = {
          laborId: laborId,
          maquinariaCod: maquinaria.maquinariaCod,
          empresaCod: maquinaria.empresaCod,
          horasMaquinaria: maquinaria.hsKm,
        };

        laboresMaquinarias = [...laboresMaquinarias, newMaquinaria];

        let laboresInsumosMaquinaria: Array<LaboresInsumoModel> = [];
        const idMaquinaria = await Repository.save(
          newMaquinaria,
          CONSTANTS.TABLES.LABORES_MAQUINARIAS
        );

        if (maquinaria.insumos.length > 0) {
          for (let j = 0; j < maquinaria.insumos.length; j++) {
            const insumo = maquinaria.insumos[j];
            const newInsumo: LaboresInsumoModel = {
              laborId: laborId,
              laborMaquinariaId: idMaquinaria,
              codArticulo: insumo.codArticulo,
              codDeposito: insumo.codDeposito,
              cantidad: insumo.cantidad,
              dosis: insumo.dosis,
              tipo: "M",
            };
            laboresInsumosMaquinaria = [...laboresInsumosMaquinaria, newInsumo];
          }

          await Repository.saveAll(
            laboresInsumosMaquinaria,
            CONSTANTS.TABLES.LABORES_INSUMOS
          );
        }
      }
    }

    let laboresPersonales: Array<LaboresPersonalModel> = [];

    if (tareaPorLote.empleados.length > 0) {
      tareaPorLote.empleados.forEach((personal: IEmpleadoModel) => {
        const newPersonal: LaboresPersonalModel = {
          laborId: laborId,
          codEmpleado: personal.codEmpleado,
          codConcepto: personal.codConcepto,
          legajo: personal.legajo,
          cantidad: personal.cantidad,
          tarifa: personal.tarifa,
          importe: personal.importe,
        };
        laboresPersonales = [...laboresPersonales, newPersonal];
      });

      await Repository.saveAll(
        laboresPersonales,
        CONSTANTS.TABLES.LABORES_PERSONALES
      );
    }
  }

  public static async saveUpdated(labores: LaboresModel[]): Promise<any> {
    try{
      for (const labor of labores) {
        const maquinarias = labor.laboresMaquinarias;
        let insumos = labor.laboresInsumos;
        let personales = labor.laboresPersonales;
        let insumosMaquinarias: LaboresInsumoModel[] = [];
  
        delete labor.laboresInsumos;
        delete labor.laboresMaquinarias;
        delete labor.laboresPersonales;
        delete labor.id;
  
        const laborId = await Repository.save(labor, CONSTANTS.TABLES.LABORES);
  
        insumos = insumos?.map((insumo) => {
          delete insumo.id;
          insumo.laborId = laborId;
          return insumo;
        });

        personales = personales?.map((personal) => {
          delete personal.id;
          personal.laborId = laborId;
          return personal;
        });

        if (maquinarias) {
          for (const maquinaria of maquinarias) {
            let insumosMaquinaria = maquinaria.laboresInsumos;

            delete maquinaria.laboresInsumos;
            delete maquinaria.id;

            maquinaria.laborId = laborId;

            const maquinariaId = await Repository.save(maquinaria, CONSTANTS.TABLES.LABORES_MAQUINARIAS);

            insumosMaquinaria = insumosMaquinaria?.map((insumoMaquinaria) => {
              delete insumoMaquinaria.id;
              insumoMaquinaria.laborId = laborId;
              insumoMaquinaria.laborMaquinariaId = maquinariaId;
              return insumoMaquinaria;
            })

            if (insumosMaquinaria && insumosMaquinaria.length > 0) {
              insumosMaquinarias = [...insumosMaquinarias, ...insumosMaquinaria];
            }
          }
        }
        
        if (insumos && insumos.length > 0) {
          if (insumosMaquinarias.length > 0) {
            insumos = [...insumos, ...insumosMaquinarias];
          }
          await Repository.saveAll(insumos, CONSTANTS.TABLES.LABORES_INSUMOS)
        }

        if (personales && personales.length > 0) {
          await Repository.saveAll(personales, CONSTANTS.TABLES.LABORES_PERSONALES)
        }

      }
    } catch (error) {
      console.log(error);
    }
  }

  public static async update(
    columns: IFilter[],
    filters?: IFilter[]
  ): Promise<any> {
    await Repository.update(CONSTANTS.TABLES.LABORES, columns, filters);
  }

  public static async delete(id: number): Promise<any> {
    try {
      let filter: IFilter[] = [
        {
          column: "laborId",
          value: id,
        },
      ];
      await Repository.delete(CONSTANTS.TABLES.LABORES_PERSONALES, filter);
      await Repository.delete(CONSTANTS.TABLES.LABORES_MAQUINARIAS, filter);
      await Repository.delete(CONSTANTS.TABLES.LABORES_INSUMOS, filter);

      filter = [
        {
          column: "id",
          value: id,
        },
      ];
      await Repository.delete(CONSTANTS.TABLES.LABORES, filter);
    } catch (error) {
      throw error;
    }
  }

  public static async deleteAllFromLocalDb(): Promise<void> {
    await Repository.delete(CONSTANTS.TABLES.LABORES_INSUMOS);
    await Repository.delete(CONSTANTS.TABLES.LABORES_MAQUINARIAS);
    await Repository.delete(CONSTANTS.TABLES.LABORES_PERSONALES);
    await Repository.delete(CONSTANTS.TABLES.LABORES);
  }

  public static async synchronizeLabors(): Promise<LaboresModel[]> {
    const filter: IFilter[] = [
      {
        column: "isSync",
        value: 0,
      },
    ];

    const labores = await this.getAllFromDb(filter);
    let laboresToStay: LaboresModel[] = [];
    
    if (labores.length > 0) {
      const laboresWithOrden = labores.filter((item) => item.nroOrdentrabajo);
      let laboresToSync = labores.filter((item) => !item.nroOrdentrabajo);
      
      for (let i = 0; i < laboresWithOrden.length; i++) {
        const labor = laboresWithOrden[i];
        const filterOrden: IFilter[] = [
          {
            column: "id",
            value: labor.nroOrdentrabajo,
          },
          {
            column: "isSync",
            value: 1,
          }
        ];
        const ordenes = await OrdenDeTrabajoService.getOrdersOnlyFromDb(filterOrden);

        if (ordenes.length > 0){
          laboresToSync = [...laboresToSync, labor];
        } else {
          laboresToStay = [...laboresToStay, labor]
        }
      }

      await apiAxiosInstance.post(
        CONSTANTS.ENDPOINTS.MASTER_DATA.Labores.Save,
        { labores: laboresToSync }
      );
    }

    return laboresToStay;
  }
}
