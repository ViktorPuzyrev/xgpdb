<template>
  <v-app
    ><TheHeader />
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

<style>
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2e7d32;
}
</style>
