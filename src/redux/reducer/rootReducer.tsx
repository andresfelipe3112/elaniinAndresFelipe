import {combineReducers} from 'redux';
import {authSlice} from '../Slices/authSlice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
