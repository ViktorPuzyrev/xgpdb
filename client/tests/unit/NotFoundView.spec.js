import { createLocalVue, mount } from "@vue/test-utils";
import NotFoundView from "@/views/NotFoundView.vue";
import Vuetify from "vuetify";

describe("NotFoundView.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let stubs;
  let options;

  beforeEach(() => {
    vuetify = new Vuetify();
    stubs = { routerLink: true };
    options = { localVue, vuetify, stubs };
  });

  it("has the right text", () => {
    const wrapper = mount(NotFoundView, { ...options });
    expect(wrapper.text()).toBe("Страница не найдена Перейти на главную");
  });

  it("matches the snapshot", () => {
    const wrapper = mount(NotFoundView, { ...options });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
