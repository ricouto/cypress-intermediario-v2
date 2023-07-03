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
        milestones: {
            title: `milestones-${faker.random.word()}`
        }
    }

    beforeEach(() => {
        cy.api_removeProject()
        cy.login()
        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createMilestones(response.body.project_id, issue.milestones)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
            })
    })

    it('#1 - Criacao de Label', () => {
            cy.gui_setMilestoneOnIssue(issue.milestones)
            cy.get('.value .bold').should('contain', issue.milestones.title)
    })

})