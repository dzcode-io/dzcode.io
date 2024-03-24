/// <reference types="cypress" />

describe("Landing Page", () => {
  it("should redirect to `/Contribute` when clicking on `Make a contribution` button", () => {
    cy.visit("/");
    cy.get('[data-testid="contribute-button"]').click();
    cy.url().should("contain", "/Contribute");
  });

  it("should redirect to `/FAQ` when clicking on `Do you have a question?` button", () => {
    cy.visit("/");
    cy.get('[data-testid="faq-button"]').click();
    cy.url().should("contain", "/FAQ");
  });
});
