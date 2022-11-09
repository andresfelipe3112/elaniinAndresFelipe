import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { RootPokemon } from '../components/CardPokemon';
import Home from '../screens/Home';
import { MyTeams } from '../screens/MyTeams';
import Pokemons from '../screens/Pokemons';

export type RootStackParamListHome = {
  Home: undefined;
  Pokemons:undefined;
  CardPokemon:RootPokemon
  MyTeams: RootPokemon;
};

const Stack = createNativeStackNavigator<RootStackParamListHome>();

const AuthHome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pokemons" component={Pokemons} />
      <Stack.Screen name="MyTeams" component={MyTeams} />
    </Stack.Navigator>
  );
};

export default AuthHome;
