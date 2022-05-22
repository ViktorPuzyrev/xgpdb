import { createLocalVue, mount } from "@vue/test-utils";
import TheFooter from "@/components/TheFooter.vue";
import Vuetify from "vuetify";

describe("TheFooter.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let options;

  beforeEach(() => {
    vuetify = new Vuetify();
    options = { localVue, vuetify };
  });

  it("has the right date", () => {
    const wrapper = mount(TheFooter, {
      ...options,
      computed: {
        dbUpdate: () => "11.11.22",
      },
    });
    expect(wrapper.text()).toMatch("Обновление базы: 11.11.22");
  });

  it("matches the snapshot", () => {
    const wrapper = mount(TheFooter, { ...options });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
