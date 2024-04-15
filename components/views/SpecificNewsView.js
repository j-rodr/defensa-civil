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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SpecificNewsView() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const value = await AsyncStorage.getItem('session');

        if (value) {
          const tokenFormDataObject = new FormData();

          tokenFormDataObject.append('token', JSON.parse(value).token);

          fetch(`${API_URL}/noticias_especificas.php`, {
            method: 'POST',
            body: tokenFormDataObject,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.exito) {
                setNews(data.datos);
              } else {
                alert(`Ha ocurrido un error: ${data.mensaje}`);
              }
            })
            .catch((error) => {
              alert(`Ha ocurrido un error: ${error}`);
            })
            .finally(() => {
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      }
    };

    fetchNews();
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 26,
        paddingVertical: 15,
      }}
    >
      <Text style={{ fontSize: 21, fontWeight: 'bold', color: COLORS.BLUE }}>
        Noticias específicas {`(${news.length})`}
      </Text>
      <View style={{ paddingVertical: 30, gap: 36 }}>
        {loading ? (
          <View style={{ paddingVertical: 10 }}>
            <ActivityIndicator size='large' color={COLORS.BLUE} />
          </View>
        ) : (
          news.map((newsItem) => {
            return (
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#E3E3E3',
                  paddingBottom: 18,
                }}
                key={newsItem.id}
              >
                <Text
                  style={{
                    color: COLORS.WHITE,
                    fontSize: 14,
                    marginBottom: 9,
                    backgroundColor: COLORS.BLUE,
                    alignSelf: 'flex-start',
                    borderRadius: 40,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    fontWeight: 'bold',
                  }}
                >
                  {newsItem.fecha}
                </Text>
                <Text
                  style={{
                    color: COLORS.ORANGE,
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}
                >
                  {newsItem.titulo}
                </Text>
                <Text
                  style={{
                    color: '#4E4E4E',
                    fontSize: 15,
                    lineHeight: 22,
                  }}
                >
                  {newsItem.contenido}
                </Text>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}
