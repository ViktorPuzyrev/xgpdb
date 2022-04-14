<template>
  <v-container v-if="game">
    <v-card>
      <v-card-title class="pa-2">{{ game.ruTitle }}</v-card-title>
      <v-divider></v-divider>
      <div class="d-flex flex-no-wrap justify-start">
        <div>
          <v-img width="300" :src="game.cover">
            <v-row no-gutters style="height: 390px"></v-row>
            <v-row
              no-gutters
              align="center"
              style="height: 60px; background-color: #2e7d32"
              ><v-col
                ><v-tooltip top color="black">
                  <template v-slot:activator="{ on, attrs }">
                    <p
                      v-bind="attrs"
                      v-on="on"
                      v-if="game.MSrating"
                      class="white--text text-center text-h4 ma-0"
                    >
                      {{ game.MSrating }}
                    </p>
                    <p
                      v-bind="attrs"
                      v-on="on"
                      v-else
                      class="white--text text-center text-h4 ma-0"
                    >
                      ==
                    </p></template
                  >
                  <span>Microsoft Store</span>
                </v-tooltip> </v-col
              ><v-col
                ><v-tooltip top color="black">
                  <template v-slot:activator="{ on, attrs }"
                    ><div
                      v-bind="attrs"
                      v-on="on"
                      class="ma-auto"
                      :style="styleMCRating"
                    >
                      <p
                        v-if="game.MCRating"
                        class="white--text text-center text-h4 ma-0"
                      >
                        {{ game.MCRating }}
                      </p>
                      <p v-else class="white--text text-center text-h4 ma-0">
                        ==
                      </p>
                    </div></template
                  >
                  <span>Metacritic Metascore</span>
                </v-tooltip></v-col
              ><v-col
                ><v-tooltip top color="black">
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      v-bind="attrs"
                      v-on="on"
                      class="ma-auto"
                      :style="styleMCUserScore"
                    >
                      <p
                        v-if="game.MCUserScore"
                        class="white--text text-center text-h4 ma-0"
                      >
                        {{ game.MCUserScore }}
                      </p>
                      <p v-else class="white--text text-center text-h4 ma-0">
                        ==
                      </p>
                    </div></template
                  >
                  <span>Metacritic Userscore</span>
                </v-tooltip> </v-col
              ><v-col
                ><v-tooltip top color="black">
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                      v-bind="attrs"
                      v-on="on"
                      v-if="OCSticker"
                      :src="OCSticker"
                      style="width: 55px"
                    ></v-img>
                    <p
                      v-bind="attrs"
                      v-on="on"
                      v-else
                      class="white--text text-center text-h4 ma-0"
                    >
                      ==
                    </p>
                  </template>
                  <span>Opencritic</span>
                </v-tooltip></v-col
              ><v-col class="pl-1"
                ><v-tooltip top color="black">
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                      v-bind="attrs"
                      v-on="on"
                      v-if="game.MCMustPlay"
                      src="@/assets/mc-mustplay.svg"
                      style="width: 55px"
                    ></v-img
                  ></template>
                  <span>Metacritic Must Play</span>
                </v-tooltip>
              </v-col></v-row
            >
          </v-img>
        </div>
        <div>
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
      color="green darken-3"
      elevation="2"
      class="mb-12"
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

export default {
  name: "GameView",
  mixins: [gameDataHandler],
  data() {
    return {};
  },
  computed: {
    gameId() {
      return this.$route.params.id;
    },
    game() {
      return store.getters.gameById(this.gameId);
    },
    styleMCRating() {
      return this.metacriticStyle(this.game.MCRating, "7px", 75, 74, 50);
    },
    styleMCUserScore() {
      return this.metacriticStyle(this.game.MCUserScore, "50%", 7.5, 7.4, 5.0);
    },
  },
  watch: {
    game() {
      this.pageTitle();
    },
  },
  methods: {
    pageTitle() {
      if (this.game) {
        document.title = this.game.ruTitle + " - XGPdb";
      }
    },
    metacriticStyle(key, radius, a, b, c) {
      const style = {
        width: "55px",
        height: "55px",
        backgroundColor: "",
        borderRadius: radius,
        paddingTop: "8px",
      };
      if (key >= a) {
        style.backgroundColor = "#6c3";
      } else if (c > key && key <= b) {
        style.backgroundColor = "#f00";
      } else {
        style.backgroundColor = "#fc3";
      }
      return style;
    },
  },
  async created() {
    this.pageTitle();
  },
};
</script>

<style></style>
