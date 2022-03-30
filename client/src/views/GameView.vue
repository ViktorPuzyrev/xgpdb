<template>
  <v-container v-if="game">
    <v-card>
      <v-card-title class="pa-2">{{ game.ruTitle }}</v-card-title>
      <v-divider></v-divider>
      <div class="d-flex flex-no-wrap justify-start">
        <div><v-img width="300" :src="game.cover"></v-img></div>
        <div>
          <v-card-text class="text-body-1 pb-0"
            ><div v-if="game.MSrating">
              MS рейтинг: {{ game.MSrating }} из 5 ({{ game.MSreviews }})
            </div>
            <div v-else>MS рейтинг: недостаточно отзывов</div></v-card-text
          >
          <v-card-text class="text-body-1 pb-0"
            >Жанры: {{ genres }}</v-card-text
          >
          <v-card-text class="text-body-1 pb-0"
            >Функции: {{ features }}</v-card-text
          >
          <v-card-text class="text-body-1 pb-0"
            >Локализация: {{ localization }}</v-card-text
          >
          <v-card-text class="text-body-1 pb-0"
            >Разработчик: {{ game.developer }}</v-card-text
          >
          <v-card-text class="text-body-1 pb-0"
            >Издатель: {{ game.publisher }}</v-card-text
          >
          <v-card-text class="text-body-1 pb-0"
            >Дата выпуска: {{ game.releaseDate }}</v-card-text
          >
          <v-card-text class="text-body-1 pb-0"
            >ESRB: {{ game.esrb }}</v-card-text
          >
          <v-btn color="green darken-3 ma-4"
            ><a
              :href="game.link"
              class="text-decoration-none white--text"
              target="_blank"
              >Microsoft<v-icon right>mdi-share</v-icon></a
            >
          </v-btn>
        </div>
      </div>
      <v-card-text class="text-justify text-body-1"
        >{{ game.description }}
      </v-card-text>
    </v-card>
    <v-card class="mt-4"
      ><v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        height=""
      >
        <v-carousel-item v-for="(slide, i) in game.screens" :key="i">
          <v-img :src="slide" contain></v-img>
        </v-carousel-item> </v-carousel
    ></v-card>
  </v-container>
</template>

<script>
import gameDataHandler from "../mixins/gameDataHandler.vue";

export default {
  name: "GameView",
  mixins: [gameDataHandler],
  data() {
    return {
      game: null,
    };
  },
  computed: {
    gameId() {
      return this.$route.params.id;
    },
  },
  watch: {
    game() {
      document.title = this.game.ruTitle + " - XGPdb";
    },
  },
  methods: {
    async initData() {
      const response = await fetch("api/xgpdb/game/" + this.gameId);
      this.game = await response.json();
    },
  },
  async created() {
    this.initData();
  },
};
</script>

<style></style>
