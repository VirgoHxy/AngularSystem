import { environment } from '@env/environment';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { LoggerService } from '@services/logger.service';
import { LoginState } from './login/state';

function debugFactory(logger: LoggerService): MetaReducer<any> {
  return (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state, action) => {
      logger.log('ACTION', action);
      logger.log('STATE', state);

      return reducer(state, action);
    };
  };
}

export function getMetaReducers(logger: LoggerService): MetaReducer<any>[] {
  return !environment.production ? [debugFactory(logger)] : [];
}

export interface AppStore {
  login: LoginState;
}