import React, { useState } from 'react'
import { login } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
// import PropTypes from 'prop-types'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(login(username, password))
        setUsername('')
        setPassword('')
    }

    // LoginForm.propTypes = {
    //     username: PropTypes.string.isRequired,
    //     password: PropTypes.string.isRequired
    // }

    return (
        <div>
            <h2 className='text-xl font-bold mx-4 mb-4'>Log in to Blog App</h2>
            <form className='mx-4 my-4 bg-gray-400 px-4 py-4 w-1/2 md:w-1/3 border' onSubmit={handleSubmit}>
                <div>
                Username
                    <input
                        className='border border-gray-600 rounded pl-1 mb-4 md:ml-2'
                        id='username'
                        type='text'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                Password
                    <input
                        className='border border-gray-600 rounded pl-1 mb-4 md:ml-2'
                        id='password'
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button className='bg-blue-500 hover:bg-blue-600 text-gray-200 px-2 mt-2 rounded-sm' type="submit">Login</button>
            </form>
        </div>)
}

export default LoginForm