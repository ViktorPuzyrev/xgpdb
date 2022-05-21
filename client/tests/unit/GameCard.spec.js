import { createLocalVue, mount } from "@vue/test-utils";
import GameCard from "@/components/GameCard.vue";
import games from "./mock.games";
import Vuetify from "vuetify";

describe("GameCard.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let game;
  let cardWidth;
  let options;

  beforeEach(() => {
    vuetify = new Vuetify();
    game = games[0];
    cardWidth = 300;
    options = { localVue, vuetify, propsData: { game, cardWidth } };
  });

  it("has the right size", () => {
    const wrapper = mount(GameCard, { ...options });
    const divs = wrapper.findAll(".v-responsive__content > div > div");
    expect(divs.at(0).attributes("style")).toMatch("height: 390px");
    expect(divs.at(1).attributes("style")).toContain("height: 60px");
  });

  it("shows game title", () => {
    const wrapper = mount(GameCard, { ...options });
    expect(wrapper.find(".v-card__title").text()).toBe(
      "Forza Horizon 4: стандартное издание"
    );
  });

  it("shows game genres", () => {
    const wrapper = mount(GameCard, { ...options });
    expect(wrapper.find(".v-card__subtitle").text()).toBe(
      "Гонки и авиасимуляторы"
    );
  });

  it("has the right Microsoft Store link", () => {
    const wrapper = mount(GameCard, { ...options });
    expect(wrapper.find("a").attributes("href")).toBe(games[0].link);
  });

  it("matches the snapshot", () => {
    const wrapper = mount(GameCard, { ...options });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
