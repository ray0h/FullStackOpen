
const initialMsg = {
    message: '',
    error: false,
}

var duration
export const notify = (message, error, time) => {
    return async dispatch => {
        clearTimeout(duration)
        await dispatch ({ type: 'NOTIFY', message, error })
        duration = setTimeout( () => dispatch ({ type: 'NOTIFY', message: '', error: false }), time)
    }
}

export const msgReducer = (state = initialMsg, action) => {
    let newState = {}
    switch(action.type) {
    case 'NOTIFY':
        newState.message = action.message
        newState.error = action.error
        return newState
    default:
        return state
    }
}