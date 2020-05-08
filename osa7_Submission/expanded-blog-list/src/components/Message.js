import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
    const message = useSelector(state => state.message.message)
    const error = useSelector(state => state.message.error)


    const condStyle = {
        color: error ? 'red' : 'green',
        border: error ? '2px solid red' : '2px solid green',
    }

    if (message) {
        return <div className ='text-center bg-gray-400 rounded m-4 w-1/3 md:w-1/4' style={condStyle}><h3 className='m-1'>{message}</h3></div>
    } else {
        return <div></div>
    }
}

export default Message