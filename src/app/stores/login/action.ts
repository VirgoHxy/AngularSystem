import { createAction, props } from '@ngrx/store';

import { AccountData, AccountInfo } from '@app/interface';

export const SET_ACCOUNTINFO = createAction('SET_ACCOUNTINFO', props<{payload: AccountInfo}>());
export const SET_ACCOUNTDATA = createAction('SET_ACCOUNTDATA', props<{payload: AccountData}>());