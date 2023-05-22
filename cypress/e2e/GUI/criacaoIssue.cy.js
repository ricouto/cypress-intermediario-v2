import { faker } from '@faker-js/faker'

describe('Suite Testando a funcionalidade de criação de Issue', () => {

    let nomeProjeto
    const issue = {
        nome: `issue-${faker.name.firstName()}`,
        descricao: faker.random.words(8)
    }

    beforeEach(() => {
        cy.login()
    })

    // afterEach(() => {
    //     cy.logout()
    // })

    it('#1 - Criacao de Issue', () => {
        //cy.gui_createProject(projeto)

        cy.visit('/root/projeto-50990648-4d08-4024-adab-ea0f2335cb6f/issues/new')

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/root/projeto-50990648-4d08-4024-adab-ea0f2335cb6f/issues/new`)
        cy.contains('projeto-50990648-4d08-4024-adab-ea0f2335cb6f').should('be.visible')

        cy.get('#issue_title')
            .clear()
            .type(issue.nome)

        cy.get('#issue_description')
            .clear()
            .type(issue.descricao, { delay: 0 })

        cy.get('input[type="submit"]')
            .click()

        cy.get('div[class="title-container"] h2')
            .should('be.visible')
            .and('contain', issue.nome)

        // cy.get('div[class*="flash-notice"] > span').then(($span) => {
        //     let msgPadrao = `Project ${projeto.nome} was successfully created.`
        //     const msgNovoProjeto = $span.text().replace(/\'/g, '')

        //     expect(msgNovoProjeto).to.contain(msgPadrao)
        //     expect(msgNovoProjeto).to.eq(msgPadrao)
        // })

    })
})