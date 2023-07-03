import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Suite Testando a funcionalidade de criação de Label', options, () => {

    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        },
        label: {
            name: `label-${faker.random.word()}`,
            color: '#FF0000'
        }
    }

    beforeEach(() => {
        cy.api_removeProject()
        cy.login()
        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createLabel(response.body.project_id, issue.label)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
            })
    })

    it('#1 - Criacao de Label', () => {
            cy.gui_setLabelOnIssue(issue.label)

            cy.get('.qa-labels-block').should('contain', issue.label.name)
            cy.get('.qa-labels-block span')
                .should('have.attr', 'style', `background-color: ${issue.label.color}; color: #FFFFFF;`)
    })

})