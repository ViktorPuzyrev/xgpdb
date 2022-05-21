import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import TheFilter from "@/components/TheFilter.vue";
import Vuetify from "vuetify";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("TheFilter.vue", () => {
  let mutations;
  let store;
  let vuetify;
  let stubs;
  let options;

  beforeEach(() => {
    mutations = {
      updateQuery: jest.fn(),
      updateSearchInDescription: jest.fn(),
    };
    store = new Vuex.Store({ mutations });
    vuetify = new Vuetify();
    stubs = { AllStatistics: true };
    options = { store, localVue, vuetify, stubs };
  });

  it("renders search query", () => {
    const wrapper = mount(TheFilter, {
      ...options,
      computed: {
        query: () => "Halo",
      },
    });
    const textInput = wrapper.find("input[type='text']");
    expect(textInput.element.value).toBe("Halo");
  });

  it("input search query triggers mutation", async () => {
    const wrapper = mount(TheFilter, { ...options });
    const textInput = wrapper.find("input[type='text']");
    await textInput.setValue("Gears");
    expect(textInput.element.value).toBe("Gears");
    expect(mutations.updateQuery).toBeCalledWith({}, "Gears");
  });

  it("renders search in description checkbox is checked", () => {
    const wrapper = mount(TheFilter, {
      ...options,
      computed: {
        searchInDescription: () => true,
      },
    });
    const checkbox = wrapper.find("input[type='checkbox']");
    expect(checkbox.element.checked).toBeTruthy();
  });

  it("search in description checkbox triggers mutation", async () => {
    const wrapper = mount(TheFilter, { ...options });
    const checkbox = wrapper.find("input[type='checkbox']");
    await checkbox.setChecked();
    expect(mutations.updateSearchInDescription).toBeCalledWith({}, true);
  });

  it("renders shooter genre checkbox is checked", () => {
    const wrapper = mount(TheFilter, {
      ...options,
      computed: {
        genres: () => ["shooter"],
      },
    });
    const checkbox = wrapper.findAll("input[type='checkbox']").at(1);
    expect(checkbox.element.checked).toBeTruthy();
  });

  it("shooter genre checkbox triggers mutation", () => {
    store.commit = jest.fn();
    const wrapper = mount(TheFilter, { ...options });
    const checkbox = wrapper.findAll("input[type='checkbox']").at(1);
    checkbox.trigger("click");
    expect(store.commit).toBeCalledWith("updateGenres", ["shooter"]);
  });

  it("renders 4K Ultra HD feature checkbox is checked", () => {
    const wrapper = mount(TheFilter, {
      ...options,
      computed: {
        features: () => ["ultraHd"],
      },
    });
    const checkbox = wrapper.findAll("input[type='checkbox']").at(16);
    expect(checkbox.element.checked).toBeTruthy();
  });

  it("4K Ultra HD feature checkbox triggers mutation", () => {
    store.commit = jest.fn();
    const wrapper = mount(TheFilter, { ...options });
    const checkbox = wrapper.findAll("input[type='checkbox']").at(16);
    checkbox.trigger("click");
    expect(store.commit).toBeCalledWith("updateFeatures", ["ultraHd"]);
  });

  it("renders interface localization checkbox is checked", () => {
    const wrapper = mount(TheFilter, {
      ...options,
      computed: {
        localization: () => ["interface"],
      },
    });
    const checkbox = wrapper.findAll("input[type='checkbox']").at(26);
    expect(checkbox.element.checked).toBeTruthy();
  });

  it("interface localization checkbox triggers mutation", () => {
    store.commit = jest.fn();
    const wrapper = mount(TheFilter, { ...options });
    const checkbox = wrapper.findAll("input[type='checkbox']").at(26);
    checkbox.trigger("click");
    expect(store.commit).toBeCalledWith("updateLocalization", ["interface"]);
  });

  it("matches the snapshot", () => {
    const wrapper = mount(TheFilter, { ...options });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
