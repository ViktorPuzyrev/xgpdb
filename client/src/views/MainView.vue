<template>
  <div>
    <v-row>
      <v-col sm="4" md="3" lg="2" class="pr-0"
        ><TheFilter @toTop="toTop" />
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
import TheFilter from "../components/TheFilter";
import LoadingGameCard from "../components/LoadingGameCard";

export default {
  name: "MainView",
  components: { GameCard, TheFilter, LoadingGameCard },
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
      const { xl, lg, md } = this.$vuetify.breakpoint;
      return xl ? 250 : lg ? 240 : md ? 220 : 250;
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
