<template>
  <div class="px-2">
    <v-row>
      <v-col>
        <v-row no-gutters class="mt-3">
          <v-col cols="12" xs="12" sm="4" md="4" class="d-flex">
            <span class="my-auto"
              >Игр в списке: {{ counterOfGames }}</span
            ></v-col
          >
          <v-spacer class="d-none d-sm-block"></v-spacer>
          <v-col cols="12" xs="6" sm="5" md="4" lg="3" class="d-none d-sm-flex">
            <v-select
              v-model="sortingBy"
              :items="sortItems"
              item-text="text"
              item-value="value"
              dense
              solo
              hide-details
            ></v-select>
            <v-btn text class="mx-2 my-auto" @click="reverseSort = !reverseSort"
              ><v-icon> mdi-swap-vertical-bold </v-icon></v-btn
            >
          </v-col>
          <v-col cols="12" xs="6" sm="3" md="2" lg="1" class="d-none d-sm-flex">
            <v-select
              v-model="gamesPerPage"
              :items="gamesPerPageSelect"
              dense
              solo
              hide-details
            ></v-select
          ></v-col>
        </v-row>
        <v-row no-gutters class="d-sm-none mt-3">
          <v-col cols="9" class="d-flex">
            <v-select
              v-model="sortingBy"
              :items="sortItems"
              item-text="text"
              item-value="value"
              dense
              solo
              hide-details
            ></v-select>
            <v-btn text class="mx-2 my-auto" @click="reverseSort = !reverseSort"
              ><v-icon> mdi-swap-vertical-bold </v-icon></v-btn
            >
          </v-col>
          <v-col cols="3" class="d-flex">
            <v-select
              v-model="gamesPerPage"
              :items="gamesPerPageSelect"
              dense
              solo
              hide-details
            ></v-select
          ></v-col>
        </v-row>
        <v-row>
          <div
            v-if="loadingStatus"
            class="d-flex flex-wrap justify-space-around"
          >
            <LoadingGameCard
              v-for="n of gamesPerPage"
              :key="n"
              :cardWidth="cardWidth"
            />
          </div>
          <div v-else>
            <div class="d-flex flex-wrap justify-space-around">
              <GameCard
                v-for="game in paginatedGames[page - 1]"
                :key="game.id"
                :game="game"
                :cardWidth="cardWidth"
              />
            </div>
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
import store from "../store/";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import GameCard from "../components/GameCard";
import LoadingGameCard from "../components/LoadingGameCard";

export default {
  name: "MainView",
  components: { GameCard, LoadingGameCard },
  data() {
    return {
      sortItems: [
        { text: "Дата", value: "date" },
        { text: "Название", value: "ruTitle" },
        { text: "MS рейтинг", value: "MSrating" },
        { text: "OC рейтинг", value: "topOCAverage" },
        { text: "MC(MS) рейтинг", value: "MCRating" },
        { text: "MC(US) рейтинг", value: "MCUserScore" },
      ],
      gamesPerPageSelect: [20, 60, 100],
    };
  },
  computed: {
    ...mapGetters([
      "counterOfGames",
      "paginatedGames",
      "pages",
      "loadingStatus",
    ]),
    games() {
      return store.state.games.games;
    },
    sortingBy: {
      get() {
        return store.state.filter.sortingBy;
      },
      set(value) {
        this.updateSortingBy(value);
      },
    },
    reverseSort: {
      get() {
        return store.state.filter.reverseSort;
      },
      set() {
        this.updateReverseSort();
      },
    },
    gamesPerPage: {
      get() {
        return store.state.filter.gamesPerPage;
      },
      set(value) {
        this.updateGamesPerPage(value);
      },
    },
    page: {
      get() {
        return store.state.filter.page;
      },
      set(value) {
        this.updatePage(value);
        this.toTop();
      },
    },
    cardWidth() {
      const { xl, lg, md, sm } = this.$vuetify.breakpoint;
      return xl ? 250 : lg ? 240 : md ? 220 : sm ? 240 : 350;
    },
  },
  methods: {
    ...mapMutations([
      "updateSortingBy",
      "updateReverseSort",
      "updateGamesPerPage",
      "updatePage",
    ]),
    toTop() {
      window.scrollTo({
        top: 0,
      });
    },
  },
};
</script>

<style></style>
