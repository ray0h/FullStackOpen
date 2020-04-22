const Blog = require('../models/blog')
const User = require('../models/user')

const initUserList = [
    {
        username: 'RFlair',
        name: 'Ric Flair',
        password: 'ricflair',
    },
    {
        username: 'AGiant',
        name: 'Andre D. Giant',
        password: 'andrethegiant',
    },
    {
        username: 'JCena',
        name: 'John Cena',
        password: 'johncena',
    }
]
const initBlogList = [
    {
        title: 'learn 2 code',
        author: 'Linus T.',
        url: 'www.l2c.com',
        likes: 10000,
        name: 'AGiant'
    },
    {
        title: 'Furiously fast cars',
        author: 'I Am Groot',
        url: 'www.FFC9.com',
        likes: 25632,
        name: 'JCena'
    },
    {
        title: 'My Anon Blog',
        author: 'John Doe',
        url: 'www.myblog.net',
        likes: 101,
        name: 'RFlair'
    },
    {
        title: 'Cooking with Flair',
        author: 'Ric Flair',
        url: 'www.wooooo.com',
        likes: 5423,
        name: 'RFlair'
    },
    {
        title: 'Space Images',
        author: 'Dr. Peter Quill',
        url: 'www.nasa.gov/blogs/si',
        likes: 4,
        name: 'AGiant'
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}    

module.exports = {
    initBlogList,
    initUserList,
    blogsInDB,
    usersInDB,
}
