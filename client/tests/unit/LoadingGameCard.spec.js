import { createLocalVue, mount } from "@vue/test-utils";
import LoadingGameCard from "@/components/LoadingGameCard.vue";
import Vuetify from "vuetify";

describe("LoadingGameCard.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  const cardWidth = 300;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Has correct size", () => {
    const wrapper = mount(LoadingGameCard, {
      localVue,
      vuetify,
      propsData: { cardWidth },
    });
    const style = wrapper.find(".v-card.v-sheet").attributes("style");
    expect(style).toContain("height: 594px");
    expect(style).toContain("width: 300px");
  });
  it("Match snapshot", () => {
    const wrapper = mount(LoadingGameCard, {
      localVue,
      vuetify,
      propsData: { cardWidth },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
