import Vue from "vue";
import Vuex from "vuex";
import createLogger from '../plugins/create-logger';

Vue.use(Vuex);

import base from './modules/base.js';
import auth from './modules/auth.js';
import token from './modules/token.js';
/* !!! DO_NOT_EDIT_HERE_AND_BELOW !!! */


const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    base,
    auth,
    token
/* !!! DO_NOT_EDIT_THIS !!! */
  },
  strict: false,
  plugins: debug ? [createLogger()] : []
});
