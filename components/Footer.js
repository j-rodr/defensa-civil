import { View, Text, Image } from 'react-native';

export default function Footer() {
  return (
    <View
      style={{
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 24,
        paddingVertical: 22,
        gap: 5,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ gap: 5 }}>
        <Text style={{ color: '#4E4E4E', fontSize: 16 }}>
          Defensa Civil Dominicana © 2024
        </Text>
        <Text style={{ color: '#4E4E4E', fontSize: 15 }}>
          info@defensacivil.gob.do
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Image
          source={require('../assets/images/escudo-bandera-dominicana.png')}
          style={{ width: 38, height: 38 }}
        />
        <Image
          source={require('../assets/images/isologo-defensa-civil.png')}
          style={{ width: 42, height: 42 }}
        />
      </View>
    </View>
  );
}
