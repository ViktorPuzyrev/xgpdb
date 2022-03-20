<template>
  <v-card class="ma-3 d-flex flex-column" width="300">
    <v-img :src="game.cover" width="100%"></v-img><v-divider></v-divider
    ><v-card-title
      class="d-inline-block pa-2 text-truncate"
      style="max-width: 300px"
      >{{ game.ruTitle }}</v-card-title
    >
    <v-card-subtitle
      class="d-inline-block pa-2 text-truncate"
      style="max-width: 300px"
      >{{ genres }}</v-card-subtitle
    >
    <v-card-actions class="pt-0">
      <v-row class="d-flex justify-space-between">
        <v-col class="pr-1"
          ><v-btn block color="green darken-3"
            ><a
              :href="game.link"
              class="text-decoration-none white--text"
              target="_blank"
              >Microsoft<v-icon right>mdi-share</v-icon></a
            >
          </v-btn>
        </v-col>
        <v-col class="pl-1"
          ><v-btn block
            ><router-link
              :to="{ name: 'Game', params: { id: game.id } }"
              class="text-decoration-none green--text text--darken-3"
              >Подробнее</router-link
            >
          </v-btn></v-col
        >
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import gameDataHandler from "../mixins/gameDataHandler.vue";

export default {
  name: "GameCard",
  mixins: [gameDataHandler],
  props: ["game"],
};
</script>
