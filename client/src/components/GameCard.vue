<template>
  <v-card class="ma-3 mt-0 d-flex flex-column" width="250">
    <v-img :src="game.cover" width="100%">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-row no-gutters style="height: 325px">
            <v-fade-transition>
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
          </v-row>
        </template>
      </v-hover>
      <v-row
        no-gutters
        align="center"
        style="height: 50px; background-color: #2e7d32"
        ><v-col>
          <v-tooltip top color="black">
            <template v-slot:activator="{ on, attrs }">
              <p
                v-if="game.MSrating"
                class="white--text text-center text-h5 ma-0"
                v-bind="attrs"
                v-on="on"
              >
                {{ game.MSrating }}
              </p>
              <p
                v-bind="attrs"
                v-on="on"
                v-else
                class="white--text text-center text-h5 ma-0"
              >
                ==
              </p>
            </template>
            <span>Microsoft Store</span>
          </v-tooltip> </v-col
        ><v-col>
          <v-tooltip top color="black">
            <template v-slot:activator="{ on, attrs }">
              <div
                v-bind="attrs"
                v-on="on"
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
                <p v-else class="white--text text-center text-h5 ma-0">==</p>
              </div></template
            >
            <span>Metacritic Metascore</span>
          </v-tooltip></v-col
        ><v-col>
          <v-tooltip top color="black">
            <template v-slot:activator="{ on, attrs }">
              <div
                v-bind="attrs"
                v-on="on"
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
                <p v-else class="white--text text-center text-h5 ma-0">==</p>
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
                style="width: 45px"
              ></v-img>
              <p
                v-bind="attrs"
                v-on="on"
                v-else
                class="white--text text-center text-h5 ma-0"
              >
                ==
              </p>
            </template>
            <span>Opencritic</span>
          </v-tooltip></v-col
        ><v-col
          ><v-tooltip top color="black">
            <template v-slot:activator="{ on, attrs }">
              <v-img
                v-bind="attrs"
                v-on="on"
                v-if="game.MCMustPlay"
                src="@/assets/mc-mustplay.svg"
                style="width: 45px"
              ></v-img
            ></template>
            <span>Metacritic Must Play</span>
          </v-tooltip>
        </v-col></v-row
      > </v-img
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
import gameDataHandler from "../mixins/gameDataHandler.vue";

export default {
  name: "GameCard",
  mixins: [gameDataHandler],
  props: ["game"],
};
</script>
