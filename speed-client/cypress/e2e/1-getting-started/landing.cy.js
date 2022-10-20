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

describe('elements renders correctly', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://cise-speed-2022.herokuapp.com')
  })

  //Make sure the landing page has the expected URL
  it('Should be on school page', () => {
    cy.url().should('include', 'https://cise-speed-2022.herokuapp.com')
  })

  //Make sure the landing page contains two buttons
  it('Contains two buttons', () => {
    cy.findByRole('button', {name: /Search article/i}).should('exist')
    cy.findByRole('button', {name: /Submit Form/i}).should('exist')
  })
  
})

describe('redirects to the search page if the user clicks on search', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://cise-speed-2022.herokuapp.com')
  })
  
  //Click on search article
  it('Clicks on search article', () => {
    cy.findByRole('button', {name: /Search article/i}).click()

    //Make sure the search page has the expected URL
    cy.url().should('include', 'https://cise-speed-2022.herokuapp.com/search')
  }) 
})

describe('redirects to the search page if the user clicks on search', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://cise-speed-2022.herokuapp.com')
  })
  
  //Click on search article
  it('Clicks on search article', () => {
    cy.findByRole('button', {name: /Submit form/i}).click()

    //Make sure the search page has the expected URL
    cy.url().should('include', 'https://cise-speed-2022.herokuapp.com/submitterform')
  }) 
})