<template>
  <div>
    <v-hover>
      <template v-slot:default="{ hover }">
        <div :style="{ height: width * 1.3 + 'px' }">
          <v-fade-transition v-if="moreInfo">
            <v-overlay v-if="hover" absolute>
              <v-btn color="green darken-3"
                ><router-link
                  :to="{
                    name: 'Game',
                    params: { id: game.id },
                  }"
                  class="text-decoration-none white--text"
                  >Подробнее</router-link
                >
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </div></template
      >
    </v-hover>
    <div
      :style="{
        height: width * 0.2 + 'px',
        backgroundColor: '#2e7d32',
        display: 'flex',
        fontSize: (width / 5) * 0.5 + 'px',
      }"
    >
      <div :style="cell">
        <v-tooltip top color="black">
          <template v-slot:activator="{ on, attrs }">
            <p
              v-bind="attrs"
              v-on="on"
              v-if="game.MSrating"
              class="white--text ma-0"
            >
              {{ game.MSrating }}
            </p>
            <p v-bind="attrs" v-on="on" v-else class="white--text ma-0">
              ==
            </p></template
          >
          <span>Microsoft Store</span>
        </v-tooltip>
      </div>
      <div :style="cell">
        <v-tooltip top color="black">
          <template v-slot:activator="{ on, attrs }"
            ><div
              v-bind="attrs"
              v-on="on"
              class="ma-auto"
              :style="styleMCRating"
            >
              <p v-if="game.MCRating" class="white--text ma-0">
                {{ game.MCRating }}
              </p>
              <p v-else class="white--text ma-0">==</p>
            </div></template
          >
          <span>Metacritic Metascore</span>
        </v-tooltip>
      </div>
      <div :style="cell">
        <v-tooltip top color="black">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="ma-auto"
              :style="styleMCUserScore"
            >
              <p v-if="game.MCUserScore" class="white--text ma-0">
                {{ game.MCUserScore }}
              </p>
              <p v-else class="white--text ma-0">==</p>
            </div></template
          >
          <span>Metacritic Userscore</span>
        </v-tooltip>
      </div>
      <div :style="cell">
        <v-tooltip top color="black">
          <template v-slot:activator="{ on, attrs }">
            <v-img
              v-bind="attrs"
              v-on="on"
              v-if="OCSticker"
              :src="OCSticker"
              contain
              height="90%"
            ></v-img>
            <p v-bind="attrs" v-on="on" v-else class="white--text ma-0">==</p>
          </template>
          <span>Opencritic</span>
        </v-tooltip>
      </div>
      <div :style="cell">
        <v-tooltip top color="black">
          <template v-slot:activator="{ on, attrs }">
            <v-img
              v-bind="attrs"
              v-on="on"
              v-if="game.MCMustPlay"
              src="@/assets/mc-mustplay.svg"
              contain
              height="90%"
            ></v-img
          ></template>
          <span>Metacritic Must Play</span>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import gameDataHandler from "../mixins/gameDataHandler.vue";

/**
 * Компонент для отображения рейтингов на постере карточки игры. Подключен миксин [gameDataHandler]{@link module:gameDataHandler}.
 * @vue-prop {Object} game - Данные о игре
 * @vue-prop {Number} width - Ширина карточки с игрой
 * @vue-prop {Boolean} moreInfo - Активирует ховер на постере
 * @vue-computed {Object} cell - Общие параметры CSS для ячейки с рейтингом
 * @vue-computed {Object} styleMCRating - Параметры CSS для ячейки с рейтингом MC
 * @vue-computed {Object} styleMCUserScore - Параметры CSS для ячейки с рейтингом MC(US)
 */

export default {
  name: "StickersPanel",
  mixins: [gameDataHandler],
  props: {
    game: { type: Object, required: true },
    width: { type: Number, required: true },
    moreInfo: Boolean,
  },
  computed: {
    cell() {
      return {
        height: this.width / 5 + "px",
        width: this.width / 5 + "px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
    },
    styleMCRating() {
      return this.metacriticStyle(
        this.game.MCRating,
        (this.width / 5) * 0.12 + "px",
        75,
        74,
        50
      );
    },
    styleMCUserScore() {
      return this.metacriticStyle(this.game.MCUserScore, "50%", 7.5, 7.4, 5);
    },
  },
  methods: {
    /**
     * Формирует CSS стили для рейтинга MC/MC(US)
     * @param {Number} raiting - Рейтинг MC/MC(US)
     * @param {String} radius - Радиус скругления элемента
     * @param {Number} a - Верхний(зеленый) диапазон рейтинга
     * @param {Number} b - Средний(желтый) диапазон рейтинга
     * @param {Number} c - Нижний(красный) диапазон рейтинга
     * @returns {Object}
     */
    metacriticStyle(raiting, radius, a, b, c) {
      return {
        width: (this.width / 5) * 0.9 + "px",
        height: (this.width / 5) * 0.9 + "px",
        backgroundColor:
          raiting >= a ? "#6c3" : c > raiting && raiting <= b ? "#f00" : "#fc3",
        borderRadius: radius,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
    },
  },
};
</script>

<style scoped></style>
