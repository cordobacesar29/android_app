import { IonContent, IonPage, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { PATH_PAGE } from "../../../utils/routes/paths";
import { HeaderStockHarvest } from "../_partials/HeaderStockHarvest";
import { FilterModal } from "../_partials/FilterModal";
import { StockHarvestForm } from "../_partials/StockHarvestForm";
import "./harvest.css";
import YesNoAlert from "../../../components/shared/alerts/YesNoAlert";
import { ISelect } from "../../../interfaces/ISelect";
import { getLastPeriodo } from "../../../services/store/queryStore";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";
import {
  getHarvestFilter,
  getHarvestReport,
} from "../../../services/store/queryStoreApisBack";
import { NotFoundPage } from "../../NotFound/NotFoundPage";
import IconoConjuntoSC from "../../../assets/icons/icono-conjunto-SC.svg";
import { StockHarvestCardNotTDestiny } from "../_partials/StockHarvestCardNotTDestiny";
import { StockHarvestCardTDestiny } from "../_partials/StockHarvestCardDestiny";
import { useFormikHarvest } from "../useFormikHarvest";
import {
  IHarvestDestiny,
  IHarvestFilterBack,
  IHarvestFilterData,
  IHarvestForm,
  IHarvestNotDestiny,
} from "../../../utils/models/harvestModel";
import {
  mapCaracteristicaToISelect,
  mapContratoToISelect,
  mapCultivoToISelect,
  mapEstablecimientoToISelect,
  mapGrupoDestinoToISelect,
  mapModoDestinoToISelect,
  mapPeriodToISelect,
} from "../../../utils/helpers/mapperToSelect";
import Swal from "sweetalert2";
import { NetworkConnect } from "../../../utils/helpers/useNetworkConnect";
import Lottie from "react-lottie";
import animationData from "../../../assets/animations/LogoJson/JSON_Logo/JSON_EXP/data.json";

export const initialDataHarvest: IHarvestForm = {
  PeriodoId: 1,
  ActividadId: 1,
  verTipoDestino: false,
  Desde: "",
  Hasta: "",
  ModoDestino: "",
  GrupoDestinoId: [],
  EstablecimientoId: [],
  CaracterisitcaId: [],
  ContratoId: [],
};
export type AnyType = any;

export const IndexPage: React.FC = () => {
  let history: any = useHistory();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialValues, setInitialValues] =
    useState<IHarvestForm>(initialDataHarvest);
  const { checkConnection, internetConnection } = NetworkConnect();
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  // DATA PARA FORMULARIO PRINCIPAL Y REPORTE
  const [cultivos, setCultivos] = useState<ISelect[]>([]);
  const [periodos, setPeriodos] = useState<ISelect[]>([]);
  const [filterData, setFilterData] = useState<IHarvestFilterData>();
  const [loadingMessage, setLoadingMessage] = useState<string>("Cargando...");

  const [stockeHarvest, setStockeHarvest] = useState<
    IHarvestNotDestiny[] | IHarvestDestiny[] | AnyType[] | undefined
  >([]);

  // LOTTIE ANIMATIONS CONFIGURATION
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const resultFilter: IHarvestFilterBack | undefined =
          await getHarvestFilter();
        if (!!resultFilter) {
          setPeriodos(mapPeriodToISelect(resultFilter.periodos));
          setCultivos(mapCultivoToISelect(resultFilter.cultivos));

          const filterData: IHarvestFilterData = {
            modoDestinos: mapModoDestinoToISelect(resultFilter.modoDestinos),
            grupoDestinos: mapGrupoDestinoToISelect(resultFilter.grupoDestinos),
            establecimientos: mapEstablecimientoToISelect(
              resultFilter.establecimientos
            ),
            destinoGrupoCaracteristicas: mapCaracteristicaToISelect(
              resultFilter.destinoGrupoCaracteristicas
            ),
            contratos: mapContratoToISelect(resultFilter.contratos),
          };
          setFilterData(filterData);

          const lastPeriodo = await getLastPeriodo();
          setInitialValues({
            ...initialValues,
            PeriodoId: lastPeriodo?.codigo || 1,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            width: "70%",
            heightAuto: true,
            title: "Error de comunicación con el servidor",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          width: "70%",
          heightAuto: true,
          title: "Error al recuperar datos",
          showConfirmButton: false,
          timer: 3000,
        });
        throw error;
      }
      setLoading(false);
    };
    if (internetConnection) {
      getData();
    }
  }, [internetConnection]);

  const getReport = async (params: IHarvestForm) => {
    checkConnection();
    if (internetConnection) {
      setIsGenerated(true);
      const results = await getHarvestReport(params);
      if (!!results) {
        setStockeHarvest(results);
        setTimeout(() => {
          setIsGenerated(false);
        }, 4000);
      } else {
        setIsGenerated(false);
        Swal.fire({
          position: "center",
          icon: "error",
          width: "70%",
          heightAuto: true,
          title: "Error de comunicación con el servidor",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        width: "70%",
        heightAuto: true,
        title: "Sin conexión a internet",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const handleCancel = () => {
    setShowAlert(true);
  };

  const cancel = () => {
    setShowAlert(false);
  };
  const confirm = (): void => {
    history.push(PATH_PAGE.home.default);
  };
  // FORMIK - MANEJO FORMULARIO FILTRO
  const { formik } = useFormikHarvest({ initialValues, getReport });
  return (
    <IonPage>
      {loading ? (
        <ComponentsLoader loading={loading} loadingMessage={loadingMessage} />
      ) : (
        <>
          <HeaderStockHarvest handleCancel={handleCancel} />
          {isGenerated ? (
            <div style={{ marginBottom: "7rem" }}>
              <Lottie
                options={defaultOptions}
                isStopped={false}
                isPaused={false}
                height={400}
                width={400}
              />
            </div>
          ) : (
            <IonContent className="contentTask">
              <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <StockHarvestForm
                  setShowModal={setShowModal}
                  cultivos={cultivos}
                  periodos={periodos}
                  formik={formik}
                />
                <FilterModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  formik={formik}
                  filterData={filterData}
                />
              </form>
              {stockeHarvest && stockeHarvest.length > 0 ? (
                !stockeHarvest[0]?.tipoDestino ? (
                  <StockHarvestCardNotTDestiny stockeHarvest={stockeHarvest} />
                ) : (
                  <StockHarvestCardTDestiny stockeHarvest={stockeHarvest} />
                )
              ) : (
                <IonRow className="content-cards-not-found">
                  <NotFoundPage
                    title="No hay informes disponibles"
                    p1="Seleccione cultivo y presione"
                    p2="el botón GENERAR para ver informes."
                    img={IconoConjuntoSC}
                  />
                </IonRow>
              )}
            </IonContent>
          )}
          <YesNoAlert
            isOpen={showAlert}
            header={"Cancelar"}
            message={"¿Esta seguro que desea salir de informes de cosecha?"}
            onConfirm={confirm}
            onCancel={cancel}
          />
        </>
      )}
    </IonPage>
  );
};
