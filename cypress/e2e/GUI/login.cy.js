describe('Suite GitLab', () => {

  it('#1 - cenario de login com sucesso', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false }

    cy.login(user, password, options)
    
    cy.get('div h1[class="page-title"]')
    .should('be.visible')
    .and('contain', 'Projects')

    cy.get('[data-qa-selector="user_menu"]').should('be.visible')
  })
})