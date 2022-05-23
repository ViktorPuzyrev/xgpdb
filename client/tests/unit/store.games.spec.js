import gamesModule from "@/store/modules/games";
import games from "../unit/mock.games";

describe("store.games.getters", () => {
  it("returns loading status", () => {
    const state = {
      loading: true,
    };
    expect(gamesModule.getters.loadingStatus(state)).toBe(true);
  });

  it("returns all games", () => {
    const state = {
      games,
    };
    expect(gamesModule.getters.allGames(state)).toBe(games);
  });

  it("returns game by id", () => {
    const state = {
      games,
    };
    expect(gamesModule.getters.gameById(state)("C3KLDKZBHNCZ")).toBe(games[2]);
  });
});

describe("store.games.mutations", () => {
  it("updates state with payload", () => {
    const state = {
      games: [],
      loading: true,
      dbUpdate: "",
    };
    const payload = { games, dbUpdate: "11.11.22" };
    gamesModule.mutations.updateState(state, payload);
    expect(state.games).toEqual(games);
    expect(state.loading).toBe(false);
    expect(state.dbUpdate).toBe("11.11.22");
  });
});

describe("store.games.actions", () => {
  it("gets data from API", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(games),
      })
    );
    const commit = jest.fn();
    await gamesModule.actions.initData({ commit });
    expect(commit).toBeCalledWith("updateState", games);
  });
});
