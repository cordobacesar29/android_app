import { IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonItem, IonLabel, IonModal, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { Fragment, useEffect, useState } from "react";
import { ISearchableSelectModel } from "../../../utils/models/inputs/searchableSelectModel";
import Error from "./Error";

const SearchableSelect: React.FC<ISearchableSelectModel> = (props: ISearchableSelectModel) => {

  const [value, setValue] = useState<any>();
  const [items, setItems] = useState<any[]>();
  const [searchText, setSearchText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = (e: any) => {
    if (props.items.length > 0 && !props.disabled) {
      props.handleBlur();
      setIsOpen(true);
    }
  }

  const close = () => {
    setIsOpen(false);
  }

  const handleSearchItem = (text: string) => {
    setSearchText(text);
    const itemsFiltered = props.items.filter(i => text === '' || i.value.toLowerCase().includes(text.toLowerCase()));
    setItems(itemsFiltered);
  }

  useEffect(() => {
    setValue(props.value);
    setItems(props.items);
  }, [isOpen]);

  const handleSave = () => {
    props.onChange(value);
    close();
  }

  const style = {
    opacity: 1
  };

  return (
    <Fragment>
      <div onClick={open}>
        <IonItem>
          <IonLabel position="stacked" style={(props.items.length > 0 && !props.disabled) ? style : {}}>
            {props.label} {props.isRequired ? "*" : ""}
          </IonLabel>
          <IonSelect
            style={(props.items.length > 0) ? style : {}}
            placeholder={props.placeholder}
            value={props.value}
            multiple={props.multiple}
            disabled
          >
            {props.items.map((i) => (
              <IonSelectOption key={i.key} value={i.key}>
                {i.value}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <Error error={props.error}></Error>
      </div>
      <IonModal isOpen={isOpen}>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle color="primary">{props.label}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={close}>
                Cancelar
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonToolbar>
            <IonSearchbar
              placeholder={`Buscar ${props.label}`}
              value={searchText}
              onIonChange={(e) => handleSearchItem(e.detail.value!)}
            ></IonSearchbar>
          </IonToolbar>
          <IonGrid>
            <IonRow>
              <IonRadioGroup value={value}
                onIonChange={e => setValue(e.detail.value)}
              >
                {
                  items && items.length > 0 ?
                    (items.map(i =>
                      <IonRow key={i.key}>
                        <IonItem lines="none">
                          <IonLabel>{i.value}</IonLabel>
                          <IonRadio slot="start" value={i.key} className="radioTasks" />
                        </IonItem>
                      </IonRow>
                    )
                    ) : "No existen coincidencias"
                }
              </IonRadioGroup>
            </IonRow>
          </IonGrid>
        </IonContent>
        <IonFooter>
          <IonRow>
            <IonCol>
              <IonButton
                className="btnTasksNext" expand="block" onClick={handleSave}>
                Guardar
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton className="btnTasksCancel" expand="block" color="light" onClick={close}>
                Cancelar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonFooter>
      </IonModal>
    </Fragment>
  );
};

export default SearchableSelect;