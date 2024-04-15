import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import { COLORS } from '../../utils/theme';
import { API_URL } from '../../utils/constants';
import { useEffect, useState } from 'react';
import DropdownTile from '../DropdownTile';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';

export default function SituationView() {
  const [mapIsVisible, setMapIsVisible] = useState(false);
  const [situations, setSituations] = useState([]);
  const [session, setSession] = useState({ name: '', email: '', token: '' });
  const [situationFormData, setSituationFormData] = useState({
    titulo: '',
    descripcion: '',
    foto: '',
    latitud: '',
    longitud: '',
  });
  const [locationPermission, setLocationPermission] = useState(false);
  const [loadingSituationSubmission, setLoadingSituationSubmission] =
    useState(false);
  const [loadingSituations, setLoadingSituations] = useState(false);
  const [requiredError, setRequiredError] = useState();

  const handleSituationSubmission = () => {
    if (!locationPermission) {
      alert('Debe conceder los permisos para obtener la ubicación.');
      return;
    }

    if (requiredError) {
      return;
    }

    setLoadingSituationSubmission(true);

    const situationFormDataObject = new FormData();

    for (const key in situationFormData) {
      situationFormDataObject.append(key, situationFormData[key]);
    }

    situationFormDataObject.append('token', session.token);

    fetch(`${API_URL}/nueva_situacion.php`, {
      method: 'POST',
      body: situationFormDataObject,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exito) {
          setSituationFormData({
            titulo: '',
            descripcion: '',
            foto: '',
            latitud: '',
            longitud: '',
          });
          alert('Situación reportada correctamente.');
        } else {
          alert(`Ha ocurrido un error: ${data.mensaje}`);
        }
      })
      .catch((error) => alert(`Ha ocurrido un error: ${error}`))
      .finally(() => setLoadingSituationSubmission(false));
  };

  useEffect(() => {
    const allSituationFieldsAreFilled = Object.values(situationFormData).every(
      (field) => String(field).length > 0
    );

    if (!allSituationFieldsAreFilled) {
      setRequiredError('Debe llenar todos los campos.');
    } else {
      setRequiredError(null);
    }
  }, [situationFormData]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationPermission(false);
        alert('Debe conceder los permisos para obtener la ubicación.');
        return;
      }

      setLocationPermission(true);

      let location = await Location.getCurrentPositionAsync({});

      setSituationFormData((prev) => ({
        ...prev,
        latitud: location.coords.latitude,
        longitud: location.coords.longitude,
      }));

      const value = await AsyncStorage.getItem('session');

      if (value) {
        const tokenFormDataObject = new FormData();

        tokenFormDataObject.append('token', JSON.parse(value).token);

        setLoadingSituations(true);

        fetch(`${API_URL}/situaciones.php`, {
          method: 'POST',
          body: tokenFormDataObject,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.exito) {
              setSituations(data.datos);
            } else {
              alert(`Ha ocurrido un error: ${data.mensaje}`);
            }
          })
          .catch((error) => alert(`Ha ocurrido un error: ${error}`))
          .finally(() => setLoadingSituations(false));
      }
    })();

    const getSession = async () => {
      try {
        const value = await AsyncStorage.getItem('session');
        setSession(value ? JSON.parse(value) : null);
      } catch (error) {
        console.log(error);
      }
    };

    getSession();
  }, []);

  const pickImage = async () => {
    setRequiredError(false);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSituationFormData((prev) => ({
        ...prev,
        foto: result.assets[0].base64,
      }));
    }
  };

  const takePicture = async () => {
    setRequiredError(false);

    const cameraPermissions = await ImagePicker.requestCameraPermissionsAsync();

    if (cameraPermissions.status !== 'granted') {
      alert('Debe conceder los permisos para usar la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ base64: true });

    if (!result.canceled) {
      setSituationFormData((prev) => ({
        ...prev,
        foto: result.assets[0].base64,
      }));
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 26,
        paddingVertical: 15,
      }}
    >
      <DropdownTile icon='🚨' title='Nueva situación'>
        <View
          style={{
            paddingTop: 26,
            paddingBottom: 14,
            gap: 20,
            paddingHorizontal: 10,
          }}
        >
          {loadingSituationSubmission ? (
            <View style={{ paddingVertical: 10 }}>
              <ActivityIndicator size='large' color={COLORS.BLUE} />
            </View>
          ) : (
            <>
              <View>
                <Text
                  style={{
                    color: COLORS.BLUE,
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}
                >
                  Título
                </Text>
                <TextInput
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 10,
                    borderColor: '#E3E3E3',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    fontSize: 17,
                  }}
                  onChangeText={(text) => {
                    setRequiredError(null);
                    setSituationFormData((prev) => ({
                      ...prev,
                      titulo: text,
                    }));
                  }}
                  value={situationFormData.titulo}
                />
              </View>

              <View>
                <Text
                  style={{
                    color: COLORS.BLUE,
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}
                >
                  Descripción
                </Text>
                <TextInput
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 10,
                    borderColor: '#E3E3E3',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    fontSize: 17,
                  }}
                  onChangeText={(text) => {
                    setRequiredError(null);
                    setSituationFormData((prev) => ({
                      ...prev,
                      descripcion: text,
                    }));
                  }}
                  value={situationFormData.descripcion}
                />
              </View>

              <View>
                <Text
                  style={{
                    color: COLORS.BLUE,
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}
                >
                  Foto
                </Text>
                {situationFormData.foto && (
                  <View>
                    <Text
                      style={{
                        color: '#4E4E4E',
                        fontSize: 16,
                        lineHeight: 22,
                        marginBottom: 20,
                      }}
                    >
                      Foto cargada:
                    </Text>
                    <Image
                      style={{
                        width: 150,
                        height: 150,
                        marginBottom: 22,
                      }}
                      source={{
                        uri: `data:image/png;base64,${situationFormData.foto}`,
                      }}
                    />
                  </View>
                )}
                <View style={{ flexDirection: 'row', gap: 16 }}>
                  <Pressable onPress={pickImage}>
                    <Text
                      style={{
                        backgroundColor: '#F4F4F4',
                        color: COLORS.BLUE,
                        fontSize: 18,
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                        textAlign: 'center',
                        borderRadius: 10,
                        width: 'auto',
                      }}
                    >
                      Galería
                    </Text>
                  </Pressable>

                  <Pressable onPress={takePicture}>
                    <Text
                      style={{
                        backgroundColor: '#F4F4F4',
                        color: COLORS.BLUE,
                        fontSize: 18,
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                        textAlign: 'center',
                        borderRadius: 10,
                        width: 'auto',
                      }}
                    >
                      Nueva foto
                    </Text>
                  </Pressable>
                </View>

                {requiredError && (
                  <Text
                    style={{
                      color: COLORS.RED,
                      fontSize: 17,
                      fontWeight: 'bold',
                      marginTop: 24,
                    }}
                  >
                    {requiredError}
                  </Text>
                )}

                <Pressable onPress={handleSituationSubmission}>
                  <Text
                    style={{
                      backgroundColor: COLORS.BLUE,
                      color: COLORS.WHITE,
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 8,
                      fontSize: 18,
                      textAlign: 'center',
                      marginTop: 27,
                    }}
                  >
                    Guardar reporte
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </DropdownTile>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <View>
          <Text
            style={{ fontSize: 21, fontWeight: 'bold', color: COLORS.BLUE }}
          >
            Situaciones
          </Text>
          <Text style={{ fontSize: 17, color: '#4E4E4E', marginTop: 2 }}>
            {situations.length > 0 && `${situations.length} en total`}
          </Text>
        </View>

        <Pressable onPress={() => setMapIsVisible((prev) => !prev)}>
          <Text
            style={{
              backgroundColor: COLORS.BLUE,
              color: COLORS.WHITE,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 8,
              fontSize: 16,
            }}
          >
            {mapIsVisible ? 'Ocultar mapa' : 'Ver mapa'}
          </Text>
        </Pressable>
      </View>

      {mapIsVisible && (
        <MapView
          style={{
            width: '100%',
            height: 550,
            marginTop: 24,
            marginBottom: 14,
          }}
        >
          {situations.map((situation) => {
            return (
              <Marker
                key={situation.id}
                coordinate={{
                  latitude: parseFloat(situation.latitud),
                  longitude: parseFloat(situation.longitud),
                }}
                title={situation.descripcion}
              />
            );
          })}
        </MapView>
      )}

      <View style={{ gap: 20, paddingVertical: 24 }}>
        {loadingSituations ? (
          <View style={{ paddingVertical: 10 }}>
            <ActivityIndicator size='large' color={COLORS.BLUE} />
          </View>
        ) : (
          situations.map((situation) => {
            return (
              <DropdownTile
                icon='📄'
                title={situation.titulo}
                key={situation.id}
              >
                <View style={{ paddingHorizontal: 10, paddingTop: 12 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.WHITE,
                        fontSize: 14,
                        marginBottom: 10,
                        marginTop: 16,
                        backgroundColor: COLORS.BLUE,
                        alignSelf: 'flex-start',
                        borderRadius: 40,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        fontWeight: 'bold',
                      }}
                    >
                      {situation.id}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.WHITE,
                        fontSize: 14,
                        marginBottom: 10,
                        marginTop: 16,
                        backgroundColor: COLORS.ORANGE,
                        alignSelf: 'flex-start',
                        borderRadius: 40,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        fontWeight: 'bold',
                      }}
                    >
                      {situation.estado.charAt(0).toUpperCase() +
                        situation.estado.slice(1)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#4E4E4E',
                      fontSize: 16,
                      lineHeight: 22,
                    }}
                  >
                    {situation.descripcion}
                  </Text>
                  <Text
                    style={{
                      color: '#4E4E4E',
                      fontSize: 16,
                      lineHeight: 22,
                      marginTop: 10,
                    }}
                  >
                    Fecha: {situation.fecha}
                  </Text>
                  <Image
                    style={{ width: 200, height: 200, marginVertical: 15 }}
                    source={{ uri: `data:image/png;base64,${situation.foto}` }}
                  />
                </View>
              </DropdownTile>
            );
          })
        )}
      </View>
    </View>
  );
}
