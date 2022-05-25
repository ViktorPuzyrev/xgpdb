import { createLocalVue, mount } from "@vue/test-utils";
import GameView from "@/views/GameView.vue";
import games from "./mock.games";
import Vuetify from "vuetify";

const localVue = createLocalVue();

describe("GameView.vue", () => {
  let options;
  let vuetify;
  let mocks;
  let computed;

  beforeEach(() => {
    vuetify = new Vuetify();
    mocks = {
      $route: {
        params: { id: "9PNJXVCVWD4K" },
      },
    };
    computed = {
      game: () => games[0],
    };
    options = { localVue, vuetify, mocks, computed };
  });

  it("gets the correct game id from $route.params", () => {
    const wrapper = mount(GameView, { ...options });
    expect(wrapper.vm.gameId).toBe("9PNJXVCVWD4K");
  });

  it("matches the snapshot", () => {
    const wrapper = mount(GameView, { ...options });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
