import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogHighlight from './components/BlogHighlight'
import Blog from './components/Blog'
import User from './components/User'
import Users from './components/Users'
import NewBlog from './components/NewBlog'
import Toggable from './components/Togglable'
import Message from './components/Message'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { readBlog } from './reducers/blogReducer'
import { readUser } from './reducers/userReducer'
import { logout, resetUser } from './reducers/loginReducer'
import { Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom'
//import './app.css'

const App = () => {

    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blog)
    const user = useSelector(state => state.user)
    const userList = useSelector(state => state.users)

    useEffect(() => {
        dispatch(readBlog())
        dispatch(readUser())
    },[dispatch])

    useEffect(() => {
        if(window.localStorage.getItem('loggedinBlogAppUser')) {
            const currentUser = JSON.parse(window.localStorage.getItem('loggedinBlogAppUser'))
            dispatch(resetUser(currentUser))
            blogService.setToken(currentUser.token)
        }
    }, [dispatch])

    const userMatch = useRouteMatch('/users/:id')
    const profiled = userMatch ? userList.find(user => user.id === userMatch.params.id) : null
    const blogMatch = useRouteMatch('/blogs/:id')
    const highlighted = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

    const blogFormRef = React.createRef()

    const handleLogout = () => {
        dispatch(logout())
    }

    const loginForm = () => (
        <Toggable buttonLabel='Log in'>
            <LoginForm />
        </Toggable>
    )

    const newBlogForm = () => (
        <Toggable className='bg-blue-400' buttonLabel='New Blog' ref={blogFormRef}>
            <NewBlog />
        </Toggable>
    )

    const blogDiv = () => (
        <div>
            <h2 className='text-3xl font-bold mx-8 my-4'>Blogs</h2>
            {blogs
                .sort((each, next) => next.likes - each.likes)
                .map(blog => <Blog key={blog.id} blog={blog}/>)}
        </div>
    )


    return (
        <div className='pt-12'>
            <div className='fixed top-0 left-0 w-full flex justify-between bg-gray-700 text-gray-200 p-2'>
                <div>
                    <Link className='p-1 hover:text-blue-500' to='/blogs'>blogs</Link>
                    <Link className='p-1 hover:text-blue-500' to='/users'>users</Link>
                </div>
                {user
                    ? <span className='px-2'><em>{user.name} logged in  </em><button className='bg-purple-300 text-gray-800 hover:bg-purple-400 ml-1 px-2 rounded-md' onClick={handleLogout}>Logout</button></span>
                    : ''
                    // <Link style={padding} to='/login'>login</Link>
                }
            </div>
            <Switch>
                <Route path='/blogs/:id'>
                    <Message />
                    <BlogHighlight blog={highlighted} />
                </Route>
                <Route path='/users/:id'>
                    <User user={profiled} />
                </Route>
                <Route path='/users'>
                    <Users />
                </Route>
                <Route path='/login'>
                    {user === null ?
                        <div>
                            <Message />
                            {loginForm()}
                        </div>
                        : <Redirect to ='/' />
                    }
                </Route>
                <Route path='/'>
                    {user === null ?
                        <Redirect to='/login' />
                        :
                        <div id='BlogForm'>
                            <p className='text-2xl font-bold mx-4 my-2'>Hello {user.name}! </p>
                            <Message />
                            {newBlogForm()}
                            {blogDiv()}
                        </div>
                    }
                </Route>
            </Switch>
            <div className='mt-12 mx-2 font-bold'>FSO Ex 7, Copyright 2020</div>
        </div>
    )
}

export default App