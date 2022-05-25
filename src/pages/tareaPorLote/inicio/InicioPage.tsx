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
import { ITareaPorLoteCard } from "../../../interfaces/ITareaPorLoteCard";
import { getAllPeriodos, getLabores, getLaborToEdit } from "../../../services/store/queryStore";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";
import { PATH_PAGE } from "../../../utils/routes/paths";
import { TareaPorLoteCard } from "./TareaPorLoteCard";
import "../../../assets/styles/lotsTasks.css";
import "../../../assets/styles/tabs.css";
import { synchronizeLaboresService } from "../../../config/synchronizeService";
import { getLaboresOrdered } from "../../../utils/selectors/getLaboresOrdered";
import { NotFoundPage } from "../../NotFound/NotFoundPage";
import IconoConjuntoTL from "../../../assets/icons/icono-conjunto-TL.svg";
import YesNoAlert from "../../../components/shared/alerts/YesNoAlert";
import Swal from "sweetalert2";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import { LaboresService } from "../../../services/modules/labores/LaboresService";
import { ISelect } from "../../../interfaces/ISelect";

export const InicioPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filterTareas, setFilterTareas] = useState<ITareaPorLoteCard[]>([]);
  const [tareas, setTareas] = useState<ITareaPorLoteCard[]>([]);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [enableCopy, setEnableCopy] = useState<boolean>(false);
  const [enableDelete, setEnableDelete] = useState<boolean>(false);
  const [internetConnection, setInternetConnection] = useState(false);

  const [showAlertSync, setShowAlertSync] = useState<boolean>(false);
  const [showAlertDelete, setShowAlertDelete] = useState<boolean>(false);
  const [showAlertEdit, setShowAlertEdit] = useState<boolean>(false);
  const [showAlertCopy, setShowAlertCopy] = useState<boolean>(false);

  const [periodos, setPeriodos] = useState<ISelect[]>([]);

  let history: any = useHistory();
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

  const confirmSync = (): void => {
    const syncronizeLabors = async () => {
      try {
        setLoading(true);
        await synchronizeLaboresService();
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

    syncronizeLabors();
  };

  const confirmDelete = (): void => {
    const deleteTarea = async () => {
      const tareasCheked = tareas.filter((t) => t.isChecked);

      if (tareasCheked.length > 0) {
        try {
          setLoading(true);

          for (const tarea of tareasCheked) {
            if (!tarea.id) {
              continue;
            }

            await LaboresService.delete(tarea.id!);
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
      const tareasCheked = tareas.find((t) => t.isChecked);

      if (tareasCheked) {
        const tareaPorLote = await getLaborToEdit(tareasCheked.id!);
        await tarea.addTareaPorLote(tareaPorLote, false);
        history.push(PATH_PAGE.tareaPorLote.resumen);
      }
    };

    editTarea();
  };

  const confirmCopy = (): void => {
    const copyTarea = async () => {
      const tareasCheked = tareas.find((t) => t.isChecked);

      if (tareasCheked) {
        const tareaPorLote = await getLaborToEdit(tareasCheked.id!);
        tareaPorLote.laborId = undefined;
        await tarea.addTareaPorLote(tareaPorLote, false);
        history.push(PATH_PAGE.tareaPorLote.lote);
      }
    };

    copyTarea();
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

  const goBack = () => {
    history.push(PATH_PAGE.home.default);
  };

  const addTarea = () => {
    tarea.removeTareaPorLote();
    history.push(PATH_PAGE.tareaPorLote.lote);
  };

  const getData = async () => {
    const { list: labores } = await getLabores();
    setTareas(labores);
    const { selects: periodos } = await getAllPeriodos();
    setPeriodos(periodos);
    setLoading(false);
  };

  const checkTarea = (id: number, isChecked: boolean) => {
    let tarea = tareas.find((t) => t.id === id);
    const tareaIndex = tareas.findIndex((t) => t.id === id);

    if (!tarea) {
      return;
    }

    tarea.isChecked = isChecked;

    let data = [...tareas];
    data[tareaIndex] = { ...tarea };

    setTareas(data);
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
    const tareasCheked = tareas.filter((t) => t.isChecked);
    setEnableCopy(tareasCheked.length === 1);
    setEnableEdit(
      tareasCheked.length === 1 && tareasCheked.every((c) => !c.isSync)
    );
    setEnableDelete(
      tareasCheked.length === 1 && tareasCheked.every((c) => !c.isSync)
    );
  }, [tareas]);

  useEffect(() => {
    if (searchText.length > 0) {
      const filterData = tareas.filter(
        (tarea) =>
          tarea.imputaA.toLowerCase().includes(searchText.toLowerCase()) ||
          tarea.establecimiento
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          tarea.lote.toLowerCase().includes(searchText.toLowerCase()) ||
          tarea.tarea?.toLowerCase().includes(searchText.toLowerCase()) ||
          tarea.parteNum?.toString().includes(searchText.toLowerCase()) ||
          tarea.cantidad?.toString().includes(searchText.toLowerCase())
      );
      setFilterTareas(filterData);
    } else {
      setFilterTareas(tareas);
    }
  }, [searchText, tareas]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start" className="iconBackTask">
            <IonIcon slot="start" md={arrowBack} onClick={goBack} />
          </IonButtons>
          <IonTitle className="titleTask">Tareas por lote</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="contentTask">
        {loading && <ComponentsLoader loading={loading} />}
        <IonCard className="cardTask">
          <IonCardHeader>
            <IonSearchbar
              placeholder="Prueba buscando 'pulverización'"
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
            ></IonSearchbar>
          </IonCardHeader>
          <IonCardContent className="ionContentTask">
            <IonGrid className="gridTask">
              <IonItem onClick={addTarea} lines="none" className="colTask">
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
        {tareas.length > 0 ? (
          <IonRow className="content-cards-tasks">
            <IonCol>
              {filterTareas && filterTareas.length > 0 ? (
                getLaboresOrdered(filterTareas).map((l: ITareaPorLoteCard) => {
                  return (
                    <TareaPorLoteCard
                      onChange={checkTarea}
                      tarea={l}
                      periodos={periodos}
                      key={l.id}
                    />
                  );
                })
              ) : (
                <NotFoundPage
                  loading={loading}
                  img={IconoConjuntoTL}
                  title="No Hay Tareas Por Lote"
                  p1=""
                  p2=""
                />
              )}
            </IonCol>
          </IonRow>
        ) : (
          <IonRow className="content-cards-not-found">
            <NotFoundPage
              loading={loading}
              img={IconoConjuntoTL}
              title="No Hay Tareas Por Lote"
              p1="Sincroniza o presiona el botón AGREGAR"
              p2="para cargar una Tarea por Lote"
            />
          </IonRow>
        )}
      </IonContent>
      <YesNoAlert
        isOpen={showAlertSync}
        header={"Sincronizar"}
        message={"¿Desea sincronizar las tareas por lote?"}
        onConfirm={confirmSync}
        onCancel={cancelSync}
      />
      <YesNoAlert
        isOpen={showAlertDelete}
        header={"Eliminar"}
        message={
          "¿Esta seguro que desea eliminar las tareas por lote seleccionadas?"
        }
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <YesNoAlert
        isOpen={showAlertEdit}
        header={"Editar"}
        message={
          "¿Esta seguro que desea editar la tarea por lote seleccionada?"
        }
        onConfirm={confirmEdit}
        onCancel={cancelEdit}
      />
      <YesNoAlert
        isOpen={showAlertCopy}
        header={"Copiar"}
        message={
          "¿Esta seguro que desea copiar la tarea por lote seleccionada?"
        }
        onConfirm={confirmCopy}
        onCancel={cancelCopy}
      />
    </IonPage>
  );
};
