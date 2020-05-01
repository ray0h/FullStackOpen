import React from 'react'
import { createFilter } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        event.preventDefault()
        const toFilter = event.target.value
        dispatch(createFilter(toFilter))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter