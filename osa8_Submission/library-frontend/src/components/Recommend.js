import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_ME } from '../queries'

const Recommend = (props) => {
	const result = useQuery(ALL_BOOKS)
	const user = useQuery(GET_ME)
  
  if (!props.show || result.loading || user.loading) {
    return null
	}
	
	const genre = user.data.me.favoriteGenre
  const bookList = result.data.allBooks
	let books = bookList.filter(book => book.genres.includes(genre))

  return (
    <div>
      <h2>recommended</h2> 
			<p>showing books from your favorite genre: <em>{genre}</em></p>
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

export default Recommend