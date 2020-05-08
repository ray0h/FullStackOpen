import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from './msgReducer'

export const login = (username, password) => {
    return async dispatch => {
        try {
            const data = await loginService.login({ username, password })
            await blogService.setToken(data.token)
            dispatch({ type: 'LOGIN', data })
            dispatch(notify('Login Successful', false, 5000))
        } catch(exception) {
            dispatch(notify('Wrong Username / Password', true, 5000))
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch(notify('Logged Out', false, 3000))
        dispatch({ type: 'LOGOUT' })
    }
}

export const resetUser = (data) => {
    return async dispatch => {
        await blogService.setToken(data.token)
        dispatch({ type: 'RESET', data })
    }
}

export const loginReducer = (state = null, action) => {
    let newState = {}
    switch(action.type) {
    case 'LOGIN':
        window.localStorage.setItem('loggedinBlogAppUser', JSON.stringify(action.data))
        newState = action.data
        return newState
    case 'LOGOUT':
        window.localStorage.removeItem('loggedinBlogAppUser')
        return null
    case 'RESET':
        newState = action.data
        return newState
    default:
        return state
    }
}