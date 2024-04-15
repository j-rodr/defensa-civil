import { View, Image, StyleSheet, Pressable } from 'react-native';
import HamburgerMenuIcon from './icons/HamburgerMenuIcon';

export default function Header({ showNavbar }) {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 215, height: 47.36 }}
        source={require('../assets/images/logo-defensa-civil.png')}
      />
      <Pressable
        onPress={() => showNavbar(true)}
        style={{
          borderWidth: 0.5,
          padding: 12,
          borderRadius: 8,
          borderColor: '#E3E3E3',
        }}
      >
        <HamburgerMenuIcon />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingLeft: 17,
    paddingRight: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
