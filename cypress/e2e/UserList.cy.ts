describe("UserComponent", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="cypress-table"]').should("exist");
    cy.get('input[type="text"]').should("be.visible").type("John");

    cy.contains("Preview Photo Gallery").first().click();

    it("Clicks the Preview Photo Gallery button", () => {
      cy.get("[data-testid=preview-photo-gallery-button]").click();
      // Add assertions
    });

    it("Clicks the Create New Album button", () => {
      cy.get("[data-testid=create-new-album-button]").click();
      // Add assertions
    });
  });
});
