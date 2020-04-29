
describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: 'AGiant',
            name: 'Andre D Giant',
            password: 'andrethegiant'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get('button').contains('Log in').click()
        cy.get('#loginForm').should('contain', 'Log in to Blog App')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function () {
            cy.get('button').contains('Log in').click()
            cy.get('#username').type('AGiant')
            cy.get('#password').type('andrethegiant')
            cy.contains('Login').click()

            cy.contains('Login Successful')
            cy.contains('Hello Andre D Giant!')
        })

        it('fails with wrong credentials', function () {
            cy.get('button').contains('Log in').click()
            cy.get('#username').type('AGiant')
            cy.get('#password').type('wrong')
            cy.contains('Login').click()

            cy
                .get('.error')
                .contains('Wrong Username/Password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })

        describe('when logged in', function () {
            beforeEach(function () {
                cy.login({ username: 'AGiant', password: 'andrethegiant' })
            })

            it('A blog can be created', function () {
                cy.contains('button', 'New Blog').click() // not same as cy.get('button').contains('New Blog') !!!
                //https://github.com/cypress-io/cypress/issues/3745

                cy.get('#title').type('new blog')
                cy.get('#author').type('new author')
                cy.get('#url').type('http://www.newBlog.io')
                cy.get('#likes').type('25')
                cy.contains('button', 'Submit').click()

                cy.get('html').contains('new blog')
                cy.get('html').contains('new author')
            })

            it('A blog can be liked', function () {
                cy.createBlog({
                    title: 'new blog',
                    author: 'new author',
                    url: 'http://www.newBlog.io',
                    likes: 25
                })
                cy.contains('button', 'View').click()
                cy.contains(25)
                cy.contains('button', 'like').click()
                cy.contains(26)
            })

            it('User who made a blog can delete it', function () {
                cy.createBlog({
                    title: 'new blog',
                    author: 'new author',
                    url: 'http://www.newBlog.io',
                    likes: 25
                })
                cy.contains('new author')
                cy.contains('button', 'Delete').click()

                cy.get('html').should('not.contain', 'new author')
            })
        })
    })
    describe('when another user is logged in', function () {
        it('does not allow them to delete blogs without authorization', function () {
            const user2 = {
                username: 'JCena',
                name: 'John Cena',
                password: 'johncena'
            }
            cy.request('POST', 'http://localhost:3001/api/users', user2)
            cy.login({ username: 'AGiant', password: 'andrethegiant' })
            cy.createBlog({
                title: 'andre\'s blog',
                author: 'Andre D Giant',
                url: 'http://www.andre.io',
                likes: 1001
            })
            cy.contains('button', 'Logout').click()
            cy.login({ username: 'JCena', password: 'johncena' })
            cy.get('html')
                .and('contain', 'andre\'s blog')
                .and('contain', 'Hello John Cena!')
            cy.get('#db-btn').should('have.css', 'display', 'none')
        })
    })
    describe('when there are several blogs', function () {
        it('it lists in the order of most to least likes', function () {
            cy.login({ username: 'AGiant', password: 'andrethegiant' })
            cy.createBlog({
                title: 'blog7',
                author: 'Andre D Giant',
                url: 'http://www.andre1.io',
                likes: 7
            })
            cy.createBlog({
                title: 'blog113',
                author: 'Andre D Giant',
                url: 'http://www.andre2.io',
                likes: 113
            })
            cy.createBlog({
                title: 'blog21738',
                author: 'Andre D Giant',
                url: 'http://www.andre3.io',
                likes: 21738
            })
            cy.get('.blogLikes').invoke('text').then(($each) => {
                let likeArr = $each
                    .replace(/likes: /g, '')
                    .replace(/like/g, '')
                    .trim()
                    .split(' ')
                likeArr = likeArr.map(each => Number(each))
                expect(likeArr).to.have.length(3)
                expect(likeArr[0] > likeArr[1] && likeArr[1] > likeArr[2]).equal(true)
            })
        })
    })
})