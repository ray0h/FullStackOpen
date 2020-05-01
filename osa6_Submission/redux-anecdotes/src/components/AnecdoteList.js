import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote, notify } from '../reducers/anecdoteReducer'

const AnecdoteList =() => {
    const dispatch = useDispatch()

    const snippet = useSelector(state => state.filter.snippet)
    const anecdotes = useSelector(state => state.anecdote.sort((a,b) => b.votes - a.votes).filter(anecdote => anecdote.content.includes(snippet)))
    
    const submitVote = (id) => {
        dispatch(vote(id))
        const votedOn = anecdotes.filter(each => each.id === id)
        dispatch(notify(`You voted for '${votedOn[0].content}'`, 5000))
      }

    return (
        <div>
            {anecdotes.map(anecdote => 
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => submitVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>        
    )
}

export default AnecdoteList