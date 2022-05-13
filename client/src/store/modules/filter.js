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
  filteredGamesList: (state, getters) => {
    const query = (state.query || "").toLowerCase();
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
      .filter((game) =>
        state.searchInDescription
          ? game.description.toLowerCase().includes(query)
          : game.ruTitle.toLowerCase().includes(query)
      );
  },
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
  reversedGamesList: (state, getters) => {
    return state.reverseSort
      ? JSON.parse(JSON.stringify(getters.sortedGamesList)).reverse()
      : getters.sortedGamesList;
  },
  paginatedGames: (state, getters) => {
    function chunk(arr, size) {
      return arr.reduce(
        (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
        []
      );
    }
    return chunk(getters.reversedGamesList, state.gamesPerPage);
  },
  pages: (state, getters) => {
    return getters.paginatedGames.length;
  },
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
