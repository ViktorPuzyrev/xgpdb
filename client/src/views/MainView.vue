<template>
  <div>
    <v-row>
      <v-col sm="4" md="3" lg="2" class="pr-0"><TheFilter /> </v-col>
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
import store from "../store/";
import GameCard from "../components/GameCard.vue";
import TheFilter from "../components/TheFilter";

export default {
  name: "MainView",
  components: { GameCard, TheFilter },
  data() {
    return {
      sortItems: [
        { text: "Дата", value: "date" },
        { text: "Название", value: "title" },
        { text: "MS рейтинг", value: "MSrating" },
        { text: "OC рейтинг", value: "OCrating" },
        { text: "MC(MS) рейтинг", value: "MCMSrating" },
        { text: "MC(US) рейтинг", value: "MCUSrating" },
      ],
      gamesPerPageSelect: [20, 60, 100],
    };
  },
  computed: {
    games() {
      return store.state.games.games;
    },
    sortingBy: {
      get() {
        return store.state.filter.sortingBy;
      },
      set(value) {
        store.commit("updateSortingBy", value);
      },
    },
    reverseSort: {
      get() {
        return store.state.filter.reverseSort;
      },
      set() {
        store.commit("updateReverseSort");
      },
    },
    gamesPerPage: {
      get() {
        return store.state.filter.gamesPerPage;
      },
      set(value) {
        store.commit("updateGamesPerPage", value);
      },
    },
    page: {
      get() {
        return store.state.filter.page;
      },
      set(value) {
        store.commit("updatePage", value);
        this.toTop();
      },
    },
    counterOfGames() {
      return store.getters.counterOfGames;
    },
    paginatedGames() {
      return store.getters.paginatedGames;
    },
    pages() {
      return store.getters.pages;
    },
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
      });
    },
  },
};
</script>

<style></style>
