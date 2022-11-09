import React, {useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {PokeApiPokemonThunk} from '../../redux/thunks/thunksDataPokemon';
import {PressStart2P} from '../../Utils/fonts';

export const CardContainer = (props: {
  onClick?: any;
  title?: string;
  backgroundColor?: string;
  key?: string;
  index: number;
  url: string;
  idRegion: string | number;
}) => {
  const {title, key, index, url, idRegion} = {...props};
  const dispatch = useDispatch<any>();
  return (
    <TouchableOpacity
      key={key}
      onPress={async () => await dispatch(PokeApiPokemonThunk(url, idRegion))}
      style={{
        backgroundColor: index % 3 === 0 ? '#C201BC' : '#FF7407',
        ...props,
      }}>
      <Text style={{color: 'white', fontSize: 15, fontFamily: PressStart2P}}>
        {title?.toLocaleUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

export default CardContainer;
