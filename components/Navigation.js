import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../utils/theme';
import XIcon from './icons/XIcon';
import Footer from './Footer';
import ExitIcon from './icons/ExitIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navigation({
  navigateTo,
  showNavbar,
  tabs,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const handleNavigation = (path) => {
    navigateTo(path);
    showNavbar(false);
  };

  if (!isLoggedIn) {
    delete tabs.specificNews;
    delete tabs.situations;
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('session');
      setIsLoggedIn(false);
      alert('Sesión cerrada de manera exitosa.');
      navigateTo('home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={{
        position: 'absolute',
        flex: 1,
        backgroundColor: COLORS.WHITE,
        height: '100%',
        width: '100%',
      }}
    >
      <View
        style={{
          paddingHorizontal: 30,
          paddingVertical: 25,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 0.5,
          borderBottomColor: '#E3E3E3',
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: COLORS.TEXT_BASE,
          }}
        >
          Menú
        </Text>
        <Pressable onPress={() => showNavbar(false)}>
          <XIcon strokeColor={COLORS.TEXT_BASE} />
        </Pressable>
      </View>
      <View>
        {Object.entries(tabs).map(([prop, value], index) => {
          return (
            <Pressable
              onPress={() => handleNavigation(prop)}
              style={styles.navItem}
              key={index}
            >
              {value.icon}
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: value.isActive ? 'bold' : 'normal',
                  color: value.isActive ? COLORS.ORANGE : COLORS.INACTIVE,
                }}
              >
                {value.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {isLoggedIn && (
        <Pressable
          style={{
            ...styles.navItem,
            borderBottomWidth: 0,
          }}
          onPress={handleLogout}
        >
          <ExitIcon strokeWidth={2.2} strokeColor={COLORS.RED} />
          <Text
            style={{
              fontSize: 19,
              color: COLORS.RED,
            }}
          >
            Cerrar sesión
          </Text>
        </Pressable>
      )}
      <View style={{ marginTop: 'auto' }}>
        <Footer />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  navItem: {
    paddingHorizontal: 30,
    paddingVertical: 22,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E3E3E3',
  },
  navItemText: {
    marginLeft: 10,
  },
});
