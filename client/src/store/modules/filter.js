const state = {
  gameTitle: null,
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
  filteredGames: (state, getters) => {
    function filtrGame(arr, obj, key) {
      const filtredArr = arr.filter((item) => {
        switch (obj) {
          case "genres":
            return item.genres.includes(key);
          case "features":
            return item.featuresList.includes(key);
          case "localization":
            return item.ruLocalization.includes(key);
        }
      });
      return filtredArr;
    }
    let filteredGamesList = JSON.parse(JSON.stringify(getters.allGames));
    if (state.genres.length !== 0) {
      for (const key of state.genres) {
        filteredGamesList = filtrGame(filteredGamesList, "genres", key);
      }
    }
    if (state.features.length !== 0) {
      for (const key of state.features) {
        filteredGamesList = filtrGame(filteredGamesList, "features", key);
      }
    }
    if (state.localization.length !== 0) {
      for (const key of state.localization) {
        filteredGamesList = filtrGame(filteredGamesList, "localization", key);
      }
    }
    function searchInString(arr, searchIn, str) {
      const searchArr = arr.filter((item) => {
        switch (searchIn) {
          case false:
            if (item.ruTitle.toLowerCase().indexOf(str.toLowerCase()) !== -1) {
              return true;
            }
            break;
          case true:
            if (
              item.description.toLowerCase().indexOf(str.toLowerCase()) !== -1
            ) {
              return true;
            }
            break;
          default:
            break;
        }
      });
      return searchArr;
    }
    if (state.gameTitle) {
      filteredGamesList = searchInString(
        filteredGamesList,
        state.searchInDescription,
        state.gameTitle
      );
    }
    function sortedGames(arr, sortType, key) {
      arr.sort(function (a, b) {
        switch (sortType) {
          case "str":
            if (a[key].toLowerCase() > b[key].toLowerCase()) {
              return 1;
            }
            if (a[key].toLowerCase() < b[key].toLowerCase()) {
              return -1;
            }
            return 0;
          case "num":
            return b[key] - a[key];
          default:
            break;
        }
      });
    }
    switch (state.sortingBy) {
      case "title":
        sortedGames(filteredGamesList, "str", "ruTitle");
        break;
      case "MSrating":
        sortedGames(filteredGamesList, "num", "MSrating");
        break;
      case "OCrating":
        sortedGames(filteredGamesList, "num", "topOCAverage");
        break;
      case "MCMSrating":
        sortedGames(filteredGamesList, "num", "MCRating");
        break;
      case "MCUSrating":
        sortedGames(filteredGamesList, "num", "MCUserScore");
        break;
      default:
        break;
    }
    if (state.reverseSort) {
      filteredGamesList = filteredGamesList.reverse();
    }
    state.page = 1;
    return filteredGamesList;
  },
  paginatedGames: (state, getters) => {
    function chunk(arr, size) {
      const result = [];
      for (let i = 0; i < Math.ceil(arr.length / size); i++) {
        result.push(arr.slice(i * size, i * size + size));
      }
      return result;
    }
    return chunk(getters.filteredGames, state.gamesPerPage);
  },
  pages: (state, getters) => {
    return getters.paginatedGames.length;
  },
  counterOfGames: (state, getters) => {
    return getters.filteredGames.length;
  },
};

const mutations = {
  updateGameTitle(state, text) {
    state.gameTitle = text;
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
