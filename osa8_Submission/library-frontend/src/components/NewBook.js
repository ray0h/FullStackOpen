import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, GET_GENRES } from '../queries'

const NewBook = ({ show, updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(2020)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    // will throw error if query with the genre hasn't been made already, but will get corrected when
    // genre query is actually run.
    update: (store, response) => {
      const genreList = response.data.addBook.genres
      updateCacheWith(ALL_BOOKS, {}, response.data.addBook)
      updateCacheWith(GET_GENRES, {}, {__typename: "Books", genres: genreList}) 
      genreList.map(genre => {
        return updateCacheWith(ALL_BOOKS, { genre }, response.data.addBook)
      })
    }
  })

  if (!show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    addBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished(2020)
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook