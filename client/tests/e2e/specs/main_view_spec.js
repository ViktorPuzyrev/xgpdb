describe("Desktop main view test", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.intercept("GET", "/api/xgpdb/", { fixture: "API.json" });
    cy.visit("/");
    cy.get(".flex-wrap").find(".v-card").as("gameCards");
  });

  it("searches by title and description", () => {
    cy.get("input").its(0).as("searchQuery").type("Forza Horizon 4");
    cy.get("@gameCards").should("have.length", 1).contains("Forza Horizon 4");
    cy.get("button").its(1).click();
    cy.get("input").its(1).check({ force: true });
    cy.get("@searchQuery").type("C.A.M.P.");
    cy.get("@gameCards").should("have.length", 1).contains("Fallout 76");
  });

  it("filters by genre", () => {
    cy.get("button").contains("Все жанры").click();
    cy.get("input").its(5).check({ force: true });
    cy.get("@gameCards").should("have.length", 1).contains("Forza Horizon 4");
  });

  it("filters by feature", () => {
    cy.get("button").contains("Все функции").click();
    cy.get("input").its(20).check({ force: true });
    cy.get("@gameCards").should("have.length", 1).contains("Forza Horizon 4");
  });

  it("filters by localization", () => {
    cy.get("input").its(29).check({ force: true });
    cy.get("@gameCards").should("have.length", 1).contains("FOR HONOR");
  });

  it("resets the filter on click of the Clear button", () => {
    cy.get("input").its(0).type("FOR HONOR");
    cy.get("input").its(3).check({ force: true });
    cy.get("input").its(25).check({ force: true });
    cy.get("input").its(29).check({ force: true });
    cy.get("@gameCards").should("have.length", 1).contains("FOR HONOR");
    cy.get("button").contains("Очистить").click();
    cy.get("@gameCards").should("have.length", 4);
  });

  it("has a pop-up window with statistics", () => {
    cy.get("button").contains("Статистика XGP").click();
    cy.contains("Общая статистика Xbox Game Pass");
  });

  it("sorts by different types", () => {
    cy.get(".flex-wrap").find(".v-card").its(0).contains("Forza Horizon 4");
    cy.get(".v-select").its(0).parent().as("sortBy").click();
    cy.get(".v-menu__content").contains("Название").click();
    cy.get(".flex-wrap").find(".v-card").its(0).contains("Fallout 4");
    cy.get("@sortBy").click();
    cy.get(".v-menu__content").contains("MS рейтинг").click();
    cy.get(".flex-wrap").find(".v-card").its(0).contains("Forza Horizon 4");
    cy.get("@sortBy").click();
    cy.get(".v-menu__content").contains("OC рейтинг").click();
    cy.get(".flex-wrap").find(".v-card").its(3).contains("Fallout 76");
  });

  it("reverses the list on click of the Reverse button", () => {
    cy.get(".flex-wrap").find(".v-card").its(0).contains("Forza Horizon 4");
    cy.get("button").its(5).click();
    cy.get(".flex-wrap").find(".v-card").its(0).contains("Fallout 76");
  });
});
