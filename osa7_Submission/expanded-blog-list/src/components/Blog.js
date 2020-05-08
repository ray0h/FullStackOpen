import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const logUser = JSON.parse(window.localStorage.getItem('loggedinBlogAppUser'))
    const delAuth = (blog.user[0].username === logUser.username)

    const delBlog = () => {
        dispatch(deleteBlog(blog.id))
    }

    const btnStyle = {
        display: delAuth ? '' : 'none'
    }

    return (
        <div>
            <div className='flex justify-between p-2 mx-8 mb-1 bg-gray-300 border rounded-sm'>
                <div className='hover:text-orange-500 hover:underline'>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}, {blog.author}</Link>
                </div>
                <button id='db-btn' style={btnStyle} className='text-gray-100 bg-red-500 rounded-sm px-2 hover:text-red-500 hover:bg-gray-100 border' onClick={delBlog}>Delete</button>
            </div>
        </div>
    )
}

export default Blog