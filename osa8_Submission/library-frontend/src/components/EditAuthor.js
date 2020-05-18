import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const submit = (event) => {
    event.preventDefault()
    editAuthor({variables: {name, born} })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Update author birth year</h3>
      <form onSubmit={submit}>
        <div>
          name 
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a, ind) => <option key={ind} value={a.name}>{a.name}</option>)}  
          </select> 
        </div>
        <div>
          born <input 
            type='Number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update</button>
      </form>
    </div>
  )

}

export default EditAuthor