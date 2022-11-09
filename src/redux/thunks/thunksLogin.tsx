import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkingCredentials, login, logOut, LogOut } from '../Slices/authSlice';

export const LoginThunk = (userInfo:any, googleCredential:any) => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials(true));
      try {
        setTimeout(async () => {
          await AsyncStorage.setItem("username", userInfo?.user?.name);
          await AsyncStorage.setItem("id", userInfo?.user?.id);
          await AsyncStorage.setItem('@contactName', userInfo?.user?.email);
          await AsyncStorage.setItem('@accessToken', googleCredential.token);
        dispatch(checkingCredentials(false));
        dispatch(login());
        }, 1500);
    } catch (error) {
      console.log('/login - error', error);
      dispatch(checkingCredentials(false));
      dispatch(LogOut());
    }
  };
};

export const LoginOutThunk = () => {
  return async (dispatch: any) => {
    let keys: any = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      console.log(`Delete AsyncStorage Keys: ${keys}`); // Just to see what's going on
      dispatch(logOut());
      dispatch(checkingCredentials(false));
    } catch (error) {
      console.log('LoginOutThunk', error);
      dispatch(logOut());
      dispatch(checkingCredentials(false));
    }
  };
};


