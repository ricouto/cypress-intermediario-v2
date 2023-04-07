describe('Suite GitLab', () => {
  it('#1 - cenario de login com sucesso', () => {
    cy.visit('/users/sign_in')
    cy.get('[data-qa-selector="login_field"]').type(Cypress.env('user_name'))
    cy.get('[data-qa-selector="password_field"]').type(Cypress.env('user_password'), {log: false})
    cy.get('[data-qa-selector="sign_in_button"]').click()

    cy.get('[data-qa-selector="user_menu"]').should('be.visible')
  })
})