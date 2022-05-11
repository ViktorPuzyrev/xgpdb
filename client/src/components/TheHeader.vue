<template>
  <div>
    <v-app-bar color="green darken-3" app dense flat>
      <v-app-bar-nav-icon
        class="d-lg-none"
        dark
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <router-link
        :to="{ name: 'Main' }"
        style="text-decoration: none; color: white"
      >
        <v-app-bar-title class="text-h4">XGPdb</v-app-bar-title></router-link
      >
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <TheFilter />
    </v-navigation-drawer>
  </div>
</template>

<script>
import TheFilter from "./TheFilter";

export default {
  name: "TheHeader",
  components: {
    TheFilter,
  },
  data() {
    return {
      drawer: null,
    };
  },
};
</script>

<style></style>
