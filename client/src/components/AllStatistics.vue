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
          >Колличество игр в подписке: {{ totalGames }}<br />
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
export default {
  name: "AllStatistics",
  inject: ["getGames"],
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    games() {
      return this.getGames();
    },
    totalGames() {
      if (this.games) {
        return this.games.length;
      } else {
        return 0;
      }
    },
    topMetacritic() {
      if (this.games) {
        let count = 0;
        this.games.forEach((element) => {
          if (element.MCRating >= 75) {
            count++;
          }
        });
        return count;
      } else {
        return 0;
      }
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
      if (this.games) {
        let price = 0;
        this.games.forEach((element) => {
          price += element.originalPrice;
        });
        return price.toFixed(2);
      } else {
        return 0;
      }
    },
  },
  methods: {
    averageScore(item) {
      if (this.games) {
        let score = 0;
        let count = 0;
        this.games.forEach((element) => {
          if (element[item]) {
            score += element[item];
            count++;
          }
        });
        return Math.round(score / count);
      } else {
        return 0;
      }
    },
  },
};
</script>
