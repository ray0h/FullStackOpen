import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const NewBlog = () => {
    const dispatch = useDispatch()

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

        dispatch(createBlog(newBlog))
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        setBlogLikes('')
    }

    return (
        <form className='mx-4 my-4 bg-gray-400 px-4 py-2 border' onSubmit={handleSubmit}>
            <h2 className='text-xl font-bold mb-4'>Submit New Blog for List</h2>
            <div>
                Blog title:
                <input
                    className='border border-gray-600 w-full rounded pl-1'
                    id='title'
                    type="text"
                    value={blogTitle}
                    onChange={({ target }) => setBlogTitle(target.value)}
                />
            </div>
            <div>
                Blog author:
                <input
                    className='border border-gray-800 w-full rounded pl-1'
                    id='author'
                    type="text"
                    value={blogAuthor}
                    onChange={({ target }) => setBlogAuthor(target.value)}
                />
            </div>
            <div>
                Blog URL:
                <input
                    className='border border-gray-800 w-full rounded pl-1'
                    id='url'
                    type="url"
                    value={blogUrl}
                    onChange={({ target }) => setBlogUrl(target.value)}
                />
            </div>
            <div>
                No. of likes:
                <input
                    className='border border-gray-800 w-full rounded pl-1'
                    id='likes'
                    type="number"
                    value={blogLikes}
                    onChange={({ target }) => setBlogLikes(target.value)}
                />
            </div>
            <button className='bg-blue-500 hover:bg-blue-600 text-gray-200 px-2 mt-2 rounded-sm' type='submit'>Submit</button>
        </form>
    )
}

export default NewBlog