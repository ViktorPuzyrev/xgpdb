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
    store = new Vuex.Store({
      getters,
    });
    vuetify = new Vuetify();
    options = { store, localVue, vuetify };
  });

  it("shows number of games in the subscription", () => {
    const wrapper = shallowMount(AllStatistics, { ...options });
    expect(wrapper.text()).toContain("4");
  });

  it("shows average Metacritic score (MS)", () => {
    const wrapper = shallowMount(AllStatistics, { ...options });
    expect(wrapper.text()).toContain("77");
  });

  it("shows average Metacritic score (US)", () => {
    const wrapper = shallowMount(AllStatistics, { ...options });
    expect(wrapper.text()).toContain("6.0");
  });

  it("shows games with Metacritic (MS) above 75", () => {
    const wrapper = shallowMount(AllStatistics, { ...options });
    expect(wrapper.text()).toContain("3");
  });

  it("shows the cost of all games (without discounts)", () => {
    const wrapper = shallowMount(AllStatistics, { ...options });
    expect(wrapper.text()).toContain("149.95");
  });

  it("matches the snapshot", () => {
    const wrapper = shallowMount(AllStatistics, { ...options });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
