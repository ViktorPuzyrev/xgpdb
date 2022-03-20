<template>
  <div>
    <v-app-bar color="green darken-3" dense flat>
      <router-link
        :to="{ name: 'Main' }"
        style="text-decoration: none; color: white"
      >
        <v-app-bar-title class="text-h4">XGPdb</v-app-bar-title></router-link
      >
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>

<style></style>
