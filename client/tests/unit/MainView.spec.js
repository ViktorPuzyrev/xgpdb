import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import MainView from "@/views/MainView.vue";
import games from "./mock.games";
import Vuetify from "vuetify";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("MainView.vue", () => {
  let getters;
  let store;
  let vuetify;
  let computed;
  let options;

  beforeEach(() => {
    getters = {
      counterOfGames: () => 4,
      paginatedGamesList: () => [games],
      pages: () => 1,
      loadingStatus: () => false,
    };
    store = new Vuex.Store({ getters });
    vuetify = new Vuetify();
    computed = {
      games: () => games,
      cardWidth: () => 230,
    };
    options = { localVue, store, vuetify, computed };
  });

  it("gets the correct number of games", () => {
    const wrapper = mount(MainView, { ...options });
    expect(wrapper.find("span").text()).toBe("Игр в списке: 4");
  });

  it("has a sorting select with 6 items", () => {
    const wrapper = mount(MainView, { ...options });
    const items = wrapper.find(".v-select").props("items");
    expect(items.length).toBe(6);
  });

  it("has item date selected by default", () => {
    const wrapper = mount(MainView, { ...options });
    expect(wrapper.find(".v-select").props("value")).toBe("date");
  });

  it("reverse button starts mutation", () => {
    store.commit = jest.fn();
    const wrapper = mount(MainView, { ...options });
    const reverseButton = wrapper.findAll("button").at(1);
    reverseButton.trigger("click");
    expect(store.commit).toBeCalledWith("updateReverseSort");
  });

  it("has a games per page select with 3 items", () => {
    const wrapper = mount(MainView, { ...options });
    const items = wrapper.findAll(".v-select").at(1).props("items");
    expect(items.length).toBe(3);
  });

  it("has item 20 selected by default", () => {
    const wrapper = mount(MainView, { ...options });
    expect(wrapper.findAll(".v-select").at(1).props("value")).toBe(20);
  });

  it("current page number is 1", () => {
    const wrapper = mount(MainView, { ...options });
    expect(wrapper.findAll("button").at(7).attributes("aria-label")).toBe(
      "Current Page, Page 1"
    );
  });

  it("matches the snapshot", () => {
    const wrapper = mount(MainView, { ...options });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
