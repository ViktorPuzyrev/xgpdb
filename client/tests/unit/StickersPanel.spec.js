import { createLocalVue, mount } from "@vue/test-utils";
import StickersPanel from "@/components/StickersPanel.vue";
import games from "./mock.games";
import Vuetify from "vuetify";

describe("StickersPanel.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  const game = games[0];
  const width = 300;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Show ratings", () => {
    const wrapper = mount(StickersPanel, {
      localVue,
      vuetify,
      propsData: { game, width },
    });
    const ratings = wrapper.findAll(".white--text.ma-0");
    expect(ratings.at(0).text()).toMatch("4.9");
    expect(ratings.at(1).text()).toMatch("92");
    expect(ratings.at(2).text()).toMatch("8.3");
  });

  it("Show stickers", () => {
    const wrapper = mount(StickersPanel, {
      localVue,
      vuetify,
      propsData: { game, width },
    });
    expect(wrapper.vm.OCSticker).toMatch("mighty-man.png");
    expect(wrapper.findAll(".v-image__image--contain").at(1).exists()).toBe(
      true
    );
  });
  it("Match snapshot", () => {
    const wrapper = mount(StickersPanel, {
      localVue,
      vuetify,
      propsData: { game, width },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
