import anecdoteService from '../services/anecdote'

// initial state setup

const initialNote = {
  content: '',
  show: false
}

const increment = (obj) => {
  obj.votes += 1;
  return obj
}

//action creators

const getId = () => (100000 * Math.random()).toFixed(0)

export const vote = (id) => { 
  return async dispatch => {
    await anecdoteService.upVote(id)
    dispatch({ type: 'VOTE', id })
  }
}

export const addAnecdote = (quote) => { 
  return async dispatch => {
    const anecObj = {
      content: quote,
      id: getId(),
      votes: 0
    }
    await anecdoteService.createNew(anecObj)
    dispatch({ type: 'ADD_ANECDOTE', anecObj }) 
  }
}
export const readAnecdote = () => {
  return async dispatch => {
    const anecObj = await anecdoteService.getAll()
    dispatch ({
       type: 'ADD_ANECDOTE',
       anecObj 
    })
  }
}
var duration
export const notify = (content, time) => {
  return async dispatch => {
    clearTimeout(duration)
    await dispatch({ type: 'NOTIFY', content, show:true })
    duration = setTimeout(() => dispatch({type: 'NOTIFY', content: '', show:false }), time)
  }
}
 
export const createFilter = (snippet) => { return { type: 'CREATE_FILTER', snippet } }

export const filterReducer = (state = {snippet: ''}, action) => {
  switch(action.type) {
    case 'CREATE_FILTER':
      const newState = { snippet: action.snippet }
      return newState
    default: 
      return state  
  }
}

export const notifReducer = (state = initialNote, action) => {
  let newState = {...state}
  switch(action.type) {
    case 'NOTIFY': 
      newState.content = action.content
      newState.show = action.show
      return newState
    default: 
      return state
  }
}

export const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE': 
      const newState = state.map(anecObj => (anecObj.id === action.id) ? increment(anecObj) : anecObj)
      return newState
    case 'ADD_ANECDOTE':
      return state.concat(action.anecObj)
    default: return state
  }
}
