import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {RootStackParamListHome} from '../../navigation/authHome';
import LinearGradient from 'react-native-linear-gradient';
import {ContainerHome, styles} from './styles';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/button/button';
import {useAnimation} from '../../hooks/useAnimation';
import CardContainer from '../../components/Card';
import {useDispatch, useSelector} from 'react-redux';
import {myTeamsThunk, PokeApiThunk} from '../../redux/thunks/thunksDataPokemon';
import {AuthProps} from '../../redux/Slices/authSlice';
import {LoginOutThunk} from '../../redux/thunks/thunksLogin';
import { Hooks } from '../../hooks/Hooks';
import { navigationRef } from '../../navigation/RootNavigation';
import { PressStart2P } from '../../Utils/fonts';

type LoginScreenProps = NativeStackScreenProps<RootStackParamListHome, 'Home'>;

export const Home: React.FC<LoginScreenProps> = () => {
  const [regionsData, setRegionsData] = useState<any>([]);
  const {signOutGoogle, firebaseGo} = Hooks();
  const dispatch = useDispatch<any>();
  const {regions, loading} = useSelector(
    (state: {auth: AuthProps}) => state.auth,
  );
  const {
    opacity,
    position,
    startMovingPosition,
    fadeIn,
    startMovingPositionStart,
  } = useAnimation();


  const handleClick = () => {
    startMovingPositionStart(200, 3000, -110);
    fadeIn(3000);
    setRegionsData(regions);
    // firebaseGo()
  };

  useEffect(() => {
    dispatch(PokeApiThunk());
  }, []);

  useEffect(() => {
    startMovingPosition(-400, 3000, -10);
  }, []);

  useEffect(() => {
    // firebaseGo()
    dispatch(myTeamsThunk())
},[])

  return (
    <ContainerHome>
      <LinearGradient colors={['#010A12', '#330080']} style={styles.linear} />
      <Animated.View
        style={{
          transform: [
            {
              translateY: position,
            },
          ],
        }}>
        <Button
          handleClick={handleClick}
          title={
            regionsData.length > 0
              ? 'Select your region'
              : 'Press to create one team'
          }
          {...styles.styleView}
        />
      </Animated.View>
      <Image
        style={styles.imageGifA}
        source={{uri: 'https://media.tenor.com/74l5y1hUdtwAAAAj/pokemon.gif'}}
      />

      {regionsData.length > 0 && (
        <Animated.ScrollView
          style={{
            opacity,
            marginTop: 40,
            marginBottom: Dimensions.get('screen').height * -0.2,
            transform: [
              {
                translateY: position,
              },
            ],
          }}>
          <View style={styles.cardContainer}>
            {regionsData.map((value: any, index: number) => {
              return (
                <CardContainer
                  index={index}
                  key={value.url}
                  url={value.url}
                  idRegion={index + 1}
                  title={value.name}
                  {...styles.card}
                />
              );
            })}
          </View>
        </Animated.ScrollView>
      )}
      <Animated.View style={styles.containerButton}>
        {loading ? (
          <ActivityIndicator size="large" style={{width: '100%'}} />
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                signOutGoogle();
                dispatch(LoginOutThunk());
              }}
              style={styles.touch}>
              <Text style={{color: 'white', fontFamily: PressStart2P}}>Sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => navigationRef.navigate('MyTeams')}
            style={styles.touch}>
              <Text style={{color: 'white', fontFamily: PressStart2P}}>My teams</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
      <Image
        style={styles.imageGifB}
        source={{uri: 'https://i.gifer.com/Q568.gif'}}
      />
    </ContainerHome>
  );
};

export default Home;
