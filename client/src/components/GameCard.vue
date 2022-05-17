<template>
  <v-card class="ma-3 mt-0 d-flex flex-column" :width="cardWidth">
    <v-img :src="game.cover">
      <StickersPanel :game="game" :width="cardWidth" :moreInfo="true" /> </v-img
    ><v-divider></v-divider
    ><v-card-title class="d-inline-block pa-2 text-truncate">{{
      game.ruTitle
    }}</v-card-title>
    <v-card-subtitle class="d-inline-block pa-2 text-truncate">{{
      genres
    }}</v-card-subtitle>
    <v-card-actions class="pt-0">
      <v-row>
        <v-col
          ><v-btn block color="green darken-3"
            ><a
              :href="game.link"
              class="text-decoration-none white--text"
              target="_blank"
              >Microsoft<v-icon right>mdi-share</v-icon></a
            >
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import StickersPanel from "./StickersPanel.vue";
import gameDataHandler from "../mixins/gameDataHandler.vue";

/**
 * Компонент карточки игры на главной странице. Подключен миксин [gameDataHandler]{@link module:gameDataHandler}.
 * @vue-prop {Object} game - Данные о игре
 * @vue-prop {Number} cardWidth - Ширина карточки с игрой
 */

export default {
  name: "GameCard",
  components: { StickersPanel },
  mixins: [gameDataHandler],
  props: {
    game: { type: Object, required: true },
    cardWidth: { type: Number, required: true },
  },
};
</script>
