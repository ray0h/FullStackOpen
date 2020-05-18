import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_GENRES } from '../queries'

const BooksReactGenre = (props) => {
  const [genre, setGenre] = useState('all')
  const result = useQuery(ALL_BOOKS)
  const genres = useQuery(GET_GENRES)
  
  if (!props.show || result.loading || genres.loading) {
    return null
  }

  const genreList = genres.data.allBooks
    .map(obj => obj.genres)
    .flat()
    .reduce((unique, item) => unique.includes(item) ? unique : [...unique,item], [])

  const bookList = result.data.allBooks
  let books
  if (genre === 'all') { 
    books = bookList
  } else {
    console.log('else', genre)
    books = bookList.filter(book => book.genres.includes(genre))
  }

  return (
    <div>
      <h2>books</h2>
      <div>
          select genre
          <select value={genre} onChange={({ target }) => setGenre(target.value)}>
            {genreList.map((genre, ind) => <option key={ind} value={genre}>{genre}</option>)}  
            <option value='all'>all</option>
          </select> 
        </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BooksReactGenre