import common from './common';
import production from './production';

export const environment = Object.assign(common, production, {
  production: true
});
