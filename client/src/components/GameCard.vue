<template>
  <v-card class="ma-3 mt-0 d-flex flex-column" width="250">
    <v-img :src="game.cover" width="100%">
      <v-row no-gutters style="height: 325px"></v-row>
      <v-row
        no-gutters
        align="center"
        style="height: 50px; background-color: #2e7d32"
        ><v-col>
          <p v-if="game.MSrating" class="white--text text-center text-h5 ma-0">
            {{ game.MSrating }}
          </p>
          <p v-else class="white--text text-center text-h5 ma-0">N/A</p> </v-col
        ><v-col
          ><div
            class="ma-auto"
            style="
              width: 45px;
              height: 45px;
              background-color: #6c3;
              border-radius: 5px;
              padding-top: 7px;
            "
          >
            <p
              v-if="game.MCRating"
              class="white--text text-center text-h5 ma-0"
            >
              {{ game.MCRating }}
            </p>
            <p v-else class="white--text text-center text-h5 ma-0">N/A</p>
          </div></v-col
        ><v-col>
          <div
            class="ma-auto"
            style="
              width: 45px;
              height: 45px;
              background-color: #6c3;
              border-radius: 50%;
              padding-top: 7px;
            "
          >
            <p
              v-if="game.MCUserScore"
              class="white--text text-center text-h5 ma-0"
            >
              {{ game.MCUserScore }}
            </p>
            <p v-else class="white--text text-center text-h5 ma-0">N/A</p>
          </div> </v-col
        ><v-col>
          <v-img v-if="OCSticker" :src="OCSticker" style="width: 45px"></v-img>
          <p v-else class="white--text text-center text-h5 ma-0">N/A</p> </v-col
        ><v-col>
          <v-img
            v-if="game.MCMustPlay"
            src="@/assets/mc-mustplay.svg"
            style="width: 45px"
          ></v-img> </v-col
      ></v-row> </v-img
    ><v-divider></v-divider
    ><v-card-title
      class="d-inline-block pa-2 text-truncate"
      style="max-width: 300px"
      >{{ game.ruTitle }}</v-card-title
    >
    <v-card-subtitle
      class="d-inline-block pa-2 text-truncate"
      style="max-width: 250px"
      >{{ genres }}</v-card-subtitle
    >
    <v-card-actions class="pt-0">
      <v-row class="d-flex justify-space-between">
        <v-col class="pb-0"
          ><v-btn block color="green darken-3"
            ><a
              :href="game.link"
              class="text-decoration-none white--text"
              target="_blank"
              >Microsoft<v-icon right>mdi-share</v-icon></a
            >
          </v-btn>
        </v-col>
        <v-col
          ><v-btn block
            ><router-link
              :to="{
                name: 'Game',
                params: { id: game.id, title: '123' },
              }"
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
