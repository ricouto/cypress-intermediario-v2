import { faker } from '@faker-js/faker'

describe('Suite Testando a funcionalidade de criação de projeto', () => {

    let nomeProjeto
    const projeto = {
        nome: `projeto-${faker.datatype.uuid()}`,
        descricao: faker.random.words(5)
    }

    beforeEach(() => {
        cy.login()
    })

    afterEach(() => {
        cy.logout()
    })

    it('#1 - Criacao de projeto', () => {

        cy.gui_createProject(projeto)

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${projeto.nome}`)
        cy.contains(projeto.nome).should('be.visible')
        cy.contains(projeto.descricao).should('be.visible')

        cy.get('div[class*="flash-notice"] > span').then(($span) => {
            let msgPadrao = `Project ${projeto.nome} was successfully created.`
            const msgNovoProjeto = $span.text().replace(/\'/g, '')

            // cy.log(msgPadrao)
            // cy.log(msgNovoProjeto)

            expect(msgNovoProjeto).to.contain(msgPadrao)
            expect(msgNovoProjeto).to.eq(msgPadrao)
        })

    })
})