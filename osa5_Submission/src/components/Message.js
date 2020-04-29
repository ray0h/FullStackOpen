import React from 'react'


const Message = ({ message, error }) => {
    const marg = {
        margin: '0.5em'
    }
    const errorStyle = {
        color: 'red',
        backgroundColor: 'lightgray',
        border: '2px solid red',
        borderRadius: '5px'
    }
    const normalStyle = {
        color: 'green',
        backgroundColor: 'lightgray',
        border: '2px solid green',
        borderRadius: '5px'
    }
    if (message) {
        if (error) {
            return <div className='error' style={errorStyle}><h3 style={marg}>{message}</h3></div>
        } else {
            return <div className='normal' style={normalStyle}><h3 style={marg}>{message}</h3></div>
        }
    } else {
        return <div></div>
    }
}

export default Message