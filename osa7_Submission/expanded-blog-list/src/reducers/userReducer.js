import userService from '../services/users'

export const readUser = () => {
    return async dispatch => {
        const userObj = await userService.getAll()
        dispatch ({ type: 'ADD_USERS', userObj })
    }
}

export const userReducer = (state=[], action) => {
    switch(action.type) {
    case 'ADD_USERS':
        return state.concat(action.userObj)
    default:
        return state
    }
}

