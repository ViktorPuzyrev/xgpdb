import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  games: [],
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

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
