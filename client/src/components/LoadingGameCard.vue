<template>
  <v-card
    class="ma-3 mt-0 d-flex flex-column"
    :width="cardWidth"
    :height="cardWidth * 1.98"
  >
    <div :style="{ height: cardWidth * 1.3 + 'px' }" class="d-flex">
      <v-progress-circular
        :size="70"
        :width="7"
        color="blue-grey lighten-4"
        class="ma-auto"
        indeterminate
      ></v-progress-circular>
    </div>
    <div
      :style="{
        height: cardWidth * 0.2 + 'px',
        backgroundColor: '#CFD8DC',
      }"
    ></div>
    <v-card-title class="pa-2">Title</v-card-title>
    <v-card-subtitle class="pa-2">Genre</v-card-subtitle>
    <v-card-actions class="pt-0">
      <v-row class="d-flex">
        <v-col><v-btn block color="blue-grey lighten-4"> </v-btn> </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LoadingGameCard",
  props: { cardWidth: { type: Number, required: true } },
};
</script>
