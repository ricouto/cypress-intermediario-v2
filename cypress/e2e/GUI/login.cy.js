describe('Suite GitLab', () => {

  beforeEach(() => {
    cy.login()
  })

  it('#1 - cenario de login com sucesso', () => {
    cy.get('[data-qa-selector="welcome_title_content"]')
    .should('be.visible')
    .and('contain', 'Welcome to GitLab')

    cy.get('[data-qa-selector="user_menu"]').should('be.visible')
  })

  it('#2 - cenario de logout com sucesso', () => {
    cy.get('[data-qa-selector="user_menu"]').click()
    cy.get('[data-qa-selector="sign_out_link"]').click()

    cy.get('[data-qa-selector="sign_in_button"]').should('be.visible')

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
  })
})