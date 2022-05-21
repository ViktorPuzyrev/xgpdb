import { createLocalVue, mount } from "@vue/test-utils";
import LoadingGameCard from "@/components/LoadingGameCard.vue";
import Vuetify from "vuetify";

describe("LoadingGameCard.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let cardWidth;
  let options;

  beforeEach(() => {
    vuetify = new Vuetify();
    cardWidth = 300;
    options = { localVue, vuetify, propsData: { cardWidth } };
  });

  it("has the right size", () => {
    const wrapper = mount(LoadingGameCard, { ...options });
    const style = wrapper.find(".v-card.v-sheet").attributes("style");
    expect(style).toContain("height: 594px");
    expect(style).toContain("width: 300px");
  });

  it("matches the snapshot", () => {
    const wrapper = mount(LoadingGameCard, { ...options });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
