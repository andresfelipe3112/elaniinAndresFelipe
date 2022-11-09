import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import { PressStart2P } from '../../Utils/fonts';

export const ContainerHome = styled.View`
  flex: 1;
  background-color: #010A12;
  display:flex;
  justify-content: center;

`;

export const styles = StyleSheet.create({
  textTitle: {
    alignSelf: 'center',
    color: 'white',
    paddingTop: 30,
    marginBottom: -20,

  },
  card: {
    width: '40%',
    height: 100,
    margin: 5,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    width: '35%',
    height: 30,
    backgroundColor: 'red',
    borderRadius: 10,
    color: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
  },
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 15,
    paddingBottom: 60,
    backgroundColor: '#000',
    borderTopStartRadius:50,
    borderTopEndRadius:50,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 400,
  },
  styleView: {
    marginTop: 60,
    width: 300,
    height: 300,
    alignSelf: 'center',
    backgroundColor: 'red',
    fontFamily: PressStart2P,
    borderRadius: 500,
  },
  styleViewTop: {
    marginTop: 60,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 2,
  },
  linear: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imageGifA: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 60,
    left: -15,
  },
  imageGifB: {
    width: 180,
    height: 150,
    position: 'absolute',
    bottom: 90,
    right: -50,
  },
});
