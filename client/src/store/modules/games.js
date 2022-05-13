const state = {
  loading: true,
  games: [],
  dbUpdate: "",
};

const getters = {
  loadingStatus: (state) => {
    return state.loading;
  },
  allGames: (state) => {
    return state.games;
  },
  gameById: (state) => (id) => {
    return state.games.find((game) => game.id === id);
  },
};

const mutations = {
  initData(state, payload) {
    state.games = payload.games;
    state.loading = false;
    state.dbUpdate = payload.dbUpdate;
  },
};

const actions = {
  async initData(context) {
    try {
      const response = await fetch("api/xgpdb/");
      const data = await response.json();
      context.commit("initData", data);
    } catch (error) {
      console.error(error);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
