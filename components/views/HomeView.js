import { SafeAreaView, Text, View, StyleSheet, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { COLORS } from '../../utils/theme';
import { useEffect, useRef, useState } from 'react';

export default function HomeView() {
  const sliderRef = useRef();
  const [sliderPage, setSliderPage] = useState(0);
  const [amountOfPages, setAmountOfPages] = useState(0);

  useEffect(() => {
    const amountOfPages = sliderRef.current?.props.children.length;
    setAmountOfPages(amountOfPages);

    const interval = setInterval(() => {
      setSliderPage((prev) => (prev + 1) % amountOfPages);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    sliderRef.current?.setPage(sliderPage);
  }, [sliderPage]);

  return (
    <SafeAreaView style={styles.sliderContainer}>
      <PagerView
        style={styles.slider}
        initialPage={0}
        ref={sliderRef}
        onPageSelected={(e) => {
          setSliderPage(e.nativeEvent.position);
        }}
      >
        <View key='1'>
          <Image
            style={styles.sliderImage}
            source={require('../../assets/images/banner-1.jpg')}
          />
        </View>
        <View key='2'>
          <Image
            style={styles.sliderImage}
            source={require('../../assets/images/banner-2.png')}
          />
        </View>
        <View key='3'>
          <Image
            style={styles.sliderImage}
            source={require('../../assets/images/banner-3.png')}
          />
        </View>
        <View key='4'>
          <Image
            style={styles.sliderImage}
            source={require('../../assets/images/banner-4.jpg')}
          />
        </View>
      </PagerView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: 8,
          paddingBottom: 10,
        }}
      >
        {Array.from({ length: amountOfPages }).map((_, index) => (
          <Text
            key={index}
            style={{
              color: sliderPage === index ? COLORS.ORANGE : COLORS.BASE_LIGHT,
              marginHorizontal: 5,
              fontSize: 13,
            }}
          >
            ⬤
          </Text>
        ))}
      </View>
      <View
        style={{
          marginTop: 18,
          gap: 10,
          borderWidth: 0.9,
          padding: 17,
          marginHorizontal: 24,
          borderRadius: 15,
          borderColor: '#E3E3E3',
        }}
      >
        <Text style={{ fontSize: 19, fontWeight: 'bold', color: COLORS.BLUE }}>
          ¿Qué hacemos?
        </Text>
        <Text
          style={{
            color: '#4E4E4E',
            textAlign: 'justify',
            fontSize: 15,
            lineHeight: 22,
          }}
        >
          La Defensa Civil garantiza operativos adecuados para enfrentar
          desastres y mantener el orden, la salud, el bienestar económico, la
          seguridad pública, y proteger la vida y la propiedad.
        </Text>
      </View>
      <View style={{ paddingHorizontal: 24, paddingTop: 30, marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: 'bold',
            color: COLORS.BLUE,
            marginBottom: 22,
          }}
        >
          Historia y logros
        </Text>
        <View
          style={{
            gap: 24,
            position: 'relative',
          }}
        >
          <View
            style={{
              backgroundColor: '#F4F4F4',
              height: '100%',
              left: 25,
              width: 2,
              position: 'absolute',
            }}
          ></View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                backgroundColor: COLORS.ORANGE,
                alignSelf: 'flex-start',
                fontSize: 16,
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 300,
                color: COLORS.WHITE,
                fontWeight: 'bold',
              }}
            >
              1927
            </Text>
            <Text
              style={{
                color: '#4E4E4E',
                textAlign: 'justify',
                fontSize: 15,
                lineHeight: 22,
                width: '82%',
              }}
            >
              Se establece la Cruz Roja Dominicana, la cual incluye actividades
              de socorro y ayuda en casos de desastres naturales.
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                backgroundColor: COLORS.ORANGE,
                alignSelf: 'flex-start',
                fontSize: 16,
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 300,
                color: COLORS.WHITE,
                fontWeight: 'bold',
              }}
            >
              1962
            </Text>
            <Text
              style={{
                color: '#4E4E4E',
                textAlign: 'justify',
                fontSize: 15,
                lineHeight: 22,
                width: '82%',
              }}
            >
              Se funda la Defensa Civil Dominicana (DCD) como una entidad
              gubernamental encargada de la protección civil y la gestión de
              desastres naturales en la República Dominicana.
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                backgroundColor: COLORS.ORANGE,
                alignSelf: 'flex-start',
                fontSize: 16,
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 300,
                color: COLORS.WHITE,
                fontWeight: 'bold',
              }}
            >
              1965
            </Text>
            <Text
              style={{
                color: '#4E4E4E',
                textAlign: 'justify',
                fontSize: 15,
                lineHeight: 22,
                width: '82%',
              }}
            >
              Durante la Guerra Civil Dominicana, la Defensa Civil desempeña un
              papel crucial en la asistencia humanitaria y la protección de la
              población civil.
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                backgroundColor: COLORS.ORANGE,
                alignSelf: 'flex-start',
                fontSize: 16,
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 300,
                color: COLORS.WHITE,
                fontWeight: 'bold',
              }}
            >
              1979
            </Text>
            <Text
              style={{
                color: '#4E4E4E',
                textAlign: 'justify',
                fontSize: 15,
                lineHeight: 22,
                width: '82%',
              }}
            >
              Se promulga la Ley 257 sobre Defensa Civil, que establece el marco
              legal para las actividades de la institución.
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                backgroundColor: COLORS.ORANGE,
                alignSelf: 'flex-start',
                fontSize: 16,
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 300,
                color: COLORS.WHITE,
                fontWeight: 'bold',
              }}
            >
              1988
            </Text>
            <Text
              style={{
                color: '#4E4E4E',
                textAlign: 'justify',
                fontSize: 15,
                lineHeight: 22,
                width: '82%',
              }}
            >
              La Defensa Civil coordina las labores de respuesta y recuperación
              tras el paso del huracán Georges, que dejó graves daños en el
              país.
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                backgroundColor: COLORS.ORANGE,
                alignSelf: 'flex-start',
                fontSize: 16,
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 300,
                color: COLORS.WHITE,
                fontWeight: 'bold',
              }}
            >
              2010
            </Text>
            <Text
              style={{
                color: '#4E4E4E',
                textAlign: 'justify',
                fontSize: 15,
                lineHeight: 22,
                width: '82%',
              }}
            >
              La Defensa Civil Dominicana es reconocida por su labor en la
              respuesta al terremoto de Haití, proporcionando ayuda humanitaria
              y apoyo logístico.
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                backgroundColor: COLORS.ORANGE,
                alignSelf: 'flex-start',
                fontSize: 16,
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 300,
                color: COLORS.WHITE,
                fontWeight: 'bold',
              }}
            >
              2020
            </Text>
            <Text
              style={{
                color: '#4E4E4E',
                textAlign: 'justify',
                fontSize: 15,
                lineHeight: 22,
                width: '82%',
              }}
            >
              La Defensa Civil juega un papel crucial en la respuesta ante la
              pandemia de COVID-19, coordinando acciones de prevención y
              asistencia a la población.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  slider: {
    height: 180,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.BASE,
  },
  sliderImage: {
    flex: 1,
    flexDirection: 'row',
    aspectRatio: 1280 / 520,
  },
});
