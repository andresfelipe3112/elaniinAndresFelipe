import React from 'react';
import {ActivityIndicator, Dimensions, Image, View} from 'react-native';
type LoadingProps = {};

const Loading: React.FC<LoadingProps> = () => {
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          paddingTop: Dimensions.get('window').height * 0.48,
        }}>
        <ActivityIndicator size="large" color="#7844A1" />
      </View>
    </View>
  );
};

export default Loading;
