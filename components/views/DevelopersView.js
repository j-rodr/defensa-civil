import { View, Text, Image } from 'react-native';
import { COLORS } from '../../utils/theme';

export default function DevelopersView() {
  return (
    <View
      style={{
        paddingHorizontal: 26,
        paddingVertical: 15,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: COLORS.BLUE,
          textAlign: 'center',
        }}
      >
        Acerca de
      </Text>
      <View style={{ paddingTop: 20, alignItems: 'center' }}>
        <Image
          style={{ width: 200, height: 200, borderRadius: 200 }}
          source={require('../../assets/images/profile-pic.jpg')}
        />
        <View style={{ gap: 16, paddingTop: 28 }}>
          <View style={{ gap: 5, alignItems: 'center' }}>
            <Text
              style={{
                color: COLORS.ORANGE,
                fontSize: 17,
                fontWeight: 'bold',
              }}
            >
              José G. Rodríguez B.
            </Text>
            <Text
              style={{
                color: '#4E4E4E',
                fontSize: 17,
                lineHeight: 22,
              }}
            >
              UI Designer & Front-End Developer
            </Text>
          </View>

          <View style={{ gap: 5, alignItems: 'center' }}>
            <Text
              style={{
                color: COLORS.ORANGE,
                fontSize: 17,
                fontWeight: 'bold',
              }}
            >
              LinkedIn
            </Text>
            <Text
              style={{
                color: '#4E4E4E',
                fontSize: 17,
                lineHeight: 22,
              }}
            >
              https://www.linkedin.com/in/jogarobi/
            </Text>
          </View>

          <View style={{ gap: 5, alignItems: 'center' }}>
            <Text
              style={{
                color: COLORS.ORANGE,
                fontSize: 17,
                fontWeight: 'bold',
              }}
            >
              Contacto
            </Text>
            <Text
              style={{
                color: '#4E4E4E',
                fontSize: 17,
                lineHeight: 22,
              }}
            >
              (849) 458-2727
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
