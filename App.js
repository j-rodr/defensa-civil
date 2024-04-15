import { StyleSheet, ScrollView, View } from 'react-native';
import HomeView from './components/views/HomeView';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import { useEffect, useState } from 'react';
import ServicesView from './components/views/ServicesView';
import HomeIcon from './components/icons/HomeIcon';
import ServicesIcon from './components/icons/ServicesIcon';
import AboutView from './components/views/AboutView';
import AboutIcon from './components/icons/AboutIcon';
import SheltersView from './components/views/SheltersView';
import MarkerIcon from './components/icons/MarkerIcon';
import SecurityView from './components/views/SecurityView';
import ShieldIcon from './components/icons/ShieldIcon';
import VolunteersView from './components/views/VolunteersView';
import PersonIcon from './components/icons/PersonIcon';
import SpecificNewsView from './components/views/SpecificNewsView';
import DocIcon from './components/icons/DocIcon';
import SituationView from './components/views/SituationsView';
import FolderIcon from './components/icons/FolderIcon';
import DevelopersView from './components/views/DevelopersView';
import BriefcaseIcon from './components/icons/BriefcaseIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [navIsVisible, setNavIsVisible] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateTo = (view) => {
    setActiveView(view);
    setNavIsVisible(false);
  };

  const showNavbar = (visible) => {
    setNavIsVisible(visible);
  };

  const setLogin = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  const isActive = (view) => activeView === view;

  useEffect(() => {
    const getSession = async () => {
      try {
        const value = await AsyncStorage.getItem('session');
        setIsLoggedIn(value ? true : false);
      } catch (error) {
        console.log(error);
      }
    };

    getSession();
  }, [activeView]);

  const TABS = {
    home: {
      view: <HomeView />,
      label: 'Inicio',
      icon: <HomeIcon isActive={isActive('home')} />,
      isActive: isActive('home'),
    },
    volunteers: {
      view: (
        <VolunteersView
          navigateTo={navigateTo}
          setLogin={setLogin}
          isLoggedIn={isLoggedIn}
        />
      ),
      label: 'Cuenta',
      icon: <PersonIcon isActive={isActive('volunteers')} />,
      isActive: isActive('volunteers'),
    },
    services: {
      view: <ServicesView />,
      label: 'Servicios',
      icon: <ServicesIcon isActive={isActive('services')} />,
      isActive: isActive('services'),
    },
    about: {
      view: <AboutView />,
      label: 'Nosotros',
      icon: <AboutIcon isActive={isActive('about')} />,
      isActive: isActive('about'),
    },
    shelters: {
      view: <SheltersView />,
      label: 'Albergues',
      icon: <MarkerIcon isActive={isActive('shelters')} />,
      isActive: isActive('shelters'),
    },
    security: {
      view: <SecurityView />,
      label: 'Medidas preventivas',
      icon: <ShieldIcon isActive={isActive('security')} />,
      isActive: isActive('security'),
    },
    specificNews: {
      view: <SpecificNewsView />,
      label: 'Noticias específicas',
      icon: <DocIcon isActive={isActive('specificNews')} />,
      isActive: isActive('specificNews'),
    },
    situations: {
      view: <SituationView />,
      label: 'Situaciones',
      icon: <FolderIcon isActive={isActive('situations')} />,
      isActive: isActive('situations'),
    },
    developers: {
      view: <DevelopersView />,
      label: 'Acerca de',
      icon: <BriefcaseIcon isActive={isActive('developers')} />,
      isActive: isActive('developers'),
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Header showNavbar={showNavbar} />
        {TABS[activeView].view}
        <Footer />
      </ScrollView>
      {navIsVisible && (
        <Navigation
          navigateTo={navigateTo}
          showNavbar={showNavbar}
          tabs={TABS}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
  },
});
