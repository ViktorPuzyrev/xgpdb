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
  let options;

  beforeEach(() => {
    getters = {
      allGames: () => games,
    };
    store = new Vuex.Store({ getters });
    vuetify = new Vuetify();
    options = { localVue, store, vuetify };
  });

  const testsForStatistics = [
    {
      label: "shows number of games in the subscription",
      result: "4",
    },
    {
      label: "shows average Metacritic score (MS)",
      result: "77",
    },
    {
      label: "shows average Metacritic score (US)",
      result: "6.0",
    },
    {
      label: "shows games with Metacritic (MS) above 75",
      result: "3",
    },
    {
      label: "shows the cost of all games (without discounts)",
      result: "149.95",
    },
  ];
  for (const test of testsForStatistics) {
    it(test.label, () => {
      const wrapper = shallowMount(AllStatistics, { ...options });
      expect(wrapper.text()).toContain(test.result);
    });
  }

  it("matches the snapshot", () => {
    const wrapper = shallowMount(AllStatistics, { ...options });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
