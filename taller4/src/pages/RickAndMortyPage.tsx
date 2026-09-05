import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSpinner,
  IonText,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";

// Estructura que devuelve la API de Rick and Morty
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

const RickAndMortyPage: React.FC = () => {
  const [personajes, setPersonajes] = useState<Character[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarPersonajes = () => {
    setCargando(true);
    setError("");

    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((datos) => {
        // La API de Rick and Morty guarda el arreglo dentro de la propiedad "results"
        setPersonajes(datos.results);
      })
      .catch((err) => {
        console.error(err);
        setError("Ocurrió un error al cargar los personajes.");
      })
      .finally(() => {
        setCargando(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Wiki Rick & Morty</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton onClick={cargarPersonajes} expand="block" color="success">
          Cargar Personajes
        </IonButton>

        {cargando && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <IonSpinner color="success" />
            <p>Viajando entre dimensiones...</p>
          </div>
        )}

        {error && (
          <IonText color="danger">
            <p style={{ textAlign: "center" }}>{error}</p>
          </IonText>
        )}

        {/* Usamos IonGrid para que las tarjetas se adapten mejor a la pantalla */}
        <IonGrid>
          <IonRow>
            {personajes.map((personaje) => (
              <IonCol size="12" sizeMd="6" sizeLg="4" key={personaje.id}>
                <IonCard>
                  <img src={personaje.image} alt={personaje.name} style={{ width: "100%" }} />
                  <IonCardHeader>
                    <IonCardTitle>{personaje.name}</IonCardTitle>
                    <IonCardSubtitle>{personaje.species} - {personaje.status}</IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RickAndMortyPage;