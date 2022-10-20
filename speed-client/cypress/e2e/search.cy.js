/// <reference types="cypress" />

describe('elements renders correctly', () => {
    beforeEach(() => {
      cy.visit('https://cise-speed-2022.herokuapp.com/search')
    })
  
    //Make sure the search page contains a dropdown menu
    it('Should contains a dropdown menu', () => {
      cy.findByRole('button', {
        name: /select a software engineering practice/i
      }).should('exist')
    })

    it('Should toggle to the next components in the page when selecting an option', () => {
      cy.findByRole('button', {
        name: /select a software engineering practice/i
      }).click()

      cy.wait(500)

      cy.findByRole('button', {
        name: /test\-driven development/i
      }).click()

      cy.findByRole('button', {
        name: /select a claim for test\-driven development/i
      }).should('exist')
    })
})

describe('toggle elements', () => {
  beforeEach(() => {
    cy.visit('https://cise-speed-2022.herokuapp.com/search')

    cy.findByRole('button', {
      name: /select a software engineering practice/i
    }).click()

    cy.wait(500)

    cy.findByRole('button', {
      name: /test\-driven development/i
    }).click()
  })

  //Make sure the search page contains a dropdown menu
  it('Should go back to the first component', () => {
    cy.findByRole('link', {
      name: /select another practice/i
    }).click()

    cy.findByRole('button', {
      name: /select a software engineering practice/i
    }).should('exist')
  })

})
