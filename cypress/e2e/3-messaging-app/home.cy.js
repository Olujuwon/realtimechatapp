/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Messaging app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('')
  })

  it('renders correctly', () => {
    /*cy.visit('')*/
    cy.get('div.App').should("exist");
    cy.get('span.addContact').should("exist");
    cy.get('.contactWrapper0', { timeout: 30000 }).closest("ul").click();
    cy.get('.inputMessage', { timeout: 0 }).type("Hello from the other side!, its a test!");
    cy.get('.sendMessage', { timeout: 0 }).click();

    /*cy.contains('contactWrapper0', { timeout: 10000 }).click();*/
  })

})
