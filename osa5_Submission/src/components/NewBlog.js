import React, { useState } from 'react'

const NewBlog = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')
    const [blogLikes, setBlogLikes] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const newBlog = {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl,
            likes: blogLikes,
        }
        createBlog(newBlog)

        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        setBlogLikes('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Submit New Blog for List</h2>
            <div>
                title
                <input
                    id='title'
                    type="text"
                    value={blogTitle}
                    onChange={({ target }) => setBlogTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                    id='author'
                    type="text"
                    value={blogAuthor}
                    onChange={({ target }) => setBlogAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input
                    id='url'
                    type="url"
                    value={blogUrl}
                    onChange={({ target }) => setBlogUrl(target.value)}
                />
            </div>
            <div>
                likes
                <input
                    id='likes'
                    type="number"
                    value={blogLikes}
                    onChange={({ target }) => setBlogLikes(target.value)}
                />
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default NewBlog