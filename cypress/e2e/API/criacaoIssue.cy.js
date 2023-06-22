import { faker } from '@faker-js/faker'

describe('Suite API - Issue', () => {

    beforeEach(() => cy.api_removeProject())

    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
          name: `project-${faker.datatype.uuid()}`,
          description: faker.random.words(5)
        }
      }

    it('#1 - Criacao de issue', () => {
        cy.api_createIssue(issue).then(response => {
            expect(response.status).to.equal(201)
            expect(response.body.title).to.equal(issue.title)
            expect(response.body.description).to.equal(issue.description)

        })
    })

})