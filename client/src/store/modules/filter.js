/**
 * @module Store/Filter
 * @description Модуль менеджера состояния отвечающий за фильтрацию.
 */

/**
 * Параметры фильтрации
 * @typedef state
 * @type {Object}
 * @property {String} [query=""] - Поисковый запрос
 * @property {Boolean} [searchInDescription=false] - Поиск в описании
 * @property {Array.<String>} [genres=[]] - Жанры по которым идет поиск
 * @property {Array.<String>} [features=[]] - Функции по которым идет поиск
 * @property {Array.<String>} [localization=[]] - Параметры локализации по которым идет поиск
 * @property {String} [sortingBy="date"] - Параметр сортировки списка игр
 * @property {Boolean} [reverseSort=false] - Обратная сортировка списка игр
 * @property {Number} [gamesPerPage=20] - Количество игр на странице
 * @property {Number} [page=1] - Текущая страница списка игр
 */
const state = {
  query: "",
  searchInDescription: false,
  genres: [],
  features: [],
  localization: [],
  sortingBy: "date",
  reverseSort: false,
  gamesPerPage: 20,
  page: 1,
};

const getters = {
  /**
   * Фильтрует список игр по жанру, функции, параметру локализации, поисковому запросу.
   * @method filteredGamesList
   * @param {Object} state
   * @param {Object} getters
   * @returns {Array.<Object>}
   */
  filteredGamesList: (state, getters) => {
    return JSON.parse(JSON.stringify(getters.allGames))
      .filter((game) => {
        return [
          ...state.genres,
          ...state.features,
          ...state.localization,
        ].every((item) =>
          [
            ...game.genres,
            ...game.featuresList,
            ...game.ruLocalization,
          ].includes(item)
        );
      })
      .filter((game) => {
        const query = (state.query || "").toLowerCase();
        return state.searchInDescription
          ? game.description.toLowerCase().includes(query)
          : game.ruTitle.toLowerCase().includes(query);
      });
  },
  /**
   * Сортирует список игр по различным параметрам.
   * @method sortedGamesList
   * @param {Object} state
   * @param {Object} getters
   * @returns {Array.<Object>}
   */
  sortedGamesList: (state, getters) => {
    state.page = 1;
    if (state.sortingBy === "date") {
      return getters.filteredGamesList;
    } else {
      return JSON.parse(JSON.stringify(getters.filteredGamesList)).sort(
        (a, b) => {
          if (state.sortingBy === "ruTitle") {
            return a[state.sortingBy].toLowerCase() >
              b[state.sortingBy].toLowerCase()
              ? 1
              : -1;
          } else {
            return b[state.sortingBy] - a[state.sortingBy];
          }
        }
      );
    }
  },
  /**
   * Обращает порядок игр в списке.
   * @method reversedGamesList
   * @param {Object} state
   * @param {Object} getters
   * @returns {Array.<Object>}
   */
  reversedGamesList: (state, getters) => {
    return state.reverseSort
      ? JSON.parse(JSON.stringify(getters.sortedGamesList)).reverse()
      : getters.sortedGamesList;
  },
  /**
   * Разбивает список игр для постраничного отображения.
   * @method paginatedGamesList
   * @param {Object} state
   * @param {Object} getters
   * @returns {Array.<Array>}
   */
  paginatedGamesList: (state, getters) => {
    function chunk(arr, size) {
      return arr.reduce(
        (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
        []
      );
    }
    return chunk(getters.reversedGamesList, state.gamesPerPage);
  },
  /**
   * Считает количество страниц в списке игр.
   * @method pages
   * @param {Object} getters
   * @returns {Number}
   */
  pages: (state, getters) => {
    return getters.paginatedGamesList.length;
  },
  /**
   * Считает количество игр в списке игр.
   * @method counterOfGames
   * @param {Object} getters
   * @returns {Number}
   */
  counterOfGames: (state, getters) => {
    return getters.sortedGamesList.length;
  },
};

const mutations = {
  updateQuery(state, text) {
    state.query = text;
  },
  updateSearchInDescription(state, value) {
    state.searchInDescription = value;
  },
  updateGenres(state, arr) {
    state.genres = arr;
  },
  updateFeatures(state, arr) {
    state.features = arr;
  },
  updateLocalization(state, arr) {
    state.localization = arr;
  },
  updateSortingBy(state, text) {
    state.sortingBy = text;
  },
  updateReverseSort(state) {
    state.reverseSort = !state.reverseSort;
  },
  updateGamesPerPage(state, num) {
    state.gamesPerPage = num;
    state.page = 1;
  },
  updatePage(state, num) {
    state.page = num;
  },
};

export default {
  state,
  getters,
  mutations,
};
