import { Text, View ,Alert } from 'react-native';
import Login from '../../components/Login';
import Signup from '@/components/Signup';
import Footer from '../shared/Footer';

export default function Home() {
  return (
    <Footer
        onHomePress={() => Alert.alert('Accueil')}
        onFavoritePress={() => Alert.alert('Favoris')}
        onCartPress={() => Alert.alert('Camera')}
        onProfilePress={() => Alert.alert('Profil')}
      />
  );
}
