// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
    //const user = { username, password }
    cy
        .request('POST', 'http://localhost:3001/api/login', { username, password })
        .then(({ body }) => { //body a method specific syntax for request (along with status, headers, duration )
            window.localStorage.setItem('loggedinBlogAppUser', JSON.stringify(body))
            cy.visit('http://localhost:3000')
        })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    const newBlog = {
        title,
        author,
        url,
        likes
    }
    const header = { 'Authorization': `bearer ${JSON.parse(window.localStorage.getItem('loggedinBlogAppUser')).token}` }
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: newBlog,
        headers: header
    })
    cy.visit('http://localhost:3000')
})