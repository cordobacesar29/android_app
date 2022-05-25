import { useEffect, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonFooter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { MaquinariaAddModal } from "./MaquinariaAddModal";
import { MaquinariaCard } from "./MaquinariaCard";
import { useTareaPorLote } from "../../../utils/hooks/useTareaPorLote";
import { IMaquinariaModel } from "../../../utils/models/maquinariaModel";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "../../../utils/routes";
import { ISelect } from "../../../interfaces/ISelect";
import {
  getEmpresasServicios,
  getMaquinarias,
} from "../../../services/store/queryStore";
import { ComponentsLoader } from "../../../components/shared/loaders/ComponentsLoader";

import { MaquinariaModel } from "../../../services/modules/maquinarias/MaquinariaModel";
import { getMaquinariasToSelect } from "../../../utils/selectors/getMaquinaria";
import { IComponentsRoute } from "../../../utils/models/ComponentRoutes";

export const MaquinariaLotePage = (props:IComponentsRoute) => {
  const { tareaPorLote }: any = useTareaPorLote();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [maquinarias, setMaquinarias] = useState<MaquinariaModel[]>([]);
  const [empresas, setEmpresas] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const { selects: empresas } = await getEmpresasServicios();
      setEmpresas(empresas);
      const { data: maquinarias } = await getMaquinarias();
      setMaquinarias(maquinarias);
      setLoading(false);
    };
    getData();
  }, []);

  const handleModalOpen = (value: boolean): void => {
    setIsOpen(value);
  };

  return (
    <>
      {loading ? (
        <ComponentsLoader loading={loading} />
      ) : (
        <>
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    className="btnAddTasks"
                    expand="block"
                    color="secondary"
                    disabled={tareaPorLote.maquinaria.length >= 2}
                    onClick={(): void => handleModalOpen(true)}
                  >
                    <IonIcon slot="start" icon={add} />
                    Agregar Maquinaria
                  </IonButton>
                </IonCol>
              </IonRow>
              {tareaPorLote.maquinaria &&
                tareaPorLote.maquinaria.length > 0 &&
                tareaPorLote.maquinaria.map((m: IMaquinariaModel) => {
                  return (
                    <MaquinariaCard
                      key={m.id}
                      id={m.id}
                      maquinariaCod={m.maquinariaCod}
                      empresaCod={m.empresaCod}
                      hsKm={m.hsKm}
                      insumos={m.insumos}
                      maquinarias={getMaquinariasToSelect(maquinarias)}
                      empresas={empresas}
                    />
                  );
                })}
            </IonGrid>
          </IonContent>
          <IonFooter>
            <IonRow>
              <IonCol>
                <Link to={PATH_PAGE.tareaPorLote.resumen}>
                  <IonButton expand="block" className="btnTasksNext">
                    Continuar
                  </IonButton>
                </Link>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  className="btnTasksCancel"
                  expand="block"
                  color="light"
                  onClick={()=>props.setShowAlert(true)}
                >
                  Cancelar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonFooter>
          <MaquinariaAddModal
            isOpen={isOpen}
            handleModalOpen={handleModalOpen}
            isNew={true}
            empresas={empresas}
            maquinarias={maquinarias}
          />
        </>
      )}
    </>
  );
};
