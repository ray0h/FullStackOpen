import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLike, addComment } from '../reducers/blogReducer'

const BlogHighlight = (blog) => {

    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const highlighted = blog.blog
    const comments = highlighted ? highlighted.comments : null

    const updateLikes = () => {
        const updatedBlog = { ...highlighted, likes: highlighted.likes + 1 }
        dispatch(addLike(highlighted.id, updatedBlog))
    }

    const submitComment = async (e) => {
        e.preventDefault()
        const commentedBlog = { ...highlighted, comments: highlighted.comments.concat(comment) }
        dispatch(addComment(highlighted.id, commentedBlog))
        setComment('')
    }

    if (!highlighted) {
        return null
    }

    return (
        <div>
            <div className='bg-blue-200 p-4 mx-10 my-4 rounded-sm shadow'>
                <h2 className='text-2xl font-bold'>{highlighted.title}, by {highlighted.author}</h2>
                <p><a className='text-blue-600 underline' href="/">{highlighted.url}</a></p>
                <p>{highlighted.likes} likes <button className='bg-blue-500 hover:bg-blue-600 text-gray-200 px-2 rounded-sm' onClick={updateLikes}>Like</button> </p>
                <p>added by: {highlighted.user[0].name}</p>
            </div>
            <div className='mx-10'>
                <form className='bg-gray-300 p-3' onSubmit={submitComment}>
                    <div>
                        Add a comment:
                        <div>
                            <textarea
                                className='p-1 mt-1 border w-full'
                                value={comment}
                                onChange={({ target }) => setComment(target.value)}
                            />
                        </div>
                        <button className='bg-blue-500 hover:bg-blue-600 text-gray-200 px-2 mt-2 rounded-sm'type='submit'>Submit</button>
                    </div>
                </form>
                <div className='border mt-4 px-4 py-2'>
                    <h3 className='text-lg font-bold underline'>Comments</h3>
                    <ul className='divide-y-2 divide-gray-400'>
                        {comments.map((comment, i) => <li className='py-2' key={i}>{comment}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BlogHighlight