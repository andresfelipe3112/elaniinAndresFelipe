import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {RootStackParamListHome} from '../../navigation/authHome';
import {checkingCredentials} from '../../redux/Slices/authSlice';
import {PressStart2P} from '../../Utils/fonts';

type ScreenProps = NativeStackScreenProps<
  RootStackParamListHome,
  'CardPokemon'
>;

export const CardPokemon: React.FC<any> = (props: {
  pokemon: RootPokemon;
  onClick: (props: RootPokemon) => void;
}) => {
  const {pokemon, onClick} = {...props};
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(checkingCredentials(false));
  }, []);
  return (
    <TouchableOpacity
      onPress={() => onClick(pokemon)}
      style={[styles.containerCard, {backgroundColor: pokemon.color?.name}]}>
      <Text style={styles.name}>{pokemon?.name}</Text>
      <Image
        resizeMode="contain"
        style={styles.Image}
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
        }}></Image>
      <Image
        resizeMode="contain"
        style={styles.cardImage}
        source={{
          uri: `https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name}.gif`,
        }}></Image>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  Image: {
    width: 200,
    height: 200,
  },
  name: {
    width: '80%',
    textAlign: 'center',
    opacity: 0.5,

    color: 'white',
    shadowRadius: 20,
    padding: 5,
    backgroundColor: 'black',
    position: 'absolute',
    top: 150,
    fontFamily: PressStart2P,
    fontSize: 13,
  },
  cardImage: {
    width: 70,
    height: 65,
    position: 'relative',
    top: -200,
    left: -60,
  },
  containerCard: {
    width: '45%',
    height: 200,
    borderRadius: 20,
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface RootPokemon {
  base_happiness?: number;
  capture_rate?: number;
  color?: Color;
  egg_groups?: EggGroup[];
  evolution_chain?: EvolutionChain;
  evolves_from_species?: EvolvesFromSpecies;
  flavor_text_entries?: FlavorTextEntry[];
  form_descriptions?: any[];
  forms_switchable?: boolean;
  gender_rate?: number;
  genera?: Genera[];
  generation?: Generation;
  growth_rate?: GrowthRate;
  habitat?: Habitat;
  has_gender_differences?: boolean;
  hatch_counter?: number;
  id?: number;
  is_baby?: boolean;
  is_legendary?: boolean;
  is_mythical?: boolean;
  name?: string;
  names?: Name[];
  order?: number;
  pal_park_encounters?: PalParkEncounter[];
  pokedex_numbers?: PokedexNumber[];
  shape?: Shape;
  varieties?: Variety[];
}

export interface Color {
  name: string;
  url: string;
}

export interface EggGroup {
  name: string;
  url: string;
}

export interface EvolutionChain {
  url: string;
}

export interface EvolvesFromSpecies {
  name: string;
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
  version: Version;
}

export interface Language {
  name: string;
  url: string;
}

export interface Version {
  name: string;
  url: string;
}

export interface Genera {
  genus: string;
  language: Language2;
}

export interface Language2 {
  name: string;
  url: string;
}

export interface Generation {
  name: string;
  url: string;
}

export interface GrowthRate {
  name: string;
  url: string;
}

export interface Habitat {
  name: string;
  url: string;
}

export interface Name {
  language: Language3;
  name: string;
}

export interface Language3 {
  name: string;
  url: string;
}

export interface PalParkEncounter {
  area: Area;
  base_score: number;
  rate: number;
}

export interface Area {
  name: string;
  url: string;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: Pokedex;
}

export interface Pokedex {
  name: string;
  url: string;
}

export interface Shape {
  name: string;
  url: string;
}

export interface Variety {
  is_default: boolean;
  pokemon: Pokemon;
}

export interface Pokemon {
  name: string;
  url: string;
}
