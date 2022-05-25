import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  pencil,
  sync,
  arrowBack,
  trashOutline,
  copyOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Network } from "@capacitor/network";
import Swal from "sweetalert2";
import { IOrdenDeTrabajoCard } from "../../../interfaces/IOrdenDeTrabajoCard";
import { PATH_PAGE } from "../../../utils/routes/paths";
import { useOrdenDeTrabajo } from "../../../utils/hooks/useOrdenDeTrabajo";
import { OrdenDeTrabajoCard } from "./OrdenDeTrabajoCard";
import "../../../assets/styles/workOrder.css";
import "../../../assets/styles/tabs.css";
import { NotFoundPage } from "../../NotFound/NotFoundPage";
import IconoConjuntoOT from "../../../assets/icons/icono-conjunto-OT.svg";
import YesNoAlert from "../../../components/shared/alerts/YesNoAlert";
import { ExecuteAlert } from "../../../components/shared/alerts/ExecuteOrderAlert";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import {
  getOrdenesDeTrabajo,
  getOrdenDeTrabajoToEdit,
  getOrdenDeTrabajoToExecute,
} from "../../../services/store/queryStoreOrdenes";
import { getOrdenesDeTrabajoOrdered } from "../../../utils/selectors/getOrdenesDeTrabajoOrdered";
import { OrdenDeTrabajoService } from "../../../services/modules/ordenDeTrabajo/OrdenDeTrabajoService";
import { synchronizeOrdenesService } from "../../../config/synchronizeService";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";

export const InicioPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [idOrden, setIdOrden] = useState(0);
  const [filterOrdenesDeTrabajo, setFilterOrdenesDeTrabajo] = useState<
    IOrdenDeTrabajoCard[]
  >([]);
  const [ordenesDeTrabajo, setOrdenesDeTrabajo] = useState<
    IOrdenDeTrabajoCard[]
  >([]);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [enableCopy, setEnableCopy] = useState<boolean>(false);
  const [enableDelete, setEnableDelete] = useState<boolean>(false);
  const [internetConnection, setInternetConnection] = useState(false);

  const [showAlertSync, setShowAlertSync] = useState<boolean>(false);
  const [showAlertDelete, setShowAlertDelete] = useState<boolean>(false);
  const [showAlertEdit, setShowAlertEdit] = useState<boolean>(false);
  const [showAlertCopy, setShowAlertCopy] = useState<boolean>(false);
  const [showAlertExecute, setShowAlertExecute] = useState<boolean>(false);

  let history: any = useHistory();
  let orden = useOrdenDeTrabajo();
  let tarea = useTareaPorLote();

  const handleOpenSync = () => {
    setShowAlertSync(true);
  };

  const handleOpenDelete = () => {
    setShowAlertDelete(true);
  };

  const handleOpenEdit = () => {
    setShowAlertEdit(true);
  };

  const handleOpenCopy = () => {
    setShowAlertCopy(true);
  };

  const handleOpenExecute = () => {
    setShowAlertExecute(true);
  };

  const confirmSync = (): void => {
    const syncronizeOrdenesDeTrabajo = async () => {
      try {
        setLoading(true);
        await synchronizeOrdenesService();
        await getData();
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          width: "70%",
          heightAuto: true,
          title: "Sincronización exitosa",
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (err) {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          width: "70%",
          heightAuto: true,
          title: "Error al sincronizar",
          showConfirmButton: false,
          timer: 3000,
        });
        throw err;
      }
    };

    syncronizeOrdenesDeTrabajo();
  };

  const confirmDelete = (): void => {
    const deleteTarea = async () => {
      const ordenesCheked = ordenesDeTrabajo.filter((t) => t.isChecked);

      if (ordenesCheked.length > 0) {
        try {
          setLoading(true);

          for (const orden of ordenesCheked) {
            if (!orden.id) {
              continue;
            }

            await OrdenDeTrabajoService.delete(orden.id!);
          }
          await getData();
          setLoading(false);
          Swal.fire({
            position: "center",
            icon: "success",
            width: "70%",
            heightAuto: true,
            title: "Eliminacion exitosa",
            showConfirmButton: false,
            timer: 3000,
          });
        } catch (err) {
          setLoading(false);
          Swal.fire({
            position: "center",
            icon: "error",
            width: "70%",
            heightAuto: true,
            title: "Error al eliminar",
            showConfirmButton: false,
            timer: 3000,
          });
          throw err;
        }
      }
    };

    deleteTarea();
  };

  const confirmEdit = (): void => {
    const editTarea = async () => {
      const ordenChecked = ordenesDeTrabajo.find((t) => t.isChecked);

      if (ordenChecked) {
        const ordenDeTrabajo = await getOrdenDeTrabajoToEdit(ordenChecked.id!);
        await orden.addOrdenDeTrabajo(ordenDeTrabajo, false);
        history.push(PATH_PAGE.ordenDeTrabajo.resumen);
      }
    };

    editTarea();
  };

  const confirmCopy = (): void => {
    const copyOrden = async () => {
      const tareasCheked = ordenesDeTrabajo.find((t) => t.isChecked);

      if (tareasCheked) {
        const tareaPorLote = await getOrdenDeTrabajoToEdit(tareasCheked.id!);
        tareaPorLote.ordenTrabajoId = undefined;
        await orden.addOrdenDeTrabajo(tareaPorLote, false);
        history.push(PATH_PAGE.ordenDeTrabajo.lote);
      }
    };

    copyOrden();
  };

  const confirmExecute = (): void => {
    const execute = async (id: number) => {
      const tareaPorLote = await getOrdenDeTrabajoToExecute(id);      
      await tarea.addTareaPorLote(tareaPorLote, false);
      history.push(PATH_PAGE.tareaPorLote.lote, {
        from: PATH_PAGE.ordenDeTrabajo.home,
      });
    };
    execute(idOrden);
  };

  const cancelSync = () => {
    setShowAlertSync(false);
  };

  const cancelDelete = () => {
    setShowAlertDelete(false);
  };

  const cancelEdit = () => {
    setShowAlertEdit(false);
  };

  const cancelCopy = () => {
    setShowAlertCopy(false);
  };

  const cancelExecute = () => {
    setShowAlertExecute(false);
  };

  const goBack = () => {
    history.push(PATH_PAGE.home.default);
  };

  const addOrden = () => {
    orden.removeOrdenDeTrabajo();
    history.push(PATH_PAGE.ordenDeTrabajo.lote);
  };

  const getData = async () => {
    const { list: ordenes } = await getOrdenesDeTrabajo();
    setOrdenesDeTrabajo(ordenes);
    setLoading(false);
  };

  const checkOrdenDeTrabajo = (id: number, isChecked: boolean) => {
    let orden = ordenesDeTrabajo.find((t) => t.id === id);
    const ordenIndex = ordenesDeTrabajo.findIndex((t) => t.id === id);

    if (!orden) {
      return;
    }

    orden.isChecked = isChecked;

    let data = [...ordenesDeTrabajo];
    data[ordenIndex] = { ...orden };

    setOrdenesDeTrabajo(data);
  };

  const checkConnection = async () => {
    const status = await Network.getStatus();
    setInternetConnection(status.connected);
  };

  useEffect(() => {
    checkConnection();
    getData();
  }, []);

  useEffect(() => {
    const ordenesCheked = ordenesDeTrabajo.filter((t) => t.isChecked);
    setEnableCopy(ordenesCheked.length === 1);
    setEnableEdit(
      ordenesCheked.length === 1 &&
        ordenesCheked.every((c) => !c.isSync) &&
        ordenesCheked[0].ejecutada !== "S"
    );
    setEnableDelete(
      ordenesCheked.length === 1 && ordenesCheked.every((c) => !c.isSync)
    );
  }, [ordenesDeTrabajo]);

  useEffect(() => {
    if (searchText.length > 0) {
      const filterData = ordenesDeTrabajo.filter(
        (orden) =>
          orden.actividad?.toLowerCase().includes(searchText.toLowerCase()) ||
          orden.numero?.toString().includes(searchText) ||
          orden.establecimiento
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          orden.lote?.toLowerCase().includes(searchText.toLowerCase()) ||
          orden.tarea?.toLowerCase().includes(searchText.toLowerCase()) ||
          orden.cantidad?.toString().includes(searchText.toLowerCase())
      );
      setFilterOrdenesDeTrabajo(filterData);
    } else {
      setFilterOrdenesDeTrabajo(ordenesDeTrabajo);
    }
  }, [searchText, ordenesDeTrabajo]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start" className="iconBackTask">
            <IonIcon slot="start" md={arrowBack} onClick={goBack} />
          </IonButtons>
          <IonTitle className="titleTask">Orden de trabajo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="contentTask">
        {loading && <ComponentsLoader loading={loading} />}
        <IonCard className="cardTask">
          <IonCardHeader className="searchBox">
            <IonSearchbar
              className="ordenTrabajoSearchBar"
              placeholder="Prueba buscando 'pulverización'"
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
            ></IonSearchbar>
          </IonCardHeader>
          <IonCardContent className="ionContentTask">
            <IonGrid className="gridTask">
              <IonItem onClick={addOrden} lines="none" className="colTask">
                <div className="itemTask">
                  <IonIcon size="large" slot="start" md={add} />
                  <small>Agregar</small>
                </div>
              </IonItem>
              <IonItem
                onClick={handleOpenEdit}
                lines="none"
                className="colTask"
                disabled={!enableEdit}
              >
                <div className="itemTask">
                  <IonIcon size="large" slot="start" md={pencil} />
                  <small>Editar</small>
                </div>
              </IonItem>
              <IonItem
                onClick={handleOpenDelete}
                lines="none"
                className="colTask"
                disabled={!enableDelete}
              >
                <div className="itemTask">
                  <IonIcon size="large" slot="start" md={trashOutline} />
                  <small>Borrar</small>
                </div>
              </IonItem>
              <IonItem
                onClick={handleOpenCopy}
                lines="none"
                className="colTask"
                disabled={!enableCopy}
              >
                <div className="itemTask">
                  <IonIcon size="large" slot="start" md={copyOutline} />
                  <small>Copiar</small>
                </div>
              </IonItem>
              <IonItem
                onClick={handleOpenSync}
                lines="none"
                className="colTask"
                disabled={!internetConnection}
              >
                <div className="itemTask">
                  <IonIcon size="large" slot="start" md={sync} />
                  <small>Sincronizar</small>
                </div>
              </IonItem>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        {ordenesDeTrabajo.length > 0 ? (
          <IonRow className="content-cards-tasks">
            <IonCol>
              {filterOrdenesDeTrabajo &&
                filterOrdenesDeTrabajo.length > 0 &&
                getOrdenesDeTrabajoOrdered(filterOrdenesDeTrabajo).map(
                  (l: IOrdenDeTrabajoCard) => {
                    return (
                      <OrdenDeTrabajoCard
                        onChange={checkOrdenDeTrabajo}
                        setIdOrden={setIdOrden}
                        cancelExecute={cancelExecute}
                        handleOpenExecute={handleOpenExecute}
                        ordenDeTrabajo={l}
                        key={l.id}
                      />
                    );
                  }
                )}
            </IonCol>
          </IonRow>
        ) : (
          <IonRow className="content-cards-not-found">
            <NotFoundPage
              loading={loading}
              img={IconoConjuntoOT}
              title="No Hay Ordenes de Trabajo"
              p1="Sincroniza o presiona el botón AGREGAR"
              p2="para cargar una Orden de Trabajo"
            />
          </IonRow>
        )}
      </IonContent>
      <YesNoAlert
        isOpen={showAlertSync}
        header={"Sincronizar"}
        message={"¿Desea sincronizar las ordenes de trabajo?"}
        onConfirm={confirmSync}
        onCancel={cancelSync}
      />
      <YesNoAlert
        isOpen={showAlertDelete}
        header={"Eliminar"}
        message={
          "¿Esta seguro que desea eliminar las ordenes de trabajo seleccionadas?"
        }
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <YesNoAlert
        isOpen={showAlertEdit}
        header={"Editar"}
        message={
          "¿Esta seguro que desea editar la orden de trabajo seleccionada?"
        }
        onConfirm={confirmEdit}
        onCancel={cancelEdit}
      />
      <YesNoAlert
        isOpen={showAlertCopy}
        header={"Copiar"}
        message={
          "¿Esta seguro que desea copiar la orden de trabajo seleccionada?"
        }
        onConfirm={confirmCopy}
        onCancel={cancelCopy}
      />
      <ExecuteAlert
        isOpen={showAlertExecute}
        onConfirm={confirmExecute}
        onCancel={cancelExecute}
      />
    </IonPage>
  );
};
