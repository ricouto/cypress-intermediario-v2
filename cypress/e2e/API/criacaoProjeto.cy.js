import { faker } from '@faker-js/faker'

describe('Suite API - Projeto', () => {

    beforeEach(() => cy.api_removeProject())

    // const projeto = {
    //     name: `projeto-${faker.datatype.uuid()}`,
    //     description: faker.lorem.paragraph(5)
    // }

    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
          name: `project-${faker.datatype.uuid()}`,
          description: faker.random.words(5)
        }
      }

    it('#1 - Criacao de projeto', () => {
        cy.api_createProject(issue.project).then(response => {
            expect(response.status).to.equal(201)
            expect(response.body.name).to.equal(issue.project.name)
            expect(response.body.description).to.equal(issue.project.description)

        })
    })

    it.skip('#2 - Criacao de issue', () => {
        cy.api_createIssue(issue).then(response => {
            expect(response.status).to.equal(201)
            expect(response.body.title).to.equal(issue.title)
            expect(response.body.description).to.equal(issue.description)

        })
    })

    // it('#2 - Pesquisa e Remocao de projeto', () => {
    //     cy.api_removeProject().then(response => {
    //         expect(response.status).to.equal(202)
    //         expect(response.body.message).to.equal('202 Accepted')
    //     })
    // })
})