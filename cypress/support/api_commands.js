Cypress.Commands.add('api_createProject', project => {
    cy.request({
        method: 'POST',
        url: '/api/v4/projects/',
        body: {
            'name': project.name,
            'description': project.description,
            'initialize_with_readme': true
        },
        headers: { authorization: `Bearer ${Cypress.env('gitlab_access_token')}` }
    })
})

Cypress.Commands.add('api_searchProject', () => {
    cy.request({
        method: 'GET',
        url: '/api/v4/projects/',
        headers: { authorization: `Bearer ${Cypress.env('gitlab_access_token')}` }
    })
})

Cypress.Commands.add('api_removeProject', () => {
    cy.api_searchProject().then(res => {
        res.body.forEach(project =>
            cy.request({
                method: 'DELETE',
                url: `/api/v4/projects/${project.id}`,
                headers: { authorization: `Bearer ${Cypress.env('gitlab_access_token')}` }
            }))
    })

})

Cypress.Commands.add('api_createIssue', issue => {
    cy.api_createProject(issue.project).then(response => {
        cy.request({
            method: 'POST',
            url: `/api/v4/projects/${response.body.id}/issues`,
            body: {
                'title': issue.title,
                'description': issue.description
            },
            headers: { authorization: `Bearer ${Cypress.env('gitlab_access_token')}` }
        })
    })
})