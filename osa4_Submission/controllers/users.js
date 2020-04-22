const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async(request, response) => {
    const users = await User.find({})
    response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async(request, response) => {
    const body = request.body

    if (!body.password || body.password.length < 3) {
        response.status(400).json({ error: 'password too short, or no password included' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const newUser = await user.save()
    response.json(newUser.toJSON())

})

usersRouter.delete('/:id', async(request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.json(201).end()
})

module.exports = usersRouter