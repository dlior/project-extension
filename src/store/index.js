import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ isCompression: false });

const store = createStore({
  state() {
    return {
      user: null,
      role: null,
      faqs: [],
      tweets: [],
      searchPhrase: '',
      error: {},
      success: false,
    };
  },
  actions,
  mutations,
  getters,
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});

export default store;
