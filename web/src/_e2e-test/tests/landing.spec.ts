/// <reference types="cypress" />

describe("Landing Page", () => {
  it("should redirect to `/faq` when clicking on `FAQ`", () => {
    cy.visit("/");
    cy.get('[data-testid="top-bar-to:/faq"]').click();
    cy.url().should("contain", "/faq");
  });
});
