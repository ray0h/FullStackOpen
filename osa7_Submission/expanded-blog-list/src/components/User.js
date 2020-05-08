import React from 'react'
import { useSelector } from 'react-redux'

const User = (user) => {
    const blogList = useSelector(state => state.blog)
    const profile = user.user ? user.user.name : ''
    const id = user.user ? user.user.id : ''

    return (
        <div>
            <h2>Blogs</h2>
            <h2>{profile}</h2>
            <ul>
                {blogList.filter(blog => blog.user[0].id === id).map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
        </div>
    )
}

export default User