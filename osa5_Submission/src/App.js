import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Toggable from './components/Togglable'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const [errorStyle, setErrorStyle] = useState(false)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        if(window.localStorage.getItem('loggedinBlogAppUser')) {
            const user = JSON.parse(window.localStorage.getItem('loggedinBlogAppUser'))
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const blogFormRef = React.createRef()

    const handleLogin = async (username, password) => {
        try {
            const user = await loginService.login({ username, password, })

            window.localStorage.setItem('loggedinBlogAppUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)
            setMessage('Login Successful')
            setTimeout( () => setMessage(''), 5000)
        } catch (exception) {
            setErrorStyle(true)
            setMessage('Wrong Username/Password')
            setTimeout( () => {
                setErrorStyle(false)
                setMessage('')
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedinBlogAppUser')
        setUser(null)
        setMessage('Logged out')
        setTimeout(() => setMessage(''), 3000)
    }

    const handleBlog = async (newBlog) => {
        try {
            blogFormRef.current.handleVisibility()
            blogService
                .create(newBlog)
                .then(update => setBlogs(blogs.concat(update)))
            setMessage('New blog added')
            setTimeout( () => setMessage(''), 5000)
        } catch(exception) {
            setErrorStyle(true)
            setMessage('Enter blog info')
            setTimeout( () => {
                setMessage('')
                setErrorStyle(false)
            }, 5000)
        }
    }

    const updateBlog = (id, updatedBlog) => {
        try {
            blogService
                .update(id, updatedBlog)
                .then(updated => setBlogs(updated))
            setMessage('Blog updated')
            setTimeout( () => setMessage(''), 5000)
        } catch(exception) {
            setErrorStyle(true)
            setMessage('Failed to Update')
            setTimeout( () => {
                setMessage('')
                setErrorStyle(false)
            }, 5000)
        }
    }

    const deleteBlog = (id) => {
        if (window.confirm('Delete this blog?')) {
            blogService
                .delBlog(id)
                .then(newList => setBlogs(newList))
            setMessage('Deleted')
            setTimeout(() => setMessage(''),3000)
        }
    }

    const loginForm = () => (
        <Toggable buttonLabel='Log in'>
            <LoginForm handleLogin={handleLogin}/>
        </Toggable>
    )

    const newBlogForm = () => (
        <Toggable buttonLabel='New Blog' ref={blogFormRef}>
            <NewBlog createBlog={handleBlog}/>
        </Toggable>
    )

    const blogDiv = () => (
        <div>
            <h2>Blogs</h2>
            {blogs
                .sort((each, next) => next.likes-each.likes)
                .map(blog => <Blog key={blog.id} blog={blog} update={updateBlog} del={deleteBlog}/>)}
        </div>
    )

    return (
        <div>
            <h2>Blog List App</h2>
            {user === null ?
                <div id='loginForm'>
                    <Message message={message} error={errorStyle}/>
                    {loginForm()}
                </div>
                :
                <div id='BlogForm'>
                    <p>Hello {user.name}! <button onClick={handleLogout}>Logout</button></p>
                    <Message message={message} error={errorStyle}/>
                    {newBlogForm()}
                    {blogDiv()}
                </div>
            }
        </div>
    )
}

export default App