<template>
  <v-app>
    <TheHeader />
    <v-main>
      <router-view :key="$route.path"></router-view>
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import store from "./store/";
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";

export default {
  name: "App",
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "Some Default Title";
      },
    },
  },
  components: {
    TheHeader,
    TheFooter,
  },
  methods: {
    async initData() {
      store.dispatch("initData");
    },
  },
  async created() {
    this.initData();
  },
};
</script>
