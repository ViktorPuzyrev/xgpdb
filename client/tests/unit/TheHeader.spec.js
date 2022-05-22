import { createLocalVue, mount } from "@vue/test-utils";
import TheHeader from "@/components/TheHeader.vue";
import Vuetify from "vuetify";

const localVue = createLocalVue();

describe("TheHeader.vue", () => {
  let vuetify;
  let stubs;
  let options;

  beforeEach(() => {
    vuetify = new Vuetify();
    stubs = { TheFilter: true, routerLink: true };
    options = { localVue, vuetify, stubs };
  });

  it("clicks menu button", () => {
    const wrapper = mount(TheHeader, { ...options });
    wrapper.find("button").trigger("click");
    expect(wrapper.vm.drawer).toBe(true);
  });

  it("matches the snapshot", () => {
    const wrapper = mount(TheHeader, { ...options });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
