const mutations = {
  clearState: (state) => {
    state.user = null;
    state.role = null;
    state.faqs = [];
    state.tweets = [];
    state.searchPhrase = '';
    state.error = {};
    state.success = false;
    localStorage.clear();
  },

  setUser: (state, payload) => (state.user = payload),

  setRole: (state, payload) => (state.role = payload),

  setFaqs: (state, payload) => (state.faqs = payload),

  setTweets: (state, payload) => (state.tweets = payload),

  updateSearchPhrase: (state, payload) => (state.searchPhrase = payload),

  setError: (state, payload) => (state.error = { ...payload }),

  setSuccess: (state, payload) => (state.success = payload),
};

export default mutations;
