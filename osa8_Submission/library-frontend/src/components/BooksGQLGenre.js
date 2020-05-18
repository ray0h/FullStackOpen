import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, GET_GENRES } from '../queries'

const BooksGQLGenre = ({ show }) => {
  const [genre, setGenre] = useState('all')
  const [books, setBooks] = useState([])
  const [genreList, setGenreList] = useState([])

  const [ getGenres, genreResult ] = useLazyQuery(GET_GENRES, {
    onCompleted: (data) => {
      let list = data.allBooks
        .map(obj => obj.genres)
        .flat()
        .reduce((unique, item) => unique.includes(item) ? unique : [...unique,item], [])
      setGenreList(list)
    }
  })

  const [ getBooks, bookResult ] = useLazyQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      setBooks(data.allBooks)
    },
  })
  
  useEffect ( () => {
    getGenres()
    // useLazyQuery hook does not trigger if genre remains unchanged (even if show is triggering useEffect)
    // even though the query/cache is changed by the addition of new book still need to manually setGenreList
    if (genreResult.data) {
      let list = genreResult.data.allBooks
        .map(obj => obj.genres)
        .flat()
        .reduce((unique, item) => unique.includes(item) ? unique : [...unique,item], [])
      setGenreList(list)
    }
  },[show]) //eslint-disable-line

  useEffect (() => {
    const variables = genre === 'all' ? {} : { variables: {genre}}
    getBooks(variables)
    // useLazyQuery hook does not trigger if genre remains unchanged (even if show is triggering useEffect)
    // even though the query/cache is changed by the addition of new book still need to manually setBooks
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks)
    }
  }, [genre, show]) //eslint-disable-line

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <div>
          select genre
          <select value={genre} onChange={({ target }) => setGenre(target.value)}>
            <option value='all'>all</option>
            {genreList.map((genre, ind) => <option key={ind} value={genre}>{genre}</option>)}  
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

export default BooksGQLGenre