import React, {Fragment, useEffect, useState} from 'react';
import Loading from '../components/loading/loading';
import { AuthProps, login, logOut } from '../redux/Slices/authSlice';
import Welcome from './welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import AuthHome from './authHome';


interface StackProps {
  RootNavigation: any;
}

export const StackNavigator: React.FC<StackProps> = ({RootNavigation}) => {
  const {status} = useSelector((state: {auth: AuthProps}) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<any>();

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@accessToken');
      if (token !== null) {
        console.log('Yes token');
        await dispatch(login());
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.log('error-toke', e);
      dispatch(logOut());
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getToken()
    },1000)
  },[])

  return (
    <Fragment>
      {
   isLoading 
      ? (
        <Loading />
      ) : (
        <Fragment>
          {
          status === 'authenticated' 
          ? (
            <AuthHome />
          ) : (
            <Welcome />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default StackNavigator;