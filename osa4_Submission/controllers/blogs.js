const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
    if (blog) {
        response.json(blog.toJSON());
    } else {
        response.status(404).end();
    }
})

blogsRouter.get('/:id/comments', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        const comments = blog.comments;
        response.json(comments);
    } else {
        response.status(404).end();
    }
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const body = request.body
    const commentedBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user[0].id,
        comments: body.comments
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, commentedBlog, { new: true })
    response.json(updatedBlog.toJSON())
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url : body.url,
        likes : body.likes === undefined ? 0 : body.likes,
        user: user._id,
    })

    if(body.title === undefined || body.url === undefined) {
        response.status(400).end();
    }
    
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());
})

blogsRouter.put('/:id', async(request, response) => {
    const body = request.body;
    const modBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user[0].id
        //user: body.user._id previously
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, modBlog, { new: true })
    response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (blog.user[0].toString() !== decodedToken.id) {
        return response.status(403).json({ error: 'unauthorized to delete blog listing'})
    }

    const user = await User.findById(blog.user[0]);

    user.blogs = user.blogs.filter(each => each.toString() !== request.params.id)

    await user.save()
    await Blog.findByIdAndRemove(request.params.id);
    response.json(201).end();
})

module.exports = blogsRouter