import blogService from '../services/blogs'
import { notify } from './msgReducer'

export const readBlog = () => {
    return async dispatch => {
        const blogObj = await blogService.getAll()
        dispatch({ type: 'ADD_BLOG', blogObj })
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        try {
            const response = await blogService.create(newBlog)
            const blogObj = await blogService.getSingle(response.id)
            dispatch({ type: 'ADD_BLOG', blogObj })
            dispatch(notify('New blog added', false, 5000))
        } catch(exception) {
            dispatch(notify('Enter correct blog info', true, 5000))
        }
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        if (window.confirm('Delete this blog?')) {
            await blogService.delBlog(id)
            dispatch({ type: 'DELETE_BLOG', id })
            dispatch(notify('Deleted', false, 5000))
        }
    }
}

export const addLike = (id, newBlog) => {
    return async dispatch => {
        try {
            const response = await blogService.update(id, newBlog)
            dispatch ({ type: 'UPDATE_BLOG', blogObj: response, id })
        } catch(exception) {
            dispatch(notify('Failed to Update', true, 5000))
        }
    }
}

export const addComment = (id, commentedBlog) => {
    return async dispatch => {
        try{
            const response = await blogService.addComment(id, commentedBlog)
            dispatch ({ type: 'UPDATE_BLOG', blogObj: response, id })
        } catch(exception) {
            dispatch(notify('Failed to Update', true, 5000))
        }
    }
}

export const blogReducer = (state = [], action) => {
    switch(action.type) {
    case 'ADD_BLOG':
        return state.concat(action.blogObj)
    case 'DELETE_BLOG':
        return state.filter(blog => blog.id !== action.id)
    case 'UPDATE_BLOG':
        return state.map(blog => (blog.id === action.id) ? action.blogObj : blog)
    default:
        return state
    }
}