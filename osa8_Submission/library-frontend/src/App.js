import React, { useState } from 'react'
import Authors from './components/Authors'
import BooksGQLGenre from './components/BooksGQLGenre'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  
  const client = useApolloClient()
  const updateCacheWith = (QUERY, variables, data) => {
    const includedIn = (set, object) => set.map(b => b.id).includes(object.id)
    let storeData = client.readQuery({
      query: QUERY,
      variables: variables,
    })
    let newData = [ ...storeData.allBooks, data ]
    if (!includedIn(storeData.allBooks, data) || QUERY !== ALL_BOOKS) {
      return client.writeQuery({
        query: QUERY,
        variables: variables,
        data: {allBooks: newData}
      }) 
    } else {
      return null
    }
  }
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.bookAdded.title} added to library.`)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  } 
  
  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <BooksGQLGenre
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <Recommend
        show={page === 'recommend'}
      />
    </div>
  )
}

export default App