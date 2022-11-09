import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const ContainerHome = styled.View`
  flex: 1;
  background-color: #010A12;
  padding-top:60px
`;

export const styles = StyleSheet.create({
  textInput:{
    width:'100%',
    padding:10,
    height:50,
    backgroundColor: 'white',
    borderRadius:20,
    textAlign: 'center',
    marginBottom:30
  },
  text:{
    backgroundColor: 'white',
    borderRadius: 200,
    padding: 6,
    width: 45,
    marginBottom:20,

  },
  create:{
    width:200,
  }
});
