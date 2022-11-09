import {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {getDatabase} from '@firebase/database';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {LoginThunk} from '../redux/thunks/thunksLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootPokemon} from '../components/CardPokemon';

export const Hooks = () => {
  const dispatch = useDispatch<any>();
  const [DB, setDB] = useState<any>();

  const firebaseGo = async () => {
    const iosConfig = {
      clientId:
        '1093316084763-lauo84toljjcm2trka39lb1spta25iup.apps.googleusercontent.com',
      appId: '1:1093316084763:ios:af7b9482071e192d5fe4be',
      apiKey: 'AIzaSyC9xCUgsfR3PgQ8kLHn7Qwzsa3uhnmf__A',
      authDomain: 'ellaniints-default-rtdb.firebaseio.com',
      databaseURL: 'https://ellaniints-default-rtdb.firebaseio.com',
      storageBucket: 'ellaniints.appspot.com',
      messagingSenderId: '1093316084763',
      projectId: 'ellaniints',
      persistence: true,
    };

    const androidConfig = {
      clientId:
        '1093316084763-s0j4uc0pcpfec00cgru8vq56jk7efmn7.apps.googleusercontent.com',
      appId: '1:1093316084763:android:eb4c7cc8986ea00d5fe4be',
      apiKey: 'AIzaSyCudfBhVKCYxjCarZLHPl9OzpCR9X1jTh4',
      authDomain: 'ellaniints-default-rtdb.firebaseio.com',
      databaseURL: 'https://ellaniints-default-rtdb.firebaseio.com',
      storageBucket: 'ellaniints.appspot.com',
      messagingSenderId: '1093316084763',
      projectId: 'ellaniints',
      persistence: true,
    };
    const app: any = await firebase.initializeApp(
      Platform.OS === 'ios' ? iosConfig : androidConfig,
    );
    const db = getDatabase(app);
    setDB(db);
  };

  const signOutGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo: any = await GoogleSignin.signOut();
    } catch (error) {
      console.log('errores', error);
    }
  };

  const writeToDatabase = async (
    teamPokemon: RootPokemon[],
    nameTeam: string,
    idTeam: string,
    regionID:string | number
  ) => {
    const id = await AsyncStorage.getItem('id');
    const email = await AsyncStorage.getItem('@contactName');
    await database()
      .ref(`/users/${id}`)
      .once('value')
      .then(async snapshot => {
        if (snapshot.val() === null) {
          await database()
            .ref(`/users/${id}`)
            .set({
              id: id?.toString(),
              email: email,
              teams: [
                {
                  name: nameTeam,
                  id: 0,
                  regionID:regionID,
                  pokemon: teamPokemon,
                },
              ],
            })
            .then();
        } else {
          await database()
          .ref(`/users/${id}/teams`)
          .once('value')
          .then( async snapshot => {

            if (snapshot.val() === null) {
              await database()
              .ref(`/users/${id}`)
              .set({
                id: id?.toString(),
                email: email,
                teams: [
                  {
                    name: nameTeam,
                    id: 0,
                    regionID:regionID,
                    pokemon: teamPokemon,
                  },
                ],
              })
              .then();
            } else {
              await database()
              .ref(`/users/${id}/teams/${snapshot.val().length}`)
              .update({
                name: nameTeam,
                id: snapshot.val().length,
                pokemon: teamPokemon,
                regionID:regionID,
              })
              .then();
            }
          })
        }
      });
  };

  const Remove = async (idTeam:number) => {
    const id = await AsyncStorage.getItem('id');
    await database().ref(`/users/${id}/teams`).once('value').then( snapshot => {
      if (snapshot.val().length === 1) {
        database().ref(`/users/${id}`).remove();
      } else {
          database().ref(`/users/${id}/teams/${idTeam}`).set(null);
          database().ref(`/users/${id}/teams`).orderByValue().once('value')
      }
    })
  }

  const signGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo: any = await GoogleSignin.signIn();
      console.log('userInfo', userInfo.user);
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo?.idToken,
      );
      dispatch(LoginThunk(userInfo, googleCredential));
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.log('errores', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert('Login cancelado');
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert('No cuentas con los servicios de Google');
      } else {
        Alert('errores else', error);
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        '1093316084763-lauo84toljjcm2trka39lb1spta25iup.apps.googleusercontent.com',
      webClientId:
        '1093316084763-lp9tu6fi0vru40s14fqv8jqdl9li6la9.apps.googleusercontent.com',
    });
  }, []);

  return {
    signGoogle,
    firebaseGo,
    signOutGoogle,
    writeToDatabase,
    DB,
    Remove,
  };
};
