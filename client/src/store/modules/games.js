const state = {
  games: [],
};
const getters = {
  allGames: (state) => {
    return state.games;
  },
  gameById: (state) => (id) => {
    return state.games.find((game) => game.id === id);
  },
};
const mutations = {
  initData(state, payload) {
    state.games = payload;
  },
};
const actions = {
  async initData(context) {
    const response = await fetch("api/xgpdb/");
    const data = await response.json();
    context.commit("initData", data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};