import { createLocalVue, mount } from "@vue/test-utils";
import StickersPanel from "@/components/StickersPanel.vue";
import games from "./mock.games";
import Vuetify from "vuetify";

describe("StickersPanel.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let game;
  let width;

  beforeEach(() => {
    vuetify = new Vuetify();
    game = games[0];
    width = 300;
  });

  it("shows ratings", () => {
    const wrapper = mount(StickersPanel, {
      localVue,
      vuetify,
      propsData: { game, width },
    });
    const ratings = wrapper.findAll(".white--text.ma-0");
    expect(ratings.at(0).text()).toBe("4.9");
    expect(ratings.at(1).text()).toBe("92");
    expect(ratings.at(2).text()).toBe("8.3");
  });

  it("shows stickers", () => {
    const wrapper = mount(StickersPanel, {
      localVue,
      vuetify,
      propsData: { game, width },
    });
    expect(wrapper.vm.OCSticker).toBe("mighty-man.png");
    expect(wrapper.findAll(".v-image__image--contain").at(1).exists()).toBe(
      true
    );
  });
  it("matches the snapshot", () => {
    const wrapper = mount(StickersPanel, {
      localVue,
      vuetify,
      propsData: { game, width },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
