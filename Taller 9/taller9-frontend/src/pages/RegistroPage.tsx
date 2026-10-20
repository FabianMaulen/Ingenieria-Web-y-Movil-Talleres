import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonRouterLink } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../services/api';

const RegistroPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async () => {
    try {
      setError('');
      await registrarUsuario(username, password);
      // Si el registro es exitoso, enviamos al usuario a iniciar sesión
      navigate('/login'); 
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nuevo Usuario</IonLabel>
          <IonInput value={username} onIonChange={e => setUsername(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña (Mín. 8 caracteres)</IonLabel>
          <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
        </IonItem>

        {error && (
          <IonText color="danger" className="ion-margin-top">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton expand="block" className="ion-margin-top" onClick={handleRegistro}>
          Registrarse
        </IonButton>

        <p className="ion-text-center ion-margin-top">
          ¿Ya tienes cuenta? <IonRouterLink routerLink="/login">Inicia sesión</IonRouterLink>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default RegistroPage;
