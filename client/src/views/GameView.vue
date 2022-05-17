<template>
  <v-container v-if="game">
    <v-card>
      <v-card-title class="pa-2">{{ game.ruTitle }}</v-card-title>
      <v-divider></v-divider>
      <div class="d-none d-sm-flex justify-start">
        <div>
          <v-img width="300" :src="game.cover">
            <StickersPanel :game="game" :width="300"
          /></v-img>
        </div>
        <div class="d-none d-sm-block">
          <v-card-text class="text-body-1 pb-0">
            <strong>Жанры:</strong> {{ genres }}<br />
            <strong>Функции:</strong> {{ features }}<br />
            <strong>Локализация:</strong> {{ localization }}<br />
            <strong>Разработчик:</strong> {{ game.developer }}<br />
            <strong>Издатель:</strong> {{ game.publisher }}<br />
            <strong>Дата выпуска:</strong> {{ game.releaseDate }}<br />
            <strong>ESRB:</strong> {{ game.esrb }}<br />
            <strong>Ачивки:</strong> {{ achievements }}<br />
            <strong>Продолжительность:</strong> {{ HLTB }}
          </v-card-text>
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
      <div class="d-flex d-sm-none justify-center">
        <div>
          <v-img width="300" :src="game.cover">
            <StickersPanel :game="game" :width="300"
          /></v-img>
        </div>
      </div>
      <div class="d-sm-none">
        <v-card-text class="text-body-1 pb-0">
          <strong>Жанры:</strong> {{ genres }}<br />
          <strong>Функции:</strong> {{ features }}<br />
          <strong>Локализация:</strong> {{ localization }}<br />
          <strong>Разработчик:</strong> {{ game.developer }}<br />
          <strong>Издатель:</strong> {{ game.publisher }}<br />
          <strong>Дата выпуска:</strong> {{ game.releaseDate }}<br />
          <strong>ESRB:</strong> {{ game.esrb }}<br />
          <strong>Ачивки:</strong> {{ achievements }}<br />
          <strong>Продолжительность:</strong> {{ HLTB }}
        </v-card-text>
        <div class="d-flex pa-4 pb-0">
          <v-btn color="green darken-3" block
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
        height="100%"
      >
        <v-carousel-item v-for="(slide, i) in game.screens" :key="i" eager>
          <v-img :src="slide" contain eager></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-card>
    <v-btn
      color="teal"
      elevation="2"
      dark
      fab
      fixed
      bottom
      right
      @click="$router.back()"
      ><v-icon>mdi-arrow-left-thick</v-icon></v-btn
    >
  </v-container>
</template>

<script>
import store from "../store";
import gameDataHandler from "../mixins/gameDataHandler.vue";
import StickersPanel from "../components/StickersPanel.vue";

/**
 * @module Views/Game
 * @description Страница игры. Подключен миксин [gameDataHandler]{@link module:gameDataHandler}.
 * @vue-computed {Number} gameId - Id игры полученное из параметров адресной строки
 * @vue-computed {Object} game - Данные игры
 */

export default {
  name: "GameView",
  components: { StickersPanel },
  mixins: [gameDataHandler],
  computed: {
    gameId() {
      return this.$route.params.id;
    },
    game() {
      return store.getters.gameById(this.gameId);
    },
  },
  watch: {
    game() {
      this.pageTitle();
    },
  },
  methods: {
    /**
     * Меняет имя страницы
     */
    pageTitle() {
      if (this.game) {
        document.title = this.game.ruTitle + " - XGPdb";
      }
    },
  },
  async created() {
    this.pageTitle();
  },
};
</script>

<style></style>
