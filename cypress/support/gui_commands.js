// Cypress.Commands.add('login', (
//     user = Cypress.env('user_name'),
//     password = Cypress.env('user_password')
// ) => {
//     const login = () => {
//         cy.visit('/users/sign_in')
//         cy.get('[data-qa-selector="login_field"]').type(user)
//         cy.get('[data-qa-selector="password_field"]').type(password, { log: false })
//         cy.get('[data-qa-selector="sign_in_button"]').click()
//     }
//     login()
// })

Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate,
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})

Cypress.Commands.add('logout', () => {
  cy.get('.header-user-dropdown-toggle')
    .wait(250)
    .click()

  cy.get('a[data-qa-selector="sign_out_link"]')
    .click()

  cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
})

Cypress.Commands.add('gui_createProject', projeto => {
  cy.visit('/projects/new')

  cy.get('div[id="blank-project-name"] input[id*="project_name"]')
    .should('be.visible')
    .clear()
    .type(projeto.nome)

  cy.get('#project_description')
    .should('be.visible')
    .clear()
    .type(projeto.descricao)

  cy.get('#blank-project-pane > #new_project > .visibility-level-setting > :nth-child(3) > #project_visibility_level_20')
    .check()

  cy.get('#project_initialize_with_readme')
    .check()

  cy.get('#blank-project-pane > #new_project > input[class="btn btn-success project-submit"]')
    .click()

  cy.get('div[class*="flash-notice"]')
    .should('be.visible')
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('.qa-edit-link-labels').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestones => {
  cy.get('div[class="block milestone"] .js-sidebar-dropdown-toggle').click()
  cy.contains(milestones.title).click()
})