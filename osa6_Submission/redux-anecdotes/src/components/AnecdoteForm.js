import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote, notify } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    
    const submitForm = async (event) => {
        event.preventDefault()
        const quote = event.target.newAnecdote.value
        props.addAnecdote(quote)
        props.notify(`You made a new anecdote: '${quote}'`, 4000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submitForm}>
                <div><input name='newAnecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )}

export default connect(null, { addAnecdote, notify })(AnecdoteForm)