describe('Suite logout com sucesso', () => {

  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('#2 - cenario de logout com sucesso', () => {
    cy.logout()

    cy.get('[data-qa-selector="sign_in_button"]').should('be.visible')

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
  })
})