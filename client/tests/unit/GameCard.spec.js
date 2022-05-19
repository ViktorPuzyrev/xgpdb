import { createLocalVue, mount } from "@vue/test-utils";
import GameCard from "@/components/GameCard.vue";
import games from "./mock.games";
import Vuetify from "vuetify";

describe("GameCard.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  const game = games[0];
  const cardWidth = 300;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Has correct size", () => {
    const wrapper = mount(GameCard, {
      localVue,
      vuetify,
      propsData: { game, cardWidth },
    });
    const divs = wrapper.findAll(".v-responsive__content > div > div");
    expect(divs.at(0).attributes("style")).toMatch("height: 390px");
    expect(divs.at(1).attributes("style")).toContain("height: 60px");
  });
  it("Show game title", () => {
    const wrapper = mount(GameCard, {
      localVue,
      vuetify,
      propsData: { game, cardWidth },
    });
    expect(wrapper.find(".v-card__title").text()).toMatch(
      "Forza Horizon 4: стандартное издание"
    );
  });
  it("Show game genres", () => {
    const wrapper = mount(GameCard, {
      localVue,
      vuetify,
      propsData: { game, cardWidth },
    });
    expect(wrapper.find(".v-card__subtitle").text()).toMatch(
      "Гонки и авиасимуляторы"
    );
  });
  it("Has correct Microsoft Store link", () => {
    const wrapper = mount(GameCard, {
      localVue,
      vuetify,
      propsData: { game, cardWidth },
    });
    expect(wrapper.find("a").attributes("href")).toMatch(games[0].link);
  });
  it("Match snapshot", () => {
    const wrapper = mount(GameCard, {
      localVue,
      vuetify,
      propsData: { game, cardWidth },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
