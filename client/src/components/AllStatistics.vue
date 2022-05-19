<template>
  <div class="text-center mt-2">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green darken-3" dark v-bind="attrs" v-on="on" block>
          Статистика XGP
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Общая статистика Xbox Game Pass
        </v-card-title>
        <v-card-text class="text-h6 pt-5"
          >Количество игр в подписке: {{ totalGames }}<br />
          Средний балл Metacritic (MS): {{ averageMetacriticRating }}<br />
          Средний балл Metacritic (US): {{ averageMetacriticUSRating }}<br />
          Игры с Metacritic (MS) выше 75: {{ topMetacritic }}<br />
          Средний балл Opencritic: {{ averageOpencriticRating }}<br />
          Стоимость всех игр (без скидок): {{ totalCoast }}$<br />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-3" text @click="dialog = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
/**
 * Компонент статистики.
 * @vue-data {Boolean} [dialog=false] - Активирует диалоговое окно
 * @vue-computed {Number} totalGames - Общее количество игр в подписке
 * @vue-computed {Number} topMetacritic - Игры с MC выше 75 баллов
 * @vue-computed {Number} averageMetacriticRating - Средний балл MC всех игр
 * @vue-computed {String} averageMetacriticUSRating - Средний балл MC(US) всех игр
 * @vue-computed {Number} averageOpencriticRating - Средний балл OC всех игр
 * @vue-computed {String} totalCoast - Стоимость всех игр в подписке без скидок
 */
export default {
  name: "AllStatistics",
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({ games: "allGames" }),
    totalGames() {
      return this.games ? this.games.length : 0;
    },
    topMetacritic() {
      return this.games
        ? this.games.reduce((sum, game) => {
            return game.MCRating >= 75 ? ++sum : sum;
          }, 0)
        : 0;
    },
    averageMetacriticRating() {
      return this.averageScore("MCRating");
    },
    averageMetacriticUSRating() {
      return this.averageScore("MCUserScore").toFixed(1);
    },
    averageOpencriticRating() {
      return this.averageScore("topOCAverage");
    },
    totalCoast() {
      return this.games
        ? this.games
            .reduce((sum, game) => {
              return sum + game.originalPrice;
            }, 0)
            .toFixed(2)
        : 0;
    },
  },
  methods: {
    /**
     * Считает средний балл рейтинга игр, у которых он есть
     * @param {String} key - Ключ рейтинга в объекте игры
     * @returns {number} Средний рейтинг
     */
    averageScore(key) {
      if (this.games) {
        const arrObjWithKey = this.games.filter((game) => game[key]);
        return Math.round(
          arrObjWithKey.reduce((sum, game) => {
            return sum + game[key];
          }, 0) / arrObjWithKey.length
        );
      } else {
        return 0;
      }
    },
  },
};
</script>
