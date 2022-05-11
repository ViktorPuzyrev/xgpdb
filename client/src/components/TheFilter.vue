<template>
  <div class="pa-2">
    <v-card-title class="text-center py-1">Поиск</v-card-title>
    <v-form v-on:submit.prevent>
      <v-text-field
        v-model="gameTitle"
        label="Название игры..."
        dense
        solo
        clearable
        hide-details
        class="mt-0"
        color="green darken-3"
      ></v-text-field>
      <v-checkbox
        v-model="searchInDescription"
        label="искать в описании"
        hide-details
        class="mt-2"
        color="green darken-3"
      ></v-checkbox>
      <v-card class="mt-3">
        <v-card-title class="pt-2 pb-0">Жанр</v-card-title>
        <v-list class="py-0">
          <v-list-item-group v-model="genres" multiple>
            <template v-for="(item, i) in mainGenres">
              <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>
              <v-list-item
                v-else
                :key="`item-${i}`"
                :value="item.value"
                active-class="green darken-3 white--text"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      color="white"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
          <v-expand-transition>
            <div v-show="showGenres">
              <v-list-item-group v-model="genres" multiple>
                <template v-for="(item, i) in secondaryGenres">
                  <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>
                  <v-list-item
                    v-else
                    :key="`item-${i}`"
                    :value="item.value"
                    active-class="green darken-3 white--text"
                  >
                    <template v-slot:default="{ active }">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.text"
                        ></v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          color="white"
                        ></v-checkbox>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group></div
          ></v-expand-transition>
          <v-btn @click="showGenres = !showGenres" text block>
            {{ !showGenres ? "Все жанры" : "Скрыть" }}
          </v-btn>
        </v-list>
      </v-card>
      <v-card class="mt-2">
        <v-card-title class="pt-2 pb-0">Функции</v-card-title>
        <v-list class="py-0">
          <v-list-item-group v-model="features" multiple>
            <template v-for="(item, i) in mainFeatures">
              <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>
              <v-list-item
                v-else
                :key="`item-${i}`"
                :value="item.value"
                active-class="green darken-3 white--text"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      color="white"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
          <v-expand-transition>
            <div v-show="showFeatures">
              <v-list-item-group v-model="features" multiple>
                <template v-for="(item, i) in secondaryFeatures">
                  <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>
                  <v-list-item
                    v-else
                    :key="`item-${i}`"
                    :value="item.value"
                    active-class="green darken-3 white--text"
                  >
                    <template v-slot:default="{ active }">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.text"
                        ></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          color="white"
                        ></v-checkbox>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group></div
          ></v-expand-transition>
          <v-btn @click="showFeatures = !showFeatures" text block>
            {{ !showFeatures ? "Все функции" : "Скрыть" }}
          </v-btn>
        </v-list>
      </v-card>
      <v-card class="mt-2">
        <v-card-title class="pt-2 pb-0">Локализация</v-card-title>
        <v-list class="py-0">
          <v-list-item-group v-model="localization" multiple>
            <template v-for="(item, i) in ruLocalization">
              <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>
              <v-list-item
                v-else
                :key="`item-${i}`"
                :value="item.value"
                active-class="green darken-3 white--text"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      color="white"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-btn block class="mt-2 white--text" color="red" @click="clearAll"
        >Очистить</v-btn
      >
      <AllStatistics />
    </v-form>
  </div>
</template>

<script>
import store from "../store";
import { mapMutations } from "vuex";
import AllStatistics from "./AllStatistics.vue";

export default {
  name: "TheFilter",
  components: { AllStatistics },
  data() {
    return {
      showGenres: false,
      mainGenres: [
        { value: "shooter", text: "Шутеры" },
        { value: "actionAndAdventure", text: "Экшн и приключения" },
        { value: "rolePlaying", text: "Ролевые игры" },
      ],
      secondaryGenres: [
        { value: "racingAndFlying", text: "Гонки и авиасимуляторы" },
        { value: "strategy", text: "Стратегии" },
        { value: "classic", text: "Классика" },
        { value: "sport", text: "Спор" },
        { value: "platformer", text: "Аркады" },
        { value: "puzzleAndTrivia", text: "Головоломки и викторины" },
        { value: "other", text: "Другие" },
        { value: "simulation", text: "Симуляторы" },
        { value: "familyAndKids", text: "Семья и дети" },
        { value: "fighting", text: "Борьба" },
        { value: "MOBA", text: "MOBA" },
        { value: "music", text: "Музыка" },
      ],
      showFeatures: false,
      mainFeatures: [
        { value: "ultraHd", text: "4K Ultra HD" },
        {
          value: "opitmizedXSeries",
          text: "Xbox Series X|S",
        },
        { value: "xoxEnhanced", text: "Xbox One X" },
      ],
      secondaryFeatures: [
        { value: "singlePlayer", text: "Один игрок" },
        { value: "onlineCoop", text: "Сетевой кооп" },
        { value: "onlineMP", text: "Сетевой мультиплеер" },
        { value: "localCoop", text: "Локальный кооп" },
        {
          value: "localMP",
          text: "Локальный мультиплеер",
        },
        { value: "fps60", text: "60 FPS" },
        { value: "fps120", text: "120 FPS" },
      ],
      ruLocalization: [
        { value: "interface", text: "Итнтерфейс" },
        { value: "subtitles", text: "Субтитры" },
        { value: "audio", text: "Аудио" },
      ],
    };
  },
  computed: {
    gameTitle: {
      get() {
        return store.state.filter.gameTitle;
      },
      set(value) {
        this.updateGameTitle(value);
      },
    },
    searchInDescription: {
      get() {
        return store.state.filter.searchInDescription;
      },
      set(value) {
        this.updateSearchInDescription(value);
      },
    },
    genres: {
      get() {
        return store.state.filter.genres;
      },
      set(value) {
        this.updateGenres(value);
      },
    },
    features: {
      get() {
        return store.state.filter.features;
      },
      set(value) {
        this.updateFeatures(value);
      },
    },
    localization: {
      get() {
        return store.state.filter.localization;
      },
      set(value) {
        this.updateLocalization(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "updateGameTitle",
      "updateSearchInDescription",
      "updateGenres",
      "updateFeatures",
      "updateLocalization",
    ]),
    clearAll() {
      if (
        this.gameTitle ||
        this.genres.length ||
        this.features.length ||
        this.localization.length
      ) {
        window.scrollTo({
          top: 0,
        });
      }
      (this.gameTitle = null),
        (this.searchInDescription = false),
        (this.genres = []),
        (this.features = []),
        (this.localization = []);
      this.showGenres = false;
      this.showFeatures = false;
    },
  },
};
</script>

<style></style>
