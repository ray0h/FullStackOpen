const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async() => {

    await User.deleteMany({})

    const modUserList = helper.initUserList.map( 
         async function (user) {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(user.password, saltRounds)
            user.passwordHash = passwordHash
            //delete user.password
            return user
        })
    const finalList = await Promise.all(modUserList)
    await User.insertMany(finalList)

    const userList = await helper.usersInDB();
    const modBlogList = helper.initBlogList.map(
        function (blog) {
            const name = blog.name
            const pulledUserId = userList
                .filter(each => each.username === name)
                .map(user => user.id)
            blog.user = pulledUserId
            return blog
    })

    await Blog.deleteMany({})
    await Blog.insertMany(modBlogList)

})


describe('Testing format of blog objects', () => {
    test('app returns JSON-formatted blogs', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('app returns correct number of blogs', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(helper.initBlogList.length)
    })

    test("the blog id key is 'id', not mongoDB based '_id' ", async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0].id).toBeDefined()
    })
})

describe('Adding blogs to the app', () => {
    test('we can add blogs to the app', async () => {
        let userList = await helper.usersInDB()
        const userOne = {
            username: userList[0].username,
            name: userList[0].name,
            id: userList[0].id,
        }
        
        let token = jwt.sign(userOne, process.env.SECRET)
   
        const newBlog = {
            title: "hottest new blog",
            author: "Coolest Dev",
            url: "www.medium.com/check_this_out",
            likes: 97397,
            userId: userOne.id
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(200)
    
        //const res = await api.get('/api/blogs')   ...is there a difference either way?
        const finalBlogs = await helper.blogsInDB()
        expect(finalBlogs).toHaveLength(helper.initBlogList.length + 1)
    })
    
    test('if no likes value is provided, set it to zero', async () => {

        let userList = await helper.usersInDB()
        const userOne = {
            username: userList[0].username,
            name: userList[0].name,
            id: userList[0].id,
        }
        
        let token = jwt.sign(userOne, process.env.SECRET)
   
        const newBlog = {
            title: "weak A blog",
            author: "Anon",
            url: "www.whoreadsthis.com"
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(200)
    
        const finalCheck = await Blog.find({ author: "Anon" })
        const lastBlog = finalCheck.map(each => each.toJSON())
        expect(lastBlog[0].likes).toEqual(0)
    })
    
    test('if no title or url, blog does not post', async () => {
        let userList = await helper.usersInDB()
        const userOne = {
            username: userList[0].username,
            name: userList[0].name,
            id: userList[0].id,
        }
        
        let token = jwt.sign(userOne, process.env.SECRET)
   
        const newBlog = {
            author: "Johnny Doe",
            likes: 10
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)
    
        const currList = await helper.blogsInDB()
        expect(currList).toHaveLength(helper.initBlogList.length)
    })
})
 
afterAll( () => {
    mongoose.connection.close()
})