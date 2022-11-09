import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '../../navigation/RootNavigation';
import {AxiosGet} from '../axios/auth';
import { checkingCredentials, dataMyTeamPokemon, dataPokemons, dataRegionID, dataRegions } from '../Slices/authSlice';
import database from '@react-native-firebase/database';



export const PokeApiThunk = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials(true));
      try {
       const resp =  await AxiosGet({endpoint:'region'})    
       await dispatch(dataRegions(resp?.data?.results))
       dispatch(checkingCredentials(false));
    } catch (error) {
      console.log('/region-error ', error);
      dispatch(checkingCredentials(false));
    }
  };
};

export const myTeamsThunk = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials(true));
      try {
        const id = await AsyncStorage.getItem('id');
        await database()
          .ref(`/users/${id}/teams/`)
          .on('value', async snapshot => {
             await dispatch(dataMyTeamPokemon(snapshot.val()))
            dispatch(checkingCredentials(false));
          }) 
    } catch (error) {
      console.log('/users/${id}/teams/ - error', error);
      dispatch(checkingCredentials(false));
    }
  };
};

export const PokeApiPokemonThunk = (url:string, region:string | number) => {
  return async (dispatch: any) => {
      try {
       const resp =  await AxiosGet({baseUrlNew:url})    
       const pokemons =  await AxiosGet({baseUrlNew:resp.data.main_generation.url})
       let array:any = [];
       await pokemons.data.pokemon_species.forEach( async (element:any) => {
         try {
           const data = await AxiosGet({baseUrlNew:element.url})
           array.push(data.data)
           if (array.length === pokemons.data.pokemon_species.length) {
             await dispatch(checkingCredentials(false));
             await dispatch(dataPokemons(array))         
             await dispatch(dataRegionID(region))         
             navigationRef.navigate('Pokemons')
            }
        
        } catch (error) {
          console.log('error')          
        }
        dispatch(checkingCredentials(true));
       });
       
 
    } catch (error) {
      console.log('PokeApiPokemonThunk-error', error);
      dispatch(checkingCredentials(false));
    }
  };
};


