import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import AllStatistics from "@/components/AllStatistics.vue";
import games from "./mock.games";
import Vuetify from "vuetify";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AllStatistics.vue", () => {
  let getters;
  let store;
  let vuetify;

  beforeEach(() => {
    getters = {
      allGames: () => games,
    };
    store = new Vuex.Store({
      getters,
    });
    vuetify = new Vuetify();
  });

  it("Show number of games in the subscription", () => {
    const wrapper = shallowMount(AllStatistics, { store, localVue, vuetify });
    expect(wrapper.text()).toContain("4");
  });
  it("Show average Metacritic score (MS)", () => {
    const wrapper = shallowMount(AllStatistics, { store, localVue, vuetify });
    expect(wrapper.text()).toContain("77");
  });
  it("Show average Metacritic score (US)", () => {
    const wrapper = shallowMount(AllStatistics, { store, localVue, vuetify });
    expect(wrapper.text()).toContain("6.0");
  });
  it("Show games with Metacritic (MS) above 75", () => {
    const wrapper = shallowMount(AllStatistics, { store, localVue, vuetify });
    expect(wrapper.text()).toContain("3");
  });
  it("Show the cost of all games (without discounts)", () => {
    const wrapper = shallowMount(AllStatistics, { store, localVue, vuetify });
    expect(wrapper.text()).toContain("149.95");
  });
  it("Match snapshot", () => {
    const wrapper = shallowMount(AllStatistics, { store, localVue, vuetify });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
