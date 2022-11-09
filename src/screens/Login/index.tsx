import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  Animated,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useAnimation} from '../../hooks/useAnimation';
import {RootStackParamList} from '../../navigation/welcome';
import {ContainerLogin, styles} from './styles';
import {useSelector} from 'react-redux';
import {AuthProps} from '../../redux/Slices/authSlice';
import { Hooks } from '../../hooks/Hooks';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const Login: React.FC<LoginScreenProps> = () => {
  const {opacity, position, startMovingPosition, fadeIn, fadeOut} =
    useAnimation();
  const {signGoogle} = Hooks();
  const {loading} = useSelector((state: {auth: AuthProps}) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      fadeIn();
      startMovingPosition(0, 3000, 60);
    }, 500);
  }, []);

  return (
    <ContainerLogin>
      <LinearGradient
        colors={['#010A12', '#330080']}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
      <Animated.View
        style={{
          ...styles.purpleBox,
          opacity,
          transform: [
            {
              translateY: position,
            },
          ],
        }}>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={require('../../../assets/Pokemon_GO.png')}></Image>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.pokemonA,
          opacity,
          transform: [
            {
              translateY: position,
            },
          ],
        }}>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={require('../../../assets/Pokemon2.png')}></Image>
      </Animated.View>

      <Animated.View
        style={{
          ...styles.pokemonB,
          opacity,
          transform: [
            {
              translateY: position,
            },
          ],
        }}>
        <Text style={styles.textSesion}>Iniciar sesión</Text>
        <TouchableOpacity
          disabled={loading}
          onPress={() => signGoogle()}
          style={styles.containerBottom}>
          <Text style={styles.google}>GOOGLE</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large"></ActivityIndicator>}
        <Image
          resizeMode="contain"
          style={[styles.img, {marginTop: -20}]}
          source={require('../../../assets/pikachu.png')}></Image>
      </Animated.View>
    </ContainerLogin>
  );
};

export default Login;
