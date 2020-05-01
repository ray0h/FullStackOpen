import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { notifReducer, filterReducer, anecdoteReducer } from './reducers/anecdoteReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers(
    {
        notification: notifReducer,
        filter: filterReducer,
        anecdote: anecdoteReducer,
    }
)

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store