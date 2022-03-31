<template>
  <div>
    <v-row>
      <v-col sm="4" md="3" lg="2" class="pr-0"
        ><TheFilter
          @clearSearch="filteredGames = JSON.parse(JSON.stringify(games))"
          @searchInDescription="searchInDescription = $event"
          @gameTitle="gameTitle = $event"
          @genres="genres = $event"
          @features="features = $event"
          @localization="localization = $event"
        />
      </v-col>
      <v-col>
        <v-row>
          <v-col class="pt-7 pb-4">
            <span>Игр в списке: {{ counterOfGames }}</span></v-col
          >
          <v-spacer></v-spacer>
          <v-col md="4" lg="3" class="d-flex pb-0">
            <v-select
              v-model="sortingBy"
              :items="sortItems"
              item-text="text"
              item-value="value"
              dense
              solo
              hide-details
              class="mt-2 mr-2"
            ></v-select>
            <v-btn text class="mt-2" @click="reverseSort = !reverseSort"
              ><v-icon> mdi-swap-vertical-bold </v-icon></v-btn
            >
          </v-col>
          <v-col md="2" lg="1" class="d-flex pl-0 pb-0">
            <v-select
              v-model="gamesPerPage"
              :items="gamesPerPageSelect"
              dense
              solo
              hide-details
              class="mt-2 mr-2"
            ></v-select
          ></v-col>
        </v-row>
        <v-row>
          <div v-if="games" class="d-flex flex-wrap justify-space-around">
            <GameCard
              v-for="game in paginatedGames[page - 1]"
              :key="game.id"
              :game="game"
            />
          </div>
        </v-row>
        <v-pagination
          v-show="pages > 1"
          v-model="page"
          :length="pages"
          :total-visible="7"
          color="green darken-3"
          class="mt-2"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GameCard from "../components/GameCard.vue";
import TheFilter from "../components/TheFilter";

export default {
  name: "MainView",
  components: { GameCard, TheFilter },
  data() {
    return {
      games: null,
      gameTitle: null,
      searchInDescription: false,
      genres: [],
      features: [],
      localization: [],
      reverseSort: false,
      sortingBy: "date",
      sortItems: [
        { text: "Дата", value: "date" },
        { text: "Название", value: "title" },
        { text: "MS рейтинг", value: "MSrating" },
        { text: "OC рейтинг", value: "OCrating" },
        { text: "MC(MS) рейтинг", value: "MCMSrating" },
        { text: "MC(US) рейтинг", value: "MCUSrating" },
      ],
      gamesPerPage: 20,
      gamesPerPageSelect: [20, 50, 100],
      page: 1,
    };
  },
  provide() {
    return { getGames: () => this.games };
  },
  computed: {
    filteredGames: {
      get: function () {
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
        let filteredGamesList = JSON.parse(JSON.stringify(this.games));
        if (this.genres.length !== 0) {
          for (const key of this.genres) {
            filteredGamesList = filtrGame(filteredGamesList, "genres", key);
          }
        }
        if (this.features.length !== 0) {
          for (const key of this.features) {
            filteredGamesList = filtrGame(filteredGamesList, "features", key);
          }
        }
        if (this.localization.length !== 0) {
          for (const key of this.localization) {
            filteredGamesList = filtrGame(
              filteredGamesList,
              "localization",
              key
            );
          }
        }
        function searchInString(arr, searchIn, str) {
          const searchArr = arr.filter((item) => {
            switch (searchIn) {
              case false:
                if (
                  item.ruTitle.toLowerCase().indexOf(str.toLowerCase()) !== -1
                ) {
                  return true;
                }
                break;
              case true:
                if (
                  item.description.toLowerCase().indexOf(str.toLowerCase()) !==
                  -1
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
        if (this.gameTitle) {
          filteredGamesList = searchInString(
            filteredGamesList,
            this.searchInDescription,
            this.gameTitle
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
        switch (this.sortingBy) {
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
        if (this.reverseSort) {
          filteredGamesList = filteredGamesList.reverse();
        }
        return filteredGamesList;
      },
      set: function () {},
    },
    paginatedGames() {
      function chunk(arr, size) {
        const result = [];
        for (let i = 0; i < Math.ceil(arr.length / size); i++) {
          result.push(arr.slice(i * size, i * size + size));
        }
        return result;
      }
      if (this.filteredGames !== null) {
        return chunk(this.filteredGames, this.gamesPerPage);
      } else {
        return 0;
      }
    },
    pages() {
      return this.paginatedGames.length;
    },
    counterOfGames() {
      if (this.filteredGames !== null) {
        return this.filteredGames.length;
      } else {
        return 0;
      }
    },
  },
  watch: {
    games() {
      this.filteredGames = JSON.parse(JSON.stringify(this.games));
    },
    filteredGames() {
      this.page = 1;
    },
    gamesPerPage() {
      this.page = 1;
    },
  },
  methods: {
    async initData() {
      const response = await fetch("api/xgpdb/");
      this.games = await response.json();
    },
  },
  async created() {
    this.initData();
  },
};
</script>

<style></style>
