import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {AuthProps} from '../../redux/Slices/authSlice';
import {RootStackParamListHome} from '../../navigation/authHome';
import {CardPokemon, RootPokemon} from '../../components/CardPokemon';
import {ContainerHome} from '../Pokemons/styles';
import {navigationRef} from '../../navigation/RootNavigation';
import {MiniCard} from '../../components/miniCard';
import {Hooks} from '../../hooks/Hooks';
import {uid} from 'uid';
import {CustomToast} from '../../components/toast/customToast';
import { PressStart2P } from '../../Utils/fonts';

type ScreenProps = NativeStackScreenProps<RootStackParamListHome, 'Pokemons'>;

export const Pokemons: React.FC<ScreenProps> = () => {
  const {pokemons, regionID} = useSelector((state: {auth: AuthProps}) => state.auth);
  const [teamPokemon, setTeamPokemon] = useState<RootPokemon[]>([]);
  const [nameTeam, setNameTeams] = useState<string>('');
  const {writeToDatabase} = Hooks();
  ;
  const {showToast} = CustomToast();

  const postDataTeams = () => {
    const uuid = uid()
    if (nameTeam === '') {
      showToast('don´t have team´s name');
      return
    }
    if (teamPokemon.length > 2 && teamPokemon.length < 7) {
      writeToDatabase(teamPokemon, nameTeam, uuid, regionID);
      showToast('team created ok');
      setTeamPokemon([]);
      setNameTeams('')
      return;
    }
    showToast('the team must have 3 to 6 pokemons');
  };

  const setTeamPokemonON = (pokemon: any) => {
    let array: RootPokemon[] = [];
    if (teamPokemon.length === 0) {
      array = [...teamPokemon, pokemon];
      setTeamPokemon(array);
    } else {
      teamPokemon.forEach(element => {
        if (element.name !== pokemon.name) {
          setTeamPokemon([...teamPokemon, pokemon]);
        }
      });
    }
  };

  const setTeamPokemonDelete = (pokemon: any) => {
    let array = teamPokemon.filter(item => item.id !== pokemon.id);
    setTeamPokemon(array);
  };

  return (
    <ContainerHome>
      <LinearGradient
        colors={['#010A12', '#330080']}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
      <TouchableOpacity
        onPress={() => navigationRef.goBack()}
        style={styles.text}>
        <Text style={{textAlign: 'center'}}>back</Text>
      </TouchableOpacity>
      <TextInput
        value={nameTeam}
        onChangeText={value => {
          setNameTeams(value);
        }}
        style={styles.textInput}
        placeholder="team`s name"></TextInput>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', alignSelf: 'center', padding: 5, fontFamily: PressStart2P, fontSize:10 }}>
          select your pokemon
        </Text>
        <TouchableOpacity
          onPress={() => postDataTeams()}
          style={{
            width: 150,
            height: 30,
            padding: 5,
            backgroundColor: 'red',
            borderRadius: 15,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 12,
              fontFamily: PressStart2P
            }}>
            create team
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          backgroundColor: 'black',
          width: '100%',
          borderRadius: 20,
          margin: 5,
          paddingBottom: 25,
        }}
        horizontal>
        {teamPokemon.map((pokemon: any, index: number) => (
          <MiniCard
            onClick={setTeamPokemonDelete}
            key={pokemon.name + index.toString()}
            pokemon={pokemon}
          />
        ))}
      </ScrollView>
      <FlatList
        numColumns={2}
        data={pokemons.slice(0,80) || []}
        keyExtractor={items => items.id}
        renderItem={({item}) => (
          <CardPokemon pokemon={item} onClick={setTeamPokemonON} />
        )}
        initialNumToRender={20}
        contentContainerStyle={{
          width: '100%',
          alignItems: 'center',
          paddingTop: 40,
        }}
      />
    </ContainerHome>
  );
};

export default Pokemons;
