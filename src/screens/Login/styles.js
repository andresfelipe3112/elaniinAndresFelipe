import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import { PressStart2P } from '../../Utils/fonts';

export const ContainerLogin = styled.View`
  flex: 1;
  background-color: #010A12;
`;

export const styles = StyleSheet.create({
  purpleBox: {
    width: '90%',
    height: 250,
    borderRadius: 20,
    alignSelf: 'center',
  },
  pokemonA: {
    width: '60%',
    height: 180,
    borderRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
    top: 180,
    left: -50,
  },
  pokemonB: {
    width: '100%',
    height: 500,
    borderRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: -40,
  },
  containerBottom: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(236, 221, 255, 0.2)',
    borderRadius: 20,
    marginBottom:20
  },
  textSesion: {
    alignSelf: 'center',
    color: 'white',
    marginBottom: 10,
    fontSize: 13,
    fontFamily: PressStart2P
  },
  google: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: PressStart2P
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
