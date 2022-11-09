import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootPokemon} from '../../components/CardPokemon';
import {CardTeams} from '../../components/cardTeams';
import {navigationRef} from '../../navigation/RootNavigation';
import {AuthProps} from '../../redux/Slices/authSlice';
import {myTeamsThunk} from '../../redux/thunks/thunksDataPokemon';
import { PressStart2P } from '../../Utils/fonts';
import {styles} from '../Pokemons/styles';
import {ContainerMyTeams} from './styles';

export const MyTeams = () => {
  const {MyTeamPokemon} = useSelector((state: {auth: AuthProps}) => state.auth);
  const dispatch = useDispatch<any>();
  const {loading} = useSelector((state: {auth: AuthProps}) => state.auth);
  console.log(MyTeamPokemon);
  
  useEffect(() => {
    console.log('otra');
    dispatch(myTeamsThunk());
  }, []);

  return (
    <ContainerMyTeams>
      <TouchableOpacity
        onPress={() => navigationRef.goBack()}
        style={styles.text}>
        <Text style={{textAlign: 'center'}}>back</Text>
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'center',
          color: 'white',
    
          fontSize: 20,
          marginBottom:15,
          fontFamily: PressStart2P
        }}>
        My teams
      </Text>
      <ScrollView>
        {MyTeamPokemon !== null && MyTeamPokemon.length > 0 &&
          MyTeamPokemon.map((teams: RootPokemon, index:number) => {
            if (teams !== null) {
              return <CardTeams key={index} {...teams} />;
            }
          })}
      </ScrollView>
      {loading && <ActivityIndicator size="large" />}
    </ContainerMyTeams>
  );
};
