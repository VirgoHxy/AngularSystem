import { AccountData, AccountInfo } from '@app/interface';

export interface LoginState {
  accountInfo: AccountInfo;
  accountData: AccountData;
}

export const loginState: LoginState = {
  accountInfo: {
    account: '',
    password: ''
  },
  accountData: {
    name: '',
    type: 10
  },
}