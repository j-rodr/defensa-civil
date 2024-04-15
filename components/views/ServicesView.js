import { View, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../../utils/theme';
import { API_URL } from '../../utils/constants';
import { useEffect, useState } from 'react';

export default function ServicesView() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/servicios.php`)
      .then((response) => response.json())
      .then((data) => setServices(data.datos))
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
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.BLUE }}>
        Los servicios que ofrecemos {`(${services.length})`}
      </Text>
      <View style={{ paddingVertical: 20, gap: 25 }}>
        {loading ? (
          <View style={{ paddingVertical: 20 }}>
            <ActivityIndicator size='large' color={COLORS.BLUE} />
          </View>
        ) : (
          services.map((service) => {
            return (
              <View key={service.id}>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  <Text
                    style={{
                      color: COLORS.ORANGE,
                      marginHorizontal: 5,
                      fontSize: 13,
                    }}
                  >
                    ⬤
                  </Text>
                  <Text
                    style={{
                      color: COLORS.ORANGE,
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginBottom: 10,
                    }}
                  >
                    {service.nombre}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#4E4E4E',
                    fontSize: 15,
                    lineHeight: 22,
                  }}
                >
                  {service.descripcion}
                </Text>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}
