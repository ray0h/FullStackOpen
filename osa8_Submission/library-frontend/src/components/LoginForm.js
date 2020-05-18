import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    
  })
  setToken(null)
  localStorage.clear()

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('current-library-user-token', token)
    }
  }, [result.data]) //eslint-disable-line

  const submit = (e) => {
    e.preventDefault()
    login({ variables: {username, password} })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          /> 
        </div>
        <div>
          password <input
            value={password}
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          /> 
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )

}

export default LoginForm