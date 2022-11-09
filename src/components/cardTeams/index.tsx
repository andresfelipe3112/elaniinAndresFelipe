import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Hooks} from '../../hooks/Hooks';
import {PressStart2P} from '../../Utils/fonts';

export const CardTeams = (items: any) => {
  const {Remove} = Hooks();
  return (
    <View style={styles.general}>
      <View style={styles.container_title}>
        <View style={styles.containerDescription}>
          <Text style={[styles.title]}>Equipo : {items.name}</Text>
          <Text style={[styles.title]}>Número : {items.id}</Text>
        </View>
        <TouchableOpacity
          onPress={() => Remove(items.id)}
          style={styles.button}>
          <Text
            style={{color: 'black', fontFamily: PressStart2P, fontSize: 10}}>
            Delete team
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{width: '100%'}} horizontal>
        {items?.pokemon?.map((item: any, index: number) => {
          console.log('index', item);

          return (
            <View key={item.id} style={styles.generalcontent}>
              <View
                style={[styles.container, {backgroundColor: item.color.name}]}>
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
                  }}
                  style={styles.container}></Image>
              </View>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: 10,
                    marginTop: -4,
                    textAlign: 'center',
                    fontFamily: PressStart2P,
                  },
                ]}>
                {item.name}
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: 6,
                    marginTop: -4,
                    textAlign: 'center',
                    fontFamily: PressStart2P,
                  },
                ]}>
                {item.generation.name}
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: 6,
                    marginTop: -4,
                    textAlign: 'center',
                    fontFamily: PressStart2P,
                  },
                ]}>
                {item.base_happiness}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 130,
    margin: 2,
    borderRadius: 20,
  },
  container_title: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  title: {
    fontSize: 10,
    color: 'white',
    padding: 4,
    marginTop: 10,
    fontFamily: PressStart2P,
  },
  containerDescription: {
    display: 'flex',
  },
  button: {
    backgroundColor: 'red',
    width: '35%',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    margin: 5,
  },
  titleScreen: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  generalcontent: {
    display: 'flex',
    flexDirection: 'column',
    width: 110,
    height: 180,
  },
  general: {
    backgroundColor: 'rgba(84, 84, 252, 0.3)',
    marginVertical: 5,
    borderRadius: 15,
  },
});
