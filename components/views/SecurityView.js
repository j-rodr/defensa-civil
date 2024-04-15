import { View, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../../utils/theme';
import { API_URL } from '../../utils/constants';
import { useEffect, useState } from 'react';

export default function SecurityView() {
  const [precautions, setPrecautions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/medidas_preventivas.php`)
      .then((response) => response.json())
      .then((data) => setPrecautions(data.datos))
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
        Medidas preventivas {`(${precautions.length})`}
      </Text>
      <View style={{ paddingVertical: 20, gap: 25 }}>
        {loading ? (
          <View style={{ paddingVertical: 20 }}>
            <ActivityIndicator size='large' color={COLORS.BLUE} />
          </View>
        ) : (
          precautions.map((precaution) => {
            return (
              <View key={precaution.id}>
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
                    {precaution.titulo}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#4E4E4E',
                    fontSize: 15,
                    lineHeight: 22,
                  }}
                >
                  {precaution.descripcion}
                </Text>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}
