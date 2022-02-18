import { createReducer, on  } from '@ngrx/store';

import { loginState } from './state';
import {
  SET_ACCOUNTINFO,
  SET_ACCOUNTDATA,
} from './action';

export const counterFeatureKey = 'login';

export const loginReducer = createReducer(
  loginState,
  on(SET_ACCOUNTINFO, (state, action) => {
    return {...state, ...{accountInfo: action.payload}};
    // return Object.assign({}, state, {
    //   accountInfo: action.payload
    // });
  }),
  on(SET_ACCOUNTDATA, (state, action) => {
    return {...state, ...{accountData: action.payload}};
    // return Object.assign({}, state, {
    //   accountData: action.payload
    // });
  }),
)