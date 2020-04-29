import React, { useState } from 'react'

const Blog = ({ blog, update, del }) => {
    const [fullInfo, setFullInfo] = useState(false)
    const logUser = JSON.parse(window.localStorage.getItem('loggedinBlogAppUser'))

    const delAuth = (blog.user[0].username === logUser.username)

    const toggleFullInfo = () => {
        setFullInfo(!fullInfo)
    }

    const updateLikes = () => {
        const updatedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user
        }
        update(blog.id, updatedBlog)
    }

    const delBlog = () => {
        del(blog.id, blog.user)
    }

    const showWhenFull = {
        paddingTop: 10,
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        display: fullInfo ? '' : 'none'
    }

    const hideWhenFull = {
        paddingTop: 10,
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        display: fullInfo ? 'none' : ''
    }

    const btnStyle = {
        color: 'white',
        backgroundColor: 'red',
        display: delAuth ? '' : 'none'
    }

    return (
        <div>
            <div className='abbrev' style={hideWhenFull}>
                {blog.title}, {blog.author}
                <button onClick={toggleFullInfo}>View</button>
                <button id='db-btn' style={btnStyle} onClick={delBlog}>Delete</button>
            </div>
            <div className='full' style={showWhenFull}>
                <div className='blogTitle'>title: <strong>{blog.title}</strong><button onClick={toggleFullInfo}>Hide</button></div>
                <div className='blogAuthor'>author: {blog.author}</div>
                <div className='blogUrl'>url: {blog.url}</div>
                <div className='blogLikes'>likes: {blog.likes} <button onClick={updateLikes}>like</button></div>
                <div className='blogUser'>user: {blog.user[0].name}</div>
            </div>
        </div>
    )
}

export default Blog