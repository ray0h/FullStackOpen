import { msgReducer } from './reducers/msgReducer'
import { blogReducer } from './reducers/blogReducer'
import { loginReducer } from './reducers/loginReducer'
import { userReducer } from './reducers/userReducer'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers (
    {
        message: msgReducer,
        blog: blogReducer,
        user: loginReducer,
        users: userReducer
    }
)

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(thunk)))

export default store