import filterModule from "@/store/modules/filter";
import games from "../unit/mock.games";

describe("store.filter.getters", () => {
  it("returns filtered games list by title", () => {
    const state = {
      query: "Fallout 4",
      searchInDescription: false,
      genres: [],
      features: [],
      localization: [],
    };
    const allGames = games;
    expect(filterModule.getters.filteredGamesList(state, { allGames })).toEqual(
      [games[2]]
    );
  });

  it("returns filtered games list by descripton", () => {
    const state = {
      query: "Настал День возрождения",
      searchInDescription: true,
      genres: [],
      features: [],
      localization: [],
    };
    const allGames = games;
    expect(filterModule.getters.filteredGamesList(state, { allGames })).toEqual(
      [games[3]]
    );
  });

  it("returns filtered games list by genre", () => {
    const state = {
      query: "",
      searchInDescription: false,
      genres: ["racingAndFlying"],
      features: [],
      localization: [],
    };
    const allGames = games;
    expect(filterModule.getters.filteredGamesList(state, { allGames })).toEqual(
      [games[0]]
    );
  });

  it("returns filtered games list by features", () => {
    const state = {
      query: "",
      searchInDescription: false,
      genres: [],
      features: [
        "ultraHd",
        "onlineCoop",
        "onlineMP",
        "opitmizedXSeries",
        "xoxEnhanced",
        "fps60",
      ],
      localization: [],
    };
    const allGames = games;
    expect(filterModule.getters.filteredGamesList(state, { allGames })).toEqual(
      [games[1]]
    );
  });

  it("returns filtered games list by localization", () => {
    const state = {
      query: "",
      searchInDescription: false,
      genres: [],
      features: [],
      localization: ["audio", "interface", "subtitles"],
    };
    const allGames = games;
    expect(filterModule.getters.filteredGamesList(state, { allGames })).toEqual(
      [games[1]]
    );
  });

  it("returns sorted games list by date", () => {
    const state = {
      sortingBy: "date",
    };
    const filteredGamesList = games;
    expect(
      filterModule.getters.sortedGamesList(state, { filteredGamesList }).at(0)
    ).toEqual(games[0]);
  });

  it("returns sorted games list by title", () => {
    const state = {
      sortingBy: "ruTitle",
    };
    const filteredGamesList = games;
    expect(
      filterModule.getters.sortedGamesList(state, { filteredGamesList }).at(0)
    ).toEqual(games[2]);
  });

  it("returns sorted games list by MC(MS) rating", () => {
    const state = {
      sortingBy: "MSrating",
    };
    const filteredGamesList = games;
    expect(
      filterModule.getters.sortedGamesList(state, { filteredGamesList }).at(0)
    ).toEqual(games[0]);
  });

  it("returns reversed games list", () => {
    const state = {
      reverseSort: true,
    };
    const sortedGamesList = games;
    expect(
      filterModule.getters.reversedGamesList(state, { sortedGamesList }).at(0)
    ).toEqual(games[3]);
  });

  it("returns paginated games list", () => {
    const state = {
      gamesPerPage: 2,
    };
    const reversedGamesList = games;
    expect(
      filterModule.getters.paginatedGamesList(state, { reversedGamesList })
        .length
    ).toBe(2);
  });

  it("returns number of games list pages", () => {
    const state = {};
    const paginatedGamesList = [[], []];
    expect(filterModule.getters.pages(state, { paginatedGamesList })).toBe(2);
  });

  it("returns number of games", () => {
    const state = {};
    const sortedGamesList = games;
    expect(
      filterModule.getters.counterOfGames(state, { sortedGamesList })
    ).toBe(4);
  });
});

describe("store.filter.mutations", () => {
  const testsForMutations = [
    {
      mutation: "updateQuery",
      state: { query: "" },
      payload: "Gears",
      label: "updates query with payload",
    },
    {
      mutation: "updateSearchInDescription",
      state: { searchInDescription: true },
      payload: false,
      label: "updates search in description",
    },
    {
      mutation: "updateGenres",
      state: { genres: [] },
      payload: ["shooter"],
      label: "updates genres with payload",
    },
    {
      mutation: "updateFeatures",
      state: { features: [] },
      payload: ["ultraHd"],
      label: "updates features with payload",
    },
    {
      mutation: "updateLocalization",
      state: { localization: [] },
      payload: ["interface"],
      label: "updates localization with payload",
    },
    {
      mutation: "updateSortingBy",
      state: { sortingBy: "date" },
      payload: "ruTitle",
      label: "updates sorting by with payload",
    },
    {
      mutation: "updateReverseSort",
      state: { reverseSort: false },
      payload: true,
      label: "updates reverse sort with payload",
    },
    {
      mutation: "updateGamesPerPage",
      state: { gamesPerPage: 20, page: 1 },
      payload: 60,
      label: "updates games per page with payload",
    },
    {
      mutation: "updatePage",
      state: { page: 1 },
      payload: 2,
      label: "updates page with payload",
    },
  ];
  for (const test of testsForMutations) {
    it(test.label, () => {
      function testMutation(mutation, state, payload) {
        filterModule.mutations[mutation](state, payload);
        expect(state[Object.keys(state)[0]]).toEqual(payload);
      }
      testMutation(test.mutation, test.state, test.payload);
    });
  }
});
