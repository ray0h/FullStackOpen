const mongoose = require('mongoose')
const app = require ('../app')
const helper = require('./test_helper')
const supertest = require('supertest')
const api = supertest(app)

const User = require('../models/user')

describe('Adding new users', () => {
    test('check username requirement of >3 characters', async () => {
        const initDB = await helper.usersInDB() 
        const shortUser = {
            username: "mp",
            name: "Monty Python",
            password: "doesntmatter"
        }

        await api
            .post('/api/users')
            .send(shortUser)
            .expect(400)
        
        const currentDB = await helper.usersInDB()
        expect(currentDB).toHaveLength(initDB.length)
    })

    test('check that duplicate usernames are not allowed', async () => {
        const initDB = await helper.usersInDB()

        const repeatUser = {
            username: 'RFlair',
            name: 'Rob Flair',
            password: 'doesntmatter'
        }

        const res = await api
            .post('/api/users')
            .send(repeatUser)
            .expect(400)

        expect(res.body.error).toContain('`username` to be unique')

        const currentDB = await helper.usersInDB()
        expect(currentDB).toHaveLength(initDB.length)
    })

    test('check that missing password causes user to be rejected', async () => {
        const initDB = await helper.usersInDB()

        const newUser = {
            username: 'newuser',
            name: 'Jane Doe',
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(res.body.error).toContain('password too short, or no password included')

        const currentDB = await helper.usersInDB()
        expect(currentDB).toHaveLength(initDB.length)
    })
})

afterAll ( () => {
    mongoose.connection.close()
})
