import React, {useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import { PressStart2P } from '../../Utils/fonts';

export const Button = (props: {handleClick?:any,title?: string; backgroundColor?: string}) => {
  const {title, backgroundColor,handleClick} = {...props};
  return (
    <TouchableOpacity
    onPress={handleClick}
      style={{
        backgroundColor: backgroundColor,
        width: '100%',
        height: 150,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...props,
      }}>
      <Text style={{color: 'white', fontSize: 20, paddingHorizontal:60, textAlign: 'center', fontFamily: PressStart2P}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
