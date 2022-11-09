import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootPokemon} from '../CardPokemon';

export const MiniCard = (props: {pokemon: RootPokemon, onClick:(props:RootPokemon)=>void}) => {
  const {pokemon, onClick} = {...props};
  return (
    <View
      key={pokemon.name}
      style={[styles.container, {backgroundColor: pokemon?.color?.name}]}>
      <TouchableOpacity
      onPress={() => onClick(pokemon)}
        style={{
          backgroundColor: 'red',
          width:30,
          height:30,
          marginTop: -10,
          alignSelf: 'flex-end',
          borderRadius:20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          right:-10
        }}>
        <Text
        style={{fontSize:13}}
        >X</Text>
      </TouchableOpacity>
      <Image
        resizeMode="contain"
        style={styles.cardImage}
        source={{
          uri: `https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name}.gif`,
        }}></Image>
      <Text style={styles.text}>{pokemon.name}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: 100,
    padding: 10,
    height: 100,
    borderRadius: 20,
    textAlign: 'center',
    marginBottom: 70,
    marginTop: 15,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  text: {
    opacity: 0.5,
    color: 'white',
    padding: 5,
    backgroundColor: 'black',
    fontSize: 12,
    marginTop: 5,
  },
});
