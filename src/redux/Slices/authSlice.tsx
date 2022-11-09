import {createAction, createSlice} from '@reduxjs/toolkit';
export const LogOut = createAction('auth/logOut');

export interface AuthProps {
  user: null;
  userDetails: object | null;
  status: 'checking' | 'not-authenticated' | 'authenticated';
  loading: boolean;
  regions: [] | object | null;
  pokemons:any;
  teamPokemon:any;
  MyTeamPokemon:any;
  regionID: string | number
}

const initialState = {
  user: null,
  userDetails: null,
  status: 'not-authenticated',
  loading:false,
  regions:[],
  pokemons:[],
  teamPokemon:[],
  MyTeamPokemon:[],
  regionID:''
} as AuthProps;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.status = 'authenticated'; // 'checking', 'not-authenticated', 'authenticated'
    },
    logOut: state => {
      state.status = 'not-authenticated'; // 'checking', 'not-authenticated', 'authenticated'
    },
    checkingCredentials: (state, {payload}) => {
      state.loading = payload;
    },
    dataRegions: (state, {payload}) => {
      state.regions = payload;
    },
    dataPokemons: (state, {payload}) => {
      state.pokemons = payload;
    },
    dataTeamPokemon: (state, {payload}) => {
      state.teamPokemon = payload;
    },
    dataMyTeamPokemon: (state, {payload}) => {
      state.MyTeamPokemon = payload;
    },
    dataRegionID: (state, {payload}) => {
      state.regionID = payload;
    },
  },
});

export const {
  login,
  logOut,
  checkingCredentials,
  dataRegions,
  dataPokemons,
  dataTeamPokemon,
  dataMyTeamPokemon,
  dataRegionID,
} = authSlice.actions;
