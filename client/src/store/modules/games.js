/**
 * @module Store/Games
 * @description Модуль менеджера состояния отвечающий за список игр.
 */

/**
 * Параметры списка игр
 * @typedef state
 * @type {Object}
 * @property {Boolean} loading - Статус загрузки списка игр
 * @property {Array.<Object>} games - Список игр
 * @property {String} dbUpdate - Дата последнего обновления базы данных
 */
const state = {
  loading: true,
  games: [],
  dbUpdate: "",
};

const getters = {
  /**
   * Возвращает статус загрузки списка игр.
   * @method loadingStatus
   * @param {Object} state
   * @returns {Boolean}
   */
  loadingStatus: (state) => {
    return state.loading;
  },
  /**
   * Возвращает список игр.
   * @method allGames
   * @param {Object} state
   * @returns {Array.<Object>}
   */
  allGames: (state) => {
    return state.games;
  },
  /**
   * Возвращает игру из списка по ее id.
   * @method gameById
   * @param {Object} state
   * @returns {Object}
   */
  gameById: (state) => (id) => {
    return state.games.find((game) => game.id === id);
  },
};

const mutations = {
  /**
   * Обновляет данные в списке игр, меняет статус загрузки.
   * @method updateState
   * @param {Object} state
   * @param {Object} payload
   */
  updateState(state, payload) {
    state.games = payload.games;
    state.loading = false;
    state.dbUpdate = payload.dbUpdate;
  },
};

const actions = {
  /**
   * Получает данные из API.
   * @method initData
   * @param {Object} context
   */
  async initData(context) {
    try {
      const response = await fetch("api/xgpdb/");
      const data = await response.json();
      context.commit("updateState", data);
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
