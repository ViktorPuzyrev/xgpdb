<template>
  <v-footer class="mt-2" padless color="green darken-3">
    <v-col class="text-center white--text" cols="12">
      <span>Обновление базы: {{ dbUpdate }}</span>
    </v-col>
  </v-footer>
</template>

<script>
import store from "../store";

/**
 * Компонент футера.
 * @vue-computed {String} dbUpdate - Дата последнего обновления базы данных
 */

export default {
  name: "TheFooter",
  computed: {
    dbUpdate() {
      return store.state.games.dbUpdate;
    },
  },
};
</script>

<style></style>
