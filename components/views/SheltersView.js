import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../utils/theme';
import { API_URL } from '../../utils/constants';
import { useEffect, useState } from 'react';
import DropdownTile from '../DropdownTile';
import MapView, { Marker } from 'react-native-maps';

export default function SheltersView() {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [mapIsVisible, setMapIsVisible] = useState(false);

  const handleFilter = (shelterItem) => {
    return (
      String(shelterItem.edificio)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(shelterItem.ciudad).toLowerCase().includes(search.toLowerCase()) ||
      String(shelterItem.codigo).toLowerCase().includes(search.toLowerCase()) ||
      String(shelterItem.coordinador)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(shelterItem.capacidad).toLowerCase().includes(search.toLowerCase())
    );
  };

  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/albergues.php`)
      .then((response) => response.json())
      .then((data) => setShelters(data.datos))
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 26,
        paddingVertical: 15,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text
            style={{ fontSize: 21, fontWeight: 'bold', color: COLORS.BLUE }}
          >
            Albergues
          </Text>
          <Text style={{ fontSize: 17, color: '#4E4E4E', marginTop: 2 }}>
            {shelters.length > 0 && `${shelters.length} en total`}
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
          {shelters.map((shelter) => {
            return (
              <Marker
                key={shelter.codigo}
                coordinate={{
                  latitude: parseFloat(shelter.lng),
                  longitude: parseFloat(shelter.lat),
                }}
                title={shelter.edificio}
                description={shelter.ciudad}
              />
            );
          })}
        </MapView>
      )}
      <TextInput
        placeholder='Buscar albergue'
        style={{
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: '#E3E3E3',
          paddingHorizontal: 18,
          paddingVertical: 16,
          fontSize: 17,
          marginTop: 22,
        }}
        onChangeText={(text) => setSearch(text)}
      />
      <Text
        style={{
          fontSize: 16,
          lineHeight: 23,
          paddingTop: 12,
          color: '#ACACAC',
        }}
      >
        Puedes buscar el albergue por código, edificio, ciudad, coordinador o
        capacidad.
      </Text>
      <View style={{ paddingVertical: 10, marginTop: 14, gap: 18 }}>
        {loading ? (
          <View style={{ paddingVertical: 10 }}>
            <ActivityIndicator size='large' color={COLORS.BLUE} />
          </View>
        ) : (
          shelters.filter(handleFilter).map((shelter) => {
            return (
              <DropdownTile
                key={shelter.codigo}
                icon={'🏠'}
                title={`${shelter.edificio}, ${shelter.ciudad}`}
              >
                <View style={{ paddingHorizontal: 10, paddingVertical: 14 }}>
                  <Text
                    style={{
                      color: COLORS.WHITE,
                      fontSize: 14,
                      marginBottom: 6,
                      marginTop: 8,
                      backgroundColor: COLORS.ORANGE,
                      alignSelf: 'flex-start',
                      borderRadius: 40,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      fontWeight: 'bold',
                    }}
                  >
                    {shelter.codigo}
                  </Text>
                  <View style={{ marginTop: 10, gap: 8 }}>
                    <Text style={{ fontSize: 16, color: '#4E4E4E' }}>
                      Latitud: {shelter.lat}, longitud: {shelter.lng}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#4E4E4E' }}>
                      Coordinado por {shelter.coordinador}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#4E4E4E' }}>
                      Capacidad de {shelter.capacidad}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#4E4E4E' }}>
                      Tel.: {shelter.telefono}
                    </Text>
                  </View>
                </View>
              </DropdownTile>
            );
          })
        )}
      </View>
    </View>
  );
}
