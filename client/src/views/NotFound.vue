<template>
  <v-container class="text-center"
    ><h1>Страница не найдена</h1>
    <router-link :to="{ name: 'Main' }"
      >Перейти на главную</router-link
    ></v-container
  >
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style></style>
